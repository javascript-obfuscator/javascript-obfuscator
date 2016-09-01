import * as estraverse from 'estraverse';

import { ICustomNode } from './interfaces/custom-nodes/ICustomNode';
import { INode } from './interfaces/nodes/INode';
import { IObfuscator } from "./interfaces/IObfuscator";
import { IOptions } from "./interfaces/IOptions";

import { TNodeObfuscator } from "./types/TNodeObfuscator";

import { AppendState } from './enums/AppendState';
import { NodeType } from './enums/NodeType';

import { CatchClauseObfuscator } from './node-obfuscators/CatchClauseObfuscator';
import { ConsoleOutputNodesGroup } from "./node-groups/ConsoleOutputNodesGroup";
import { DebugProtectionNodesGroup } from './node-groups/DebugProtectionNodesGroup';
import { DomainLockNodesGroup } from './node-groups/DomainLockNodesGroup';
import { FunctionDeclarationObfuscator } from './node-obfuscators/FunctionDeclarationObfuscator';
import { FunctionObfuscator } from './node-obfuscators/FunctionObfuscator';
import { LiteralObfuscator } from './node-obfuscators/LiteralObfuscator';
import { MemberExpressionObfuscator } from './node-obfuscators/MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from './node-obfuscators/MethodDefinitionObfuscator';
import { Nodes } from "./Nodes";
import { NodeUtils } from "./NodeUtils";
import { ObjectExpressionObfuscator } from './node-obfuscators/ObjectExpressionObfuscator';
import { SelfDefendingNodesGroup } from "./node-groups/SelfDefendingNodesGroup";
import { UnicodeArrayNodesGroup } from './node-groups/UnicodeArrayNodesGroup';
import { VariableDeclarationObfuscator } from './node-obfuscators/VariableDeclarationObfuscator';

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
     * @returns {INode}
     */
    public obfuscateNode (node: INode): INode {
        if (Nodes.isProgramNode(node) && !node.body.length) {
            return node;
        }

        NodeUtils.parentize(node);

        this.beforeObfuscation(node);
        this.obfuscate(node);
        this.afterObfuscation(node);

        return node;
    }

    /**
     * @param astTree
     */
    private afterObfuscation (astTree: INode): void {
        this.nodes.forEach((node: ICustomNode) => {
            if (node.getAppendState() === AppendState.AfterObfuscation) {
                node.appendNode(astTree);
            }
        });
    }

    /**
     * @param astTree
     */
    private beforeObfuscation (astTree: INode): void {
        this.nodes.forEach((node: ICustomNode) => {
            if (node.getAppendState() === AppendState.BeforeObfuscation) {
                node.appendNode(astTree);
            }
        });
    };


    /**
     * @param node
     * @param parentNode
     */
    private initializeNodeObfuscators (node: INode, parentNode: INode): void {
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
    private obfuscate (node: INode): void {
        estraverse.replace(node, {
            leave: (node: INode, parentNode: INode): any => {
                this.initializeNodeObfuscators(node, parentNode);
            }
        });
    }
}
