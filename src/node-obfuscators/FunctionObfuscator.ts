import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICustomNode } from "../interfaces/custom-nodes/ICustomNode";
import { IOptions } from "../interfaces/IOptions";

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
     * @type {IdentifierReplacer}
     */
    private identifierReplacer: IdentifierReplacer;

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
    public obfuscateNode (functionNode: ESTree.Function): void {
        this.storeFunctionParams(functionNode);
        this.replaceFunctionParams(functionNode);
    }

    /**
     * @param functionNode
     */
    private storeFunctionParams (functionNode: ESTree.Function): void {
        functionNode.params
            .forEach((paramsNode: ESTree.Node) => {
                NodeUtils.typedReplace(paramsNode, NodeType.Identifier, {
                    leave: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name)
                });
            });
    }

    /**
     * @param functionNode
     */
    private replaceFunctionParams (functionNode: ESTree.Function): void {
        let replaceVisitor: estraverse.Visitor = {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Nodes.isReplaceableIdentifierNode(node, parentNode)) {
                    const newNodeName: string = this.identifierReplacer.replace(node.name);

                    if (node.name !== newNodeName) {
                        node.name = newNodeName;
                        node.obfuscated = true;
                    }
                }
            }
        };

        functionNode.params
            .forEach((paramsNode: ESTree.Node) => {
                estraverse.replace(paramsNode, replaceVisitor);
            });

        estraverse.replace(functionNode.body, replaceVisitor);
    }
}
