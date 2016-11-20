import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeControlFlowChanger } from './types/TNodeControlFlowChanger';
import { TNodeGroup } from './types/TNodeGroup';
import { TNodeObfuscator } from './types/TNodeObfuscator';

import { ICustomNode } from './interfaces/custom-nodes/ICustomNode';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/IOptions';
import { IStackTraceData } from './interfaces/stack-trace-analyzer/IStackTraceData';

import { AppendState } from './enums/AppendState';
import { NodeType } from './enums/NodeType';

import { CatchClauseObfuscator } from './node-obfuscators/CatchClauseObfuscator';
import { ConsoleOutputNodesGroup } from './node-groups/ConsoleOutputNodesGroup';
import { DebugProtectionNodesGroup } from './node-groups/DebugProtectionNodesGroup';
import { DomainLockNodesGroup } from './node-groups/DomainLockNodesGroup';
import { FunctionDeclarationObfuscator } from './node-obfuscators/FunctionDeclarationObfuscator';
import { FunctionObfuscator } from './node-obfuscators/FunctionObfuscator';
import { LabeledStatementObfuscator } from './node-obfuscators/LabeledStatementObfuscator';
import { LiteralObfuscator } from './node-obfuscators/LiteralObfuscator';
import { MemberExpressionObfuscator } from './node-obfuscators/MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from './node-obfuscators/MethodDefinitionObfuscator';
import { Node } from './node/Node';
import { NodeUtils } from './node/NodeUtils';
import { ObjectExpressionObfuscator } from './node-obfuscators/ObjectExpressionObfuscator';
import { SelfDefendingNodesGroup } from './node-groups/SelfDefendingNodesGroup';
import { StackTraceAnalyzer } from './stack-trace-analyzer/StackTraceAnalyzer';
import { StringArrayNodesGroup } from './node-groups/StringArrayNodesGroup';
import { VariableDeclarationObfuscator } from './node-obfuscators/VariableDeclarationObfuscator';
import { FunctionControlFlowChanger } from './node-control-flow-changers/FunctionControlFlowChanger';

export class Obfuscator implements IObfuscator {
    /**
     * @type {Map<string, TNodeControlFlowChanger[]>}
     */
    private static nodeControlFlowChangers: Map <string, TNodeControlFlowChanger[]> = new Map <string, TNodeControlFlowChanger[]> ([
        [NodeType.FunctionDeclaration, [FunctionControlFlowChanger]],
        [NodeType.FunctionExpression, [FunctionControlFlowChanger]]
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
     * @type {Map<string, TNodeObfuscator[]>}
     */
    private static nodeObfuscators: Map <string, TNodeObfuscator[]> = new Map <string, TNodeObfuscator[]> ([
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

        if (this.options.controlFlow) {
            this.changeControlFlow(node);
        }

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
     * @param node
     */
    private changeControlFlow (node: ESTree.Node): void {
        estraverse.traverse(node, {
            leave: (node: ESTree.Node, parentNode: ESTree.Node): void => {
                this.initializeNodeControlFlowChangers(node, parentNode);
            }
        });
    }

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
        let nodeControlFlowChangers: TNodeControlFlowChanger[] | undefined = Obfuscator.nodeControlFlowChangers.get(node.type);

        if (!nodeControlFlowChangers) {
            return;
        }

        nodeControlFlowChangers.forEach((controlFlowChanger: TNodeControlFlowChanger) => {
            new controlFlowChanger(this.customNodes, this.options).changeControlFlow(node, parentNode);
        });
    }

    /**
     * @param node
     * @param parentNode
     */
    private initializeNodeObfuscators (node: ESTree.Node, parentNode: ESTree.Node): void {
        let nodeObfuscators: TNodeObfuscator[] | undefined = Obfuscator.nodeObfuscators.get(node.type);

        if (!nodeObfuscators) {
            return;
        }

        nodeObfuscators.forEach((obfuscator: TNodeObfuscator) => {
            new obfuscator(this.customNodes, this.options).obfuscateNode(node, parentNode);
        });
    }

    /**
     * @param node
     */
    private obfuscate (node: ESTree.Node): void {
        estraverse.traverse(node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): void => {
                this.initializeNodeObfuscators(node, parentNode);
            }
        });
    }
}
