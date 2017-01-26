import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeTransformerFactory } from './types/container/TNodeTransformerFactory';
import { TVisitorDirection } from './types/TVisitorDirection';
import { TVisitorFunction } from './types/TVisitorFunction';

import { ICustomNodeGroup } from './interfaces/custom-nodes/ICustomNodeGroup';
import { IObfuscationEventEmitter } from './interfaces/event-emitters/IObfuscationEventEmitter';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/options/IOptions';
import { IStackTraceAnalyzer } from './interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from './interfaces/stack-trace-analyzer/IStackTraceData';
import { IStorage } from './interfaces/storages/IStorage';
import { IVisitor } from './interfaces/IVisitor';

import { NodeTransformers } from './enums/container/NodeTransformers';
import { ObfuscationEvents } from './enums/ObfuscationEvents';
import { VisitorDirection } from './enums/VisitorDirection';

import { Node } from './node/Node';
import { NodeUtils } from './node/NodeUtils';

@injectable()
export class Obfuscator implements IObfuscator {
    /**
     * @type {NodeTransformers[]}
     */
    private static readonly controlFlowTransformersList: NodeTransformers[] = [
        NodeTransformers.BlockStatementControlFlowTransformer,
        NodeTransformers.FunctionControlFlowTransformer
    ];

    /**
     * @type {NodeTransformers[]}
     */
    private static readonly convertingTransformersList: NodeTransformers[] = [
        NodeTransformers.MemberExpressionTransformer,
        NodeTransformers.MethodDefinitionTransformer,
        NodeTransformers.TemplateLiteralTransformer
    ];

    /**
     * @type {NodeTransformers[]}
     */
    private static readonly obfuscatingTransformersList: NodeTransformers[] = [
        NodeTransformers.CatchClauseTransformer,
        NodeTransformers.FunctionDeclarationTransformer,
        NodeTransformers.FunctionTransformer,
        NodeTransformers.LabeledStatementTransformer,
        NodeTransformers.LiteralTransformer,
        NodeTransformers.ObjectExpressionTransformer,
        NodeTransformers.VariableDeclarationTransformer
    ];

    /**
     * @type {IStorage<ICustomNodeGroup>}
     */
    private readonly customNodeGroupStorage: IStorage<ICustomNodeGroup>;

    /**
     * @type {TNodeTransformerFactory}
     */
    private readonly nodeTransformerFactory: TNodeTransformerFactory;

    /**
     * @type {IObfuscationEventEmitter}
     */
    private readonly obfuscationEventEmitter: IObfuscationEventEmitter;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {IStackTraceAnalyzer}
     */
    private readonly stackTraceAnalyzer: IStackTraceAnalyzer;

    /**
     * @param stackTraceAnalyzer
     * @param obfuscationEventEmitter
     * @param customNodeGroupStorage
     * @param nodeTransformerFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IStackTraceAnalyzer) stackTraceAnalyzer: IStackTraceAnalyzer,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.TCustomNodeGroupStorage) customNodeGroupStorage: IStorage<ICustomNodeGroup>,
        @inject(ServiceIdentifiers.Factory__INodeTransformer) nodeTransformerFactory: TNodeTransformerFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.stackTraceAnalyzer = stackTraceAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.customNodeGroupStorage = customNodeGroupStorage;
        this.nodeTransformerFactory = nodeTransformerFactory;
        this.options = options;
    }

    /**
     * @param astTree
     * @returns {ESTree.Program}
     */
    public obfuscateAstTree (astTree: ESTree.Program): ESTree.Program {
        if (Node.isProgramNode(astTree) && !astTree.body.length) {
            return astTree;
        }

        astTree = <ESTree.Program>NodeUtils.parentize(astTree);

        const stackTraceData: IStackTraceData[] = this.stackTraceAnalyzer.analyze(astTree.body);

        // initialize custom node groups and configure custom nodes
        this.customNodeGroupStorage
            .getStorage()
            .forEach((customNodeGroup: ICustomNodeGroup) => {
                customNodeGroup.initialize();

                this.obfuscationEventEmitter.once(
                    customNodeGroup.getAppendEvent(),
                    customNodeGroup.appendCustomNodes.bind(customNodeGroup)
                );
            });

        this.obfuscationEventEmitter.emit(ObfuscationEvents.BeforeObfuscation, astTree, stackTraceData);

        // first pass: control flow flattening
        if (this.options.controlFlowFlattening) {
            astTree = this.transformAstTree(astTree, Obfuscator.controlFlowTransformersList);
        }

        // second pass: nodes obfuscation
        astTree = this.transformAstTree(astTree, [
            ...Obfuscator.convertingTransformersList,
            ...Obfuscator.obfuscatingTransformersList
        ]);

        this.obfuscationEventEmitter.emit(ObfuscationEvents.AfterObfuscation, astTree, stackTraceData);

        return astTree;
    }

    /**
     * @param astTree
     * @param nodeTransformers
     */
    private transformAstTree (
        astTree: ESTree.Program,
        nodeTransformers: NodeTransformers[]
    ): ESTree.Program {
        const enterVisitors: IVisitor[] = [];
        const leaveVisitors: IVisitor[] = [];
        const nodeTransformersLength: number = nodeTransformers.length;

        let visitor: IVisitor;

        for (let i: number = 0; i < nodeTransformersLength; i++) {
            visitor = this.nodeTransformerFactory(nodeTransformers[i]).getVisitor();

            if (visitor.enter) {
                enterVisitors.push(visitor);
            }

            if (visitor.leave) {
                leaveVisitors.push(visitor);
            }
        }

        estraverse.replace(astTree, {
            enter: this.mergeVisitorsForDirection(enterVisitors, VisitorDirection.enter),
            leave: this.mergeVisitorsForDirection(leaveVisitors, VisitorDirection.leave)
        });

        return astTree;
    }

    /**
     * @param visitors
     * @param direction
     * @return {TVisitorDirection}
     */
    private mergeVisitorsForDirection (visitors: IVisitor[], direction: TVisitorDirection): TVisitorFunction {
        if (!visitors.length) {
            return (node: ESTree.Node, parentNode: ESTree.Node) => node;
        }

        const visitorsLength: number = visitors.length;

        let visitor: IVisitor;

        return (node: ESTree.Node, parentNode: ESTree.Node) => {
            for (let i: number = 0; i < visitorsLength; i++) {
                visitor = visitors[i];

                const visitorFunction: TVisitorFunction | undefined = visitor[direction];

                if (!visitorFunction) {
                    continue;
                }

                const visitorResult: ESTree.Node | void = visitorFunction(node, parentNode);

                if (!visitorResult) {
                    continue;
                }

                node = visitorResult;
            }

            return node;
        };
    }
}
