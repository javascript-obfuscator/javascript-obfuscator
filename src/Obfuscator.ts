import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICustomNode } from './interfaces/custom-nodes/ICustomNode';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/IOptions';
import { IStackTraceData } from './interfaces/stack-trace-analyzer/IStackTraceData';

import { TNodeObfuscator } from './types/TNodeObfuscator';

import { AppendState } from './enums/AppendState';
import { NodeType } from './enums/NodeType';

import { CatchClauseObfuscator } from './node-obfuscators/CatchClauseObfuscator';
import { ConsoleOutputNodesGroup } from './node-groups/ConsoleOutputNodesGroup';
import { DebugProtectionNodesGroup } from './node-groups/DebugProtectionNodesGroup';
import { DomainLockNodesGroup } from './node-groups/DomainLockNodesGroup';
import { FunctionDeclarationObfuscator } from './node-obfuscators/FunctionDeclarationObfuscator';
import { FunctionObfuscator } from './node-obfuscators/FunctionObfuscator';
import { LiteralObfuscator } from './node-obfuscators/LiteralObfuscator';
import { MemberExpressionObfuscator } from './node-obfuscators/MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from './node-obfuscators/MethodDefinitionObfuscator';
import { Nodes } from './Nodes';
import { NodeUtils } from './NodeUtils';
import { ObjectExpressionObfuscator } from './node-obfuscators/ObjectExpressionObfuscator';
import { SelfDefendingNodesGroup } from './node-groups/SelfDefendingNodesGroup';
import { UnicodeArrayNodesGroup } from './node-groups/UnicodeArrayNodesGroup';
import { VariableDeclarationObfuscator } from './node-obfuscators/VariableDeclarationObfuscator';
import { StackTraceAnalyzer } from './stack-trace-analyzer/StackTraceAnalyzer';

export class Obfuscator implements IObfuscator {
    /**
     * @type {Map<string, AbstractCustomNode>}
     */
    private nodes: Map <string, ICustomNode>;

    /**
     * @type {Map<string, TNodeObfuscator[]>}
     */
    private nodeObfuscators: Map <string, TNodeObfuscator[]> = new Map <string, TNodeObfuscator[]> ([
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
        [NodeType.Literal, [LiteralObfuscator]]
    ]);

    /**
     * @type {IOptions}
     */
    private options: IOptions;

    /**
     * @param options
     */
    constructor (options: IOptions) {
        this.options = options;

        this.nodes = new Map <string, ICustomNode> ([
            ...new DomainLockNodesGroup(this.options).getNodes(),
            ...new SelfDefendingNodesGroup(this.options).getNodes(),
            ...new ConsoleOutputNodesGroup(this.options).getNodes(),
            ...new DebugProtectionNodesGroup(this.options).getNodes(),
            ...new UnicodeArrayNodesGroup(this.options).getNodes()
        ]);
    }

    /**
     * @param node
     * @returns {ESTree.Node}
     */
    public obfuscateNode (node: ESTree.Program): ESTree.Node {
        if (Nodes.isProgramNode(node) && !node.body.length) {
            return node;
        }

        NodeUtils.parentize(node);

        const stackTraceData: IStackTraceData[] = new StackTraceAnalyzer(node.body).analyze();

        this.beforeObfuscation(node, stackTraceData);
        this.obfuscate(node);
        this.afterObfuscation(node, stackTraceData);

        return node;
    }

    /**
     * @param astTree
     * @param stackTraceData
     */
    private afterObfuscation (astTree: ESTree.Node, stackTraceData: IStackTraceData[]): void {
        this.nodes.forEach((node: ICustomNode) => {
            if (node.getAppendState() === AppendState.AfterObfuscation) {
                node.appendNode(astTree, stackTraceData);
            }
        });
    }

    /**
     * @param astTree
     * @param stackTraceData
     */
    private beforeObfuscation (astTree: ESTree.Node, stackTraceData: IStackTraceData[]): void {
        this.nodes.forEach((node: ICustomNode) => {
            if (node.getAppendState() === AppendState.BeforeObfuscation) {
                node.appendNode(astTree, stackTraceData);
            }
        });
    };


    /**
     * @param node
     * @param parentNode
     */
    private initializeNodeObfuscators (node: ESTree.Node, parentNode: ESTree.Node): void {
        let nodeObfuscators: TNodeObfuscator[] | undefined = this.nodeObfuscators.get(node.type);

        if (!nodeObfuscators) {
            return;
        }

        nodeObfuscators.forEach((obfuscator: TNodeObfuscator) => {
            new obfuscator(this.nodes, this.options).obfuscateNode(node, parentNode);
        });
    }

    /**
     * @param node
     */
    private obfuscate (node: ESTree.Node): void {
        estraverse.replace(node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                this.initializeNodeObfuscators(node, parentNode);
            }
        });
    }
}
