import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeTransformersFactory } from './types/container/TNodeTransformersFactory';
import { TVisitorDirection } from './types/TVisitorDirection';

import { ICustomNodeGroup } from './interfaces/custom-nodes/ICustomNodeGroup';
import { IObfuscationEventEmitter } from './interfaces/event-emitters/IObfuscationEventEmitter';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/options/IOptions';
import { IStackTraceAnalyzer } from './interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from './interfaces/stack-trace-analyzer/IStackTraceData';
import { IStorage } from './interfaces/storages/IStorage';

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
     * @type {TNodeTransformersFactory}
     */
    private readonly nodeTransformersFactory: TNodeTransformersFactory;

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
     * @param nodeTransformersFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IStackTraceAnalyzer) stackTraceAnalyzer: IStackTraceAnalyzer,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.TCustomNodeGroupStorage) customNodeGroupStorage: IStorage<ICustomNodeGroup>,
        @inject(ServiceIdentifiers.Factory__INodeTransformer) nodeTransformersFactory: TNodeTransformersFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.stackTraceAnalyzer = stackTraceAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.customNodeGroupStorage = customNodeGroupStorage;
        this.nodeTransformersFactory = nodeTransformersFactory;
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
            astTree = this.transformAstTree(
                astTree,
                Obfuscator.controlFlowTransformersList
            );
        }

        // second pass: nodes obfuscation
        astTree = this.transformAstTree(
            astTree,
            [
                ...Obfuscator.convertingTransformersList,
                ...Obfuscator.obfuscatingTransformersList
            ]
        );

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
        const mergedVisitors: estraverse.Visitor = this.mergeTransformerVisitors(
            nodeTransformers.map((nodeTransformer: NodeTransformers): estraverse.Visitor => {
                return this.nodeTransformersFactory(nodeTransformer).getVisitor();
            })
        );

        estraverse.replace(astTree, mergedVisitors);

        return astTree;
    }

    /**
     * @param visitors
     * @return {estraverse.Visitor}
     */
    private mergeTransformerVisitors (visitors: estraverse.Visitor[]): estraverse.Visitor {
        const enterVisitor: any = this.getVisitorForDirection(
            visitors.filter((visitor: estraverse.Visitor) => visitor.enter !== undefined),
            VisitorDirection.enter
        );
        const leaveVisitor: any = this.getVisitorForDirection(
            visitors.filter((visitor: estraverse.Visitor) => visitor.leave !== undefined),
            VisitorDirection.leave
        );

        return {
            enter: enterVisitor,
            leave: leaveVisitor
        };
    }

    /**
     * @param visitors
     * @param direction
     * @return {estraverse.Visitor | null}
     */
    private getVisitorForDirection (
        visitors: estraverse.Visitor[],
        direction: TVisitorDirection
    ): estraverse.Visitor | null {
        if (!visitors.length) {
            return null;
        }

        return (node: ESTree.Node, parentNode: ESTree.Node) => {
            for (const visitor of visitors) {
                const visitorResult: estraverse.VisitorOption | ESTree.Node | void = visitor[direction]!(node, parentNode);

                if (!visitorResult) {
                    continue;
                }

                if (
                    visitorResult === estraverse.VisitorOption.Break ||
                    visitorResult === estraverse.VisitorOption.Remove ||
                    visitorResult === estraverse.VisitorOption.Skip
                ) {
                    return visitorResult;
                }

                node = <ESTree.Node>visitorResult;
            }

            return node;
        };
    }
}
