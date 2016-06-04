import { IExpressionStatementNode } from "../../interfaces/nodes/IExpressionStatementNode";
import { IOptions } from "../../interfaces/IOptions";

import { TBlockScopeNode } from "../../types/TBlockScopeNode";

import { NodeType } from "../../enums/NodeType";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";

export class DebugProtectionFunctionCallNode extends Node {
    /**
     * @type {string}
     */
    private debugProtectionFunctionName: string;

    /**
     * @param debugProtectionFunctionName
     * @param options
     */
    constructor (debugProtectionFunctionName: string, options: IOptions = {}) {
        super(options);

        this.debugProtectionFunctionName = debugProtectionFunctionName;

        this.node = this.getNodeStructure();
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TBlockScopeNode): void {
        NodeUtils.appendNode(blockScopeNode.body, this.getNode());
    }

    /**
     * @returns {IExpressionStatementNode}
     */
    protected getNodeStructure (): IExpressionStatementNode {
        return {
            'type': NodeType.ExpressionStatement,
            'expression': {
                'type': NodeType.CallExpression,
                'callee': {
                    'type': NodeType.Identifier,
                    'name': this.debugProtectionFunctionName
                },
                'arguments': []
            }
        };
    }
}
