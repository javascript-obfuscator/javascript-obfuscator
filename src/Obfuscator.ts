import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeTransformersFactory } from './types/container/TNodeTransformersFactory';
import { TVisitorDirection } from './types/TVisitorDirection';

import { IObfuscationEventEmitter } from './interfaces/event-emitters/IObfuscationEventEmitter';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/options/IOptions';
import { INodeTransformer } from './interfaces/node-transformers/INodeTransformer';
import { IStackTraceAnalyzer } from './interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from './interfaces/stack-trace-analyzer/IStackTraceData';

import { CustomNodeGroups } from './enums/container/CustomNodeGroups';
import { NodeTransformers } from './enums/container/NodeTransformers';
import { NodeType } from './enums/NodeType';
import { ObfuscationEvents } from './enums/ObfuscationEvents';
import { VisitorDirection } from './enums/VisitorDirection';

import { Node } from './node/Node';
import { NodeUtils } from './node/NodeUtils';
import { TCustomNodeGroupsFactory } from './types/container/TCustomNodesFactoriesFactory';

@injectable()
export class Obfuscator implements IObfuscator {
    /**
     * @type {CustomNodeGroups[]}
     */
    private static readonly customNodeGroupsList: CustomNodeGroups[] = [
        CustomNodeGroups.ConsoleOutputCustomNodeGroup,
        CustomNodeGroups.DebugProtectionCustomNodeGroup,
        CustomNodeGroups.DomainLockCustomNodeGroup,
        CustomNodeGroups.SelfDefendingCustomNodeGroup,
        CustomNodeGroups.StringArrayCustomNodeGroup
    ];

    /**
     * @type {Map<string, NodeTransformers[]>}
     */
    private static readonly nodeControlFlowTransformersMap: Map <string, NodeTransformers[]> = new Map <string, NodeTransformers[]> ([
        [NodeType.FunctionDeclaration, [NodeTransformers.FunctionControlFlowTransformer]],
        [NodeType.FunctionExpression, [NodeTransformers.FunctionControlFlowTransformer]]
    ]);

    /**
     * @type {Map<string, NodeTransformers[]>}
     */
    private static readonly nodeObfuscatorsMap: Map <string, NodeTransformers[]> = new Map <string, NodeTransformers[]> ([
        [NodeType.ArrowFunctionExpression, [NodeTransformers.FunctionObfuscator]],
        [NodeType.ClassDeclaration, [NodeTransformers.FunctionDeclarationObfuscator]],
        [NodeType.CatchClause, [NodeTransformers.CatchClauseObfuscator]],
        [NodeType.FunctionDeclaration, [
            NodeTransformers.FunctionDeclarationObfuscator,
            NodeTransformers.FunctionObfuscator
        ]],
        [NodeType.FunctionExpression, [NodeTransformers.FunctionObfuscator]],
        [NodeType.MemberExpression, [NodeTransformers.MemberExpressionObfuscator]],
        [NodeType.MethodDefinition, [NodeTransformers.MethodDefinitionObfuscator]],
        [NodeType.ObjectExpression, [NodeTransformers.ObjectExpressionObfuscator]],
        [NodeType.VariableDeclaration, [NodeTransformers.VariableDeclarationObfuscator]],
        [NodeType.LabeledStatement, [NodeTransformers.LabeledStatementObfuscator]],
        [NodeType.Literal, [NodeTransformers.LiteralObfuscator]]
    ]);

    /**
     * @type {TCustomNodeGroupsFactory}
     */
    private readonly customNodeGroupsFactory: TCustomNodeGroupsFactory;

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
     * @param customNodeGroupsFactory
     * @param nodeTransformersFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IStackTraceAnalyzer) stackTraceAnalyzer: IStackTraceAnalyzer,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers['Factory<ICustomNodeGroup>']) customNodeGroupsFactory: TCustomNodeGroupsFactory,
        @inject(ServiceIdentifiers['Factory<INodeTransformer[]>']) nodeTransformersFactory: TNodeTransformersFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.stackTraceAnalyzer = stackTraceAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.customNodeGroupsFactory = customNodeGroupsFactory;
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

        NodeUtils.parentize(astTree);

        const stackTraceData: IStackTraceData[] = this.stackTraceAnalyzer.analyze(astTree.body);

        // initialize custom node groups
        Obfuscator.customNodeGroupsList.forEach((customNodeGroupName: CustomNodeGroups) => {
            this.customNodeGroupsFactory(customNodeGroupName).initialize(stackTraceData);
        });

        this.obfuscationEventEmitter.emit(ObfuscationEvents.BeforeObfuscation, astTree, stackTraceData);

        // first pass: control flow flattening
        if (this.options.controlFlowFlattening) {
            this.transformAstTree(
                astTree,
                VisitorDirection.leave,
                this.nodeTransformersFactory(Obfuscator.nodeControlFlowTransformersMap)
            );
        }

        // second pass: nodes obfuscation
        this.transformAstTree(
            astTree,
            VisitorDirection.enter,
            this.nodeTransformersFactory(Obfuscator.nodeObfuscatorsMap)
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
    ): void {
        estraverse.traverse(astTree, {
            [direction]: (node: ESTree.Node, parentNode: ESTree.Node): void => {
                const nodeTransformers: INodeTransformer[] = nodeTransformersConcreteFactory(node.type);

                nodeTransformers.forEach((nodeTransformer: INodeTransformer) => {
                    nodeTransformer.transformNode(node, parentNode);
                });
            }
        });
    }
}
