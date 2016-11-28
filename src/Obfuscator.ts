import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TVisitorDirection } from './types/TVisitorDirection';

import { ICustomNode } from './interfaces/custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from './interfaces/IObfuscationEventEmitter';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/IOptions';
import { INodeTransformer } from './interfaces/INodeTransformer';
import { IStackTraceAnalyzer } from './interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStorage } from './interfaces/IStorage';

import { NodeType } from './enums/NodeType';
import { ObfuscationEvents } from './enums/ObfuscationEvents';
import { VisitorDirection } from './enums/VisitorDirection';

import { Node } from './node/Node';
import { NodeUtils } from './node/NodeUtils';

@injectable()
export class Obfuscator implements IObfuscator {
    /**
     * @type {Map<string, string[]>}
     */
    private static readonly nodeControlFlowTransformersMap: Map <string, string[]> = new Map <string, string[]> ([
        [NodeType.FunctionDeclaration, ['FunctionControlFlowTransformer']],
        [NodeType.FunctionExpression, ['FunctionControlFlowTransformer']]
    ]);

    /**
     * @type {Map<string, string[]>}
     */
    private static readonly nodeObfuscatorsMap: Map <string, string[]> = new Map <string, string[]> ([
        [NodeType.ArrowFunctionExpression, ['FunctionObfuscator']],
        [NodeType.ClassDeclaration, ['FunctionDeclarationObfuscator']],
        [NodeType.CatchClause, ['CatchClauseObfuscator']],
        [NodeType.FunctionDeclaration, [
            'FunctionDeclarationObfuscator',
            'FunctionObfuscator'
        ]],
        [NodeType.FunctionExpression, ['FunctionObfuscator']],
        [NodeType.MemberExpression, ['MemberExpressionObfuscator']],
        [NodeType.MethodDefinition, ['MethodDefinitionObfuscator']],
        [NodeType.ObjectExpression, ['ObjectExpressionObfuscator']],
        [NodeType.VariableDeclaration, ['VariableDeclarationObfuscator']],
        [NodeType.LabeledStatement, ['LabeledStatementObfuscator']],
        [NodeType.Literal, ['LiteralObfuscator']]
    ]);

    /**
     * @type {(nodeTransformersMap: Map<string, string[]>) => (nodeType: string) => INodeTransformer[],}
     */
    private readonly nodeTransformersFactory: (nodeTransformersMap: Map<string, string[]>) => (nodeType: string) => INodeTransformer[];

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
     * @param nodeTransformersFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IStackTraceAnalyzer) stackTraceAnalyzer: IStackTraceAnalyzer,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers['Factory<INodeTransformer[]>']) nodeTransformersFactory: (nodeTransformersMap: Map<string, string[]>) => (nodeType: string) => INodeTransformer[],
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.stackTraceAnalyzer = stackTraceAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.nodeTransformersFactory = nodeTransformersFactory;
        this.options = options;
    }

    /**
     * @param astTree
     * @param customNodesStorage
     * @returns {ESTree.Program}
     */
    public obfuscateAstTree (astTree: ESTree.Program, customNodesStorage: IStorage<ICustomNode>): ESTree.Program {
        if (Node.isProgramNode(astTree) && !astTree.body.length) {
            return astTree;
        }

        NodeUtils.parentize(astTree);

        // prepare custom nodes
        customNodesStorage.initialize(this.stackTraceAnalyzer.analyze(astTree.body));
        customNodesStorage
            .getStorage()
            .forEach((customNode: ICustomNode) => {
                this.obfuscationEventEmitter.once(customNode.getAppendEvent(), customNode.appendNode.bind(customNode));
            });

        this.obfuscationEventEmitter.emit(ObfuscationEvents.BeforeObfuscation, astTree);

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

        this.obfuscationEventEmitter.emit(ObfuscationEvents.AfterObfuscation, astTree);

        return astTree;
    }

    /**
     * @param astTree
     * @param direction
     * @param nodeTransformersFactory
     */
    private transformAstTree (
        astTree: ESTree.Program,
        direction: TVisitorDirection,
        nodeTransformersFactory: (nodeType: string) => INodeTransformer[]
    ): void {
        estraverse.traverse(astTree, {
            [direction]: (node: ESTree.Node, parentNode: ESTree.Node): void => {
                const nodeTransformers: INodeTransformer[] = nodeTransformersFactory(node.type);

                nodeTransformers.forEach((nodeTransformer: INodeTransformer) => {
                    nodeTransformer.transformNode(node, parentNode);
                });
            }
        });
    }
}
