import * as estraverse from 'estraverse';

import { ICatchClauseNode } from "../interfaces/nodes/ICatchClauseNode";
import { INode } from '../interfaces/nodes/INode';

import { NodeObfuscator } from './NodeObfuscator';

/**
 * replaces:
 *     try {} catch (e) { console.log(e); };
 *
 * on:
 *     try {} catch (_0x12d45f) { console.log(_0x12d45f); };
 *
 */
export class CatchClauseObfuscator extends NodeObfuscator {
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
            enter: (node: INode): any => this.storeIdentifiersNames(node, this.catchClauseParam)
        });
    }

    /**
     * @param catchClauseNode
     */
    private replaceCatchClauseParam (catchClauseNode: ICatchClauseNode): void {
        estraverse.replace(catchClauseNode, {
            enter: (node: INode, parentNode: INode): any => {
                this.replaceIdentifiersWithRandomNames(node, parentNode, this.catchClauseParam);
            }
        });
    }
}
