import * as estraverse from 'estraverse';

import { ICatchClauseNode } from "../interfaces/nodes/ICatchClauseNode";
import { INode } from '../interfaces/nodes/INode';

import { NodeObfuscator } from './NodeObfuscator';
import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

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
        this.replaceCatchClauseParamInBlock(catchClauseNode);
    }

    /**
     * @param catchClauseNode
     */
    private replaceCatchClauseParam (catchClauseNode: ICatchClauseNode): void {
        estraverse.replace(catchClauseNode.param, {
            leave: (node: INode, parentNode: INode): any => {
                if (NodeUtils.isIdentifierNode(node) && !this.isReservedName(node.name)) {
                    this.catchClauseParam.set(node.name, Utils.getRandomVariableName());
                    node.name = this.catchClauseParam.get(node.name);

                    return;
                }

                return estraverse.VisitorOption.Skip;
            }
        });
    }

    /**
     * @param catchClauseNode
     */
    private replaceCatchClauseParamInBlock (catchClauseNode: ICatchClauseNode): void {
        estraverse.replace(catchClauseNode.body, {
            leave: (node: INode, parentNode: INode): any => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.catchClauseParam);
            }
        });
    }
}
