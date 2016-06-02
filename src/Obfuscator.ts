import * as estraverse from 'estraverse';

import { ICustomNode } from './interfaces/ICustomNode';
import { INodesGroup } from './interfaces/INodesGroup';
import { INode } from './interfaces/nodes/INode';
import { IOptions } from "./interfaces/IOptions";

import { TNodeObfuscator } from "./types/TNodeObfuscator";

import { AppendState } from './enums/AppendState';
import { NodeType } from './enums/NodeType';

import { CatchClauseObfuscator } from './node-obfuscators/CatchClauseObfuscator';
import { ConsoleOutputDisableExpressionNode } from './custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode';
import { DebugProtectionNodesGroup } from './node-groups/DebugProtectionNodesGroup';
import { FunctionDeclarationObfuscator } from './node-obfuscators/FunctionDeclarationObfuscator';
import { FunctionObfuscator } from './node-obfuscators/FunctionObfuscator';
import { LiteralObfuscator } from './node-obfuscators/LiteralObfuscator';
import { MemberExpressionObfuscator } from './node-obfuscators/MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from './node-obfuscators/MethodDefinitionObfuscator';
import { NodeUtils } from "./NodeUtils";
import { ObjectExpressionObfuscator } from './node-obfuscators/ObjectExpressionObfuscator';
import { UnicodeArrayNodesGroup } from './node-groups/UnicodeArrayNodesGroup';
import { VariableDeclarationObfuscator } from './node-obfuscators/VariableDeclarationObfuscator';

export class Obfuscator {
    /**
     * @type {Map<string, Node>}
     */
    private nodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ();

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
    constructor (options: IOptions = {}) {
        this.options = options;
    }

    /**
     * @param node
     * @returns {INode}
     */
    public obfuscateNode (node: INode): INode {
        this.setNewNodes();

        NodeUtils.parentize(node);

        this.beforeObfuscation(node);
        this.obfuscate(node);
        this.afterObfuscation(node);

        return node;
    }

    /**
     * @param nodeName
     * @param node
     */
    public setNode (nodeName: string, node: ICustomNode): void {
        this.nodes.set(nodeName, node);
    }

    /**
     * @param nodesGroup
     */
    public setNodesGroup (nodesGroup: INodesGroup): void {
        let nodes: Map <string, ICustomNode> = nodesGroup.getNodes();

        nodes.forEach((node: ICustomNode, key: string) => {
            this.nodes.set(key, node);
        });
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
        if (!this.nodeObfuscators.has(node.type)) {
            return;
        }

        this.nodeObfuscators.get(node.type).forEach((obfuscator: TNodeObfuscator) => {
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

    private setNewNodes (): void {
        if (this.options['disableConsoleOutput']) {
            this.setNode(
                'consoleOutputDisableExpressionNode',
                new ConsoleOutputDisableExpressionNode()
            );
        }

        if (this.options['debugProtection']) {
            this.setNodesGroup(new DebugProtectionNodesGroup(this.options));
        }

        if (this.options['unicodeArray']) {
            /**
             * Important to set this nodes latest to prevent runtime errors caused by `rotateUnicodeArray` option
             */
            this.setNodesGroup(new UnicodeArrayNodesGroup(this.options));
        }
    }
}
