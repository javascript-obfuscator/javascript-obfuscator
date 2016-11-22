import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeGroup } from './types/TNodeGroup';
import { TNodeTransformer } from './types/TNodeTransformer';

import { ICustomNode } from './interfaces/custom-nodes/ICustomNode';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/IOptions';
import { IStackTraceData } from './interfaces/stack-trace-analyzer/IStackTraceData';

import { AppendState } from './enums/AppendState';
import { NodeType } from './enums/NodeType';

import { CatchClauseObfuscator } from './node-transformers/node-obfuscators/CatchClauseObfuscator';
import { ConsoleOutputNodesGroup } from './node-groups/ConsoleOutputNodesGroup';
import { DebugProtectionNodesGroup } from './node-groups/DebugProtectionNodesGroup';
import { DomainLockNodesGroup } from './node-groups/DomainLockNodesGroup';
import { FunctionDeclarationObfuscator } from './node-transformers/node-obfuscators/FunctionDeclarationObfuscator';
import { FunctionObfuscator } from './node-transformers/node-obfuscators/FunctionObfuscator';
import { LabeledStatementObfuscator } from './node-transformers/node-obfuscators/LabeledStatementObfuscator';
import { LiteralObfuscator } from './node-transformers/node-obfuscators/LiteralObfuscator';
import { MemberExpressionObfuscator } from './node-transformers/node-obfuscators/MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from './node-transformers/node-obfuscators/MethodDefinitionObfuscator';
import { Node } from './node/Node';
import { NodeUtils } from './node/NodeUtils';
import { ObjectExpressionObfuscator } from './node-transformers/node-obfuscators/ObjectExpressionObfuscator';
import { SelfDefendingNodesGroup } from './node-groups/SelfDefendingNodesGroup';
import { StackTraceAnalyzer } from './stack-trace-analyzer/StackTraceAnalyzer';
import { StringArrayNodesGroup } from './node-groups/StringArrayNodesGroup';
import { VariableDeclarationObfuscator } from './node-transformers/node-obfuscators/VariableDeclarationObfuscator';
import { FunctionControlFlowTransformer } from './node-transformers/node-control-flow-transformers/FunctionControlFlowTransformer';

export class Obfuscator implements IObfuscator {
    /**
     * @type {Map<string, TNodeTransformer[]>}
     */
    private static nodeControlFlowChangers: Map <string, TNodeTransformer[]> = new Map <string, TNodeTransformer[]> ([
        [NodeType.FunctionDeclaration, [FunctionControlFlowTransformer]],
        [NodeType.FunctionExpression, [FunctionControlFlowTransformer]]
    ]);

    /**
     * @type {TNodeGroup[]}
     */
    private static nodeGroups: TNodeGroup[] = [
        DomainLockNodesGroup,
        SelfDefendingNodesGroup,
        ConsoleOutputNodesGroup,
        DebugProtectionNodesGroup,
        StringArrayNodesGroup
    ];

    /**
     * @type {Map<string, TNodeTransformer[]>}
     */
    private static nodeObfuscators: Map <string, TNodeTransformer[]> = new Map <string, TNodeTransformer[]> ([
        [NodeType.ArrowFunctionExpression, [FunctionObfuscator]],
        [NodeType.ClassDeclaration, [FunctionDeclarationObfuscator]],
        [NodeType.CatchClause, [CatchClauseObfuscator]],
        [NodeType.FunctionDeclaration, [
            FunctionDeclarationObfuscator,
            FunctionObfuscator
        ]],
        [NodeType.FunctionExpression, [FunctionObfuscator]],
        [NodeType.MemberExpression, [MemberExpressionObfuscator]],
        [NodeType.MethodDefinition, [MethodDefinitionObfuscator]],
        [NodeType.ObjectExpression, [ObjectExpressionObfuscator]],
        [NodeType.VariableDeclaration, [VariableDeclarationObfuscator]],
        [NodeType.LabeledStatement, [LabeledStatementObfuscator]],
        [NodeType.Literal, [LiteralObfuscator]]
    ]);

    /**
     * @type {Map<string, AbstractCustomNode>}
     */
    private customNodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ();

    /**
     * @type {IOptions}
     */
    private options: IOptions;

    /**
     * @param options
     */
    constructor (options: IOptions) {
        this.options = options;
    }

    /**
     * @param node
     * @returns {ESTree.Node}
     */
    public obfuscateNode (node: ESTree.Program): ESTree.Node {
        if (Node.isProgramNode(node) && !node.body.length) {
            return node;
        }

        NodeUtils.parentize(node);

        const stackTraceData: IStackTraceData[] = new StackTraceAnalyzer(node.body).analyze();

        this.initializeCustomNodes(stackTraceData);

        this.beforeObfuscation(node);
        this.obfuscate(node);
        this.afterObfuscation(node);

        return node;
    }

    /**
     * @param astTree
     */
    private afterObfuscation (astTree: ESTree.Node): void {
        this.customNodes.forEach((node: ICustomNode) => {
            if (node.getAppendState() === AppendState.AfterObfuscation) {
                node.appendNode(astTree);
            }
        });
    }

    /**
     * @param astTree
     */
    private beforeObfuscation (astTree: ESTree.Node): void {
        this.customNodes.forEach((node: ICustomNode) => {
            if (node.getAppendState() === AppendState.BeforeObfuscation) {
                node.appendNode(astTree);
            }
        });
    };

    /**
     * @param stackTraceData
     */
    private initializeCustomNodes (stackTraceData: IStackTraceData[]): void {
        let customNodes: [string, ICustomNode][] = [];

        Obfuscator.nodeGroups.forEach((nodeGroupConstructor: TNodeGroup) => {
            const nodeGroupNodes: Map <string, ICustomNode> | undefined = new nodeGroupConstructor(
                stackTraceData, this.options
            ).getNodes();

            if (!nodeGroupNodes) {
                return;
            }

            customNodes.push(...nodeGroupNodes);
        });

        this.customNodes = new Map <string, ICustomNode> (customNodes);
    }

    /**
     * @param node
     * @param parentNode
     */
    private initializeNodeControlFlowChangers (node: ESTree.Node, parentNode: ESTree.Node): void {
        this.initializeNodeTransformers(node, parentNode, Obfuscator.nodeControlFlowChangers);
    }

    /**
     * @param node
     * @param parentNode
     */
    private initializeNodeObfuscators (node: ESTree.Node, parentNode: ESTree.Node): void {
        this.initializeNodeTransformers(node, parentNode, Obfuscator.nodeObfuscators);
    }

    /**
     * @param node
     * @param parentNode
     * @param nodeTransformersMap
     */
    private initializeNodeTransformers (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        nodeTransformersMap: Map <string, TNodeTransformer[]>
    ): void {
        let nodeTransformers: TNodeTransformer[] | undefined = nodeTransformersMap.get(node.type);

        if (!nodeTransformers) {
            return;
        }

        nodeTransformers.forEach((transformer: TNodeTransformer) => {
            new transformer(this.customNodes, this.options).transformNode(node, parentNode);
        });
    }

    /**
     * @param node
     */
    private obfuscate (node: ESTree.Node): void {
        // first pass: control flow flattening
        if (this.options.controlFlowFlattening) {
            estraverse.traverse(node, {
                leave: (node: ESTree.Node, parentNode: ESTree.Node): void => {
                    this.initializeNodeControlFlowChangers(node, parentNode);
                }
            });
        }

        // second pass: nodes obfuscation
        estraverse.traverse(node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): void => {
                this.initializeNodeObfuscators(node, parentNode);
            }
        });
    }
}
