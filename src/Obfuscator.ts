import * as estraverse from 'estraverse';

import { ICustomNode } from './interfaces/ICustomNode';
import { INodeObfuscator } from './interfaces/INodeObfuscator';
import { INodesGroup } from './interfaces/INodesGroup';
import { INode } from './interfaces/nodes/INode';

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
import { UnicodeArrayNode } from './custom-nodes/unicode-array-nodes/UnicodeArrayNode';
import { UnicodeArrayNodesGroup } from './node-groups/UnicodeArrayNodesGroup';
import { Utils } from './Utils';
import { VariableDeclarationObfuscator } from './node-obfuscators/VariableDeclarationObfuscator';

export class Obfuscator {
    /**
     * @type {Map<string, Node>}
     */
    private nodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ();

    /**
     * @type {Map<string, Function[]>}
     */
    private nodeObfuscators: Map <string, Function[]> = new Map <string, Function[]> ([
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
     * @type any
     */
    private options: any;

    /**
     * @param options
     */
    constructor (options: any = {}) {
        this.options = options;
    }

    /**
     * @param node
     */
    public obfuscateNode (node: INode): void {
        this.setNewNodes();

        NodeUtils.parentize(node);

        this.beforeObfuscation(node);
        this.obfuscate(node);
        this.afterObfuscation(node);
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
                node.appendNode(NodeUtils.getBlockScopeOfNode(astTree));
            }
        });
    }

    /**
     * @param astTree
     */
    private beforeObfuscation (astTree: INode): void {
        this.nodes.forEach((node: ICustomNode) => {
            if (node.getAppendState() === AppendState.BeforeObfuscation) {
                node.appendNode(NodeUtils.getBlockScopeOfNode(astTree));
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

        this.nodeObfuscators.get(node.type).forEach((obfuscator: Function) => {
            new (<INodeObfuscator> obfuscator(this.nodes)).obfuscateNode(node, parentNode);
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

        /**
         * Important to set this nodes latest to prevent runtime errors cause by `rotateUnicodeArray` option
         */
        if (this.options['rotateUnicodeArray']) {
            this.setNodesGroup(new UnicodeArrayNodesGroup());
        } else {
            this.setNode(
                'unicodeArrayNode',
                new UnicodeArrayNode(Utils.getRandomVariableName(UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH))
            );
        }
    }
}
