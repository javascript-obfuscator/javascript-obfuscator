import * as estraverse from 'estraverse';

import { ICustomNode } from "../interfaces/custom-nodes/ICustomNode";
import { IFunctionNode } from "../interfaces/nodes/IFunctionNode";
import { IIdentifierNode } from "../interfaces/nodes/IIdentifierNode";
import { INode } from "../interfaces/nodes/INode";
import { IOptions } from "../interfaces/IOptions";
import { IReplacer } from "../interfaces/IReplacer";

import { NodeType } from "../enums/NodeType";

import { AbstractNodeObfuscator } from './AbstractNodeObfuscator';
import { IdentifierReplacer } from "./replacers/IdentifierReplacer";
import { Nodes } from "../Nodes";
import { NodeUtils } from "../NodeUtils";

/**
 * replaces:
 *     function foo (argument1) { return argument1; };
 *
 * on:
 *     function foo (_0x12d45f) { return _0x12d45f; };
 *
 */
export class FunctionObfuscator extends AbstractNodeObfuscator {
    /**
     * @type {Map<string, string>}
     */
    private functionParams: Map <string, string> = new Map <string, string> ();

    /**
     * @type {IReplacer&IdentifierReplacer}
     */
    private identifierReplacer: IReplacer&IdentifierReplacer;

    /**
     * @param nodes
     * @param options
     */
    constructor(nodes: Map <string, ICustomNode>, options: IOptions) {
        super(nodes, options);

        this.identifierReplacer = new IdentifierReplacer(this.nodes, this.options);
    }

    /**
     * @param functionNode
     */
    public obfuscateNode (functionNode: IFunctionNode): void {
        this.storeFunctionParams(functionNode);
        this.replaceFunctionParams(functionNode);
    }

    /**
     * @param functionNode
     */
    private storeFunctionParams (functionNode: IFunctionNode): void {
        functionNode.params
            .forEach((paramsNode: INode) => {
                NodeUtils.typedReplace(paramsNode, NodeType.Identifier, {
                    leave: (node: IIdentifierNode) => {
                        this.identifierReplacer.storeNames(node.name, this.functionParams)
                    }
                });
            });
    }

    /**
     * @param functionNode
     */
    private replaceFunctionParams (functionNode: IFunctionNode): void {
        let replaceVisitor: estraverse.Visitor = {
            leave: (node: INode, parentNode: INode): any => {
                if (Nodes.isReplaceableIdentifierNode(node, parentNode)) {
                    node.name = this.identifierReplacer.replace(node.name, this.functionParams);
                }
            }
        };

        functionNode.params
            .forEach((paramsNode: INode) => {
                estraverse.replace(paramsNode, replaceVisitor);
            });

        estraverse.replace(functionNode.body, replaceVisitor);
    }
}
