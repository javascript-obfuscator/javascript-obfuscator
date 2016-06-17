import * as estraverse from 'estraverse';

import { ICatchClauseNode } from "../interfaces/nodes/ICatchClauseNode";
import { INode } from '../interfaces/nodes/INode';

import { NodeObfuscator } from './NodeObfuscator';
import { Nodes } from "../Nodes";
import { Utils } from '../Utils';
import {IBlockStatementNode} from "../interfaces/nodes/IBlockStatementNode";

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
        this.replaceCatchClauseParam(catchClauseNode);
        this.replaceCatchClauseParamInBlockStatement(catchClauseNode);
    }

    /**
     * @param catchClauseNode
     */
    private replaceCatchClauseParam (catchClauseNode: ICatchClauseNode): void {
        estraverse.replace(catchClauseNode.param, {
            leave: (node: INode): any => this.replaceAndStoreIdentifiersNames(node, this.catchClauseParam)
        });
    }

    /**
     * @param catchClauseNode
     */
    private replaceCatchClauseParamInBlockStatement (catchClauseNode: ICatchClauseNode): void {
        estraverse.replace(catchClauseNode.body, {
            leave: (node: INode, parentNode: INode): any => {
                this.replaceNodeIdentifierWithNewValue(node, parentNode, this.catchClauseParam);
            }
        });
    }
}
