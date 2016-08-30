import * as estraverse from 'estraverse';

import { ICatchClauseNode } from "../interfaces/nodes/ICatchClauseNode";
import { INode } from '../interfaces/nodes/INode';

import { AbstractNodeObfuscator } from './AbstractNodeObfuscator';
import { IdentifierReplacer } from "./replacers/IdentifierReplacer";
import { Nodes } from "../Nodes";

/**
 * replaces:
 *     try {} catch (e) { console.log(e); };
 *
 * on:
 *     try {} catch (_0x12d45f) { console.log(_0x12d45f); };
 *
 */
export class CatchClauseObfuscator extends AbstractNodeObfuscator {
    /**
     * @type {Map<string, string>}
     */
    private catchClauseParam: Map <string, string> = new Map <string, string> ();

    /**
     * @param catchClauseNode
     */
    public obfuscateNode (catchClauseNode: ICatchClauseNode): void {
        this.storeCatchClauseParam(catchClauseNode);
        this.replaceCatchClauseParam(catchClauseNode);
    }

    /**
     * @param catchClauseNode
     */
    private storeCatchClauseParam (catchClauseNode: ICatchClauseNode): void {
        estraverse.traverse(catchClauseNode.param, {
            leave: (node: INode): any => this.storeIdentifiersNames(node, this.catchClauseParam)
        });
    }

    /**
     * @param catchClauseNode
     */
    private replaceCatchClauseParam (catchClauseNode: ICatchClauseNode): void {
        estraverse.replace(catchClauseNode, {
            leave: (node: INode, parentNode: INode): any => {
                if (Nodes.isReplaceableIdentifierNode(node, parentNode)) {
                    node.name = new IdentifierReplacer(this.nodes, this.options)
                        .replace(node.name, this.catchClauseParam);
                }
            }
        });
    }
}
