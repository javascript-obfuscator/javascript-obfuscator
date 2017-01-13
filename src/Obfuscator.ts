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
import { INodeTransformer } from './interfaces/node-transformers/INodeTransformer';
import { IStackTraceAnalyzer } from './interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from './interfaces/stack-trace-analyzer/IStackTraceData';
import { IStorage } from './interfaces/storages/IStorage';

import { NodeTransformers } from './enums/container/NodeTransformers';
import { NodeType } from './enums/NodeType';
import { ObfuscationEvents } from './enums/ObfuscationEvents';
import { VisitorDirection } from './enums/VisitorDirection';

import { Node } from './node/Node';
import { NodeUtils } from './node/NodeUtils';

@injectable()
export class Obfuscator implements IObfuscator {
    /**
     * @type {Map<string, NodeTransformers[]>}
     */
    private static readonly controlFlowTransformersMap: Map <string, NodeTransformers[]> = new Map([
        [NodeType.BlockStatement, [NodeTransformers.BlockStatementControlFlowTransformer]],
        [NodeType.FunctionDeclaration, [NodeTransformers.FunctionControlFlowTransformer]],
        [NodeType.FunctionExpression, [NodeTransformers.FunctionControlFlowTransformer]]
    ]);

    /**
     * @type {Map<string, NodeTransformers[]>}
     */
    private static readonly convertingTransformersMap: Map <string, NodeTransformers[]> = new Map([
        [NodeType.MemberExpression, [NodeTransformers.MemberExpressionTransformer]],
        [NodeType.MethodDefinition, [NodeTransformers.MethodDefinitionTransformer]],
        [NodeType.TemplateLiteral, [NodeTransformers.TemplateLiteralTransformer]],
    ]);

    /**
     * @type {Map<string, NodeTransformers[]>}
     */
    private static readonly obfuscatingTransformersMap: Map <string, NodeTransformers[]> = new Map([
        [NodeType.ArrowFunctionExpression, [NodeTransformers.FunctionTransformer]],
        [NodeType.ClassDeclaration, [NodeTransformers.FunctionDeclarationTransformer]],
        [NodeType.CatchClause, [NodeTransformers.CatchClauseTransformer]],
        [NodeType.FunctionDeclaration, [
            NodeTransformers.FunctionDeclarationTransformer,
            NodeTransformers.FunctionTransformer
        ]],
        [NodeType.FunctionExpression, [NodeTransformers.FunctionTransformer]],
        [NodeType.ObjectExpression, [NodeTransformers.ObjectExpressionTransformer]],
        [NodeType.VariableDeclaration, [NodeTransformers.VariableDeclarationTransformer]],
        [NodeType.LabeledStatement, [NodeTransformers.LabeledStatementTransformer]],
        [NodeType.Literal, [NodeTransformers.LiteralTransformer]]
    ]);

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
                VisitorDirection.leave,
                this.nodeTransformersFactory(Obfuscator.controlFlowTransformersMap)
            );
        }

        // second pass: nodes obfuscation
        astTree = this.transformAstTree(
            astTree,
            VisitorDirection.enter,
            this.nodeTransformersFactory(
                new Map([
                    ...Obfuscator.convertingTransformersMap,
                    ...Obfuscator.obfuscatingTransformersMap
                ])
            )
        );

        this.obfuscationEventEmitter.emit(ObfuscationEvents.AfterObfuscation, astTree, stackTraceData);

        return astTree;
    }

    /**
     * @param astTree
     * @param direction
     * @param nodeTransformersConcreteFactory
     */
    private transformAstTree (
        astTree: ESTree.Program,
        direction: TVisitorDirection,
        nodeTransformersConcreteFactory: (nodeType: string) => INodeTransformer[]
    ): ESTree.Program {
        estraverse.replace(astTree, {
            [direction]: (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node => {
                const nodeTransformers: INodeTransformer[] = nodeTransformersConcreteFactory(node.type);

                nodeTransformers.forEach((nodeTransformer: INodeTransformer) => {
                    node = nodeTransformer.transformNode(node, parentNode);
                });

                return node;
            }
        });

        return astTree;
    }
}
