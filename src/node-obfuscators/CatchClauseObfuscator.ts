import { NodeObfuscator } from './NodeObfuscator';
import { Utils } from '../Utils';

let estraverse = require('estraverse');

/**
 * replaces:
 *     try {} catch (e) { console.log(e); };
 *
 * by:
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
    public obfuscateNode (catchClauseNode: any): void {
        this.replaceCatchClauseParam(catchClauseNode);
        this.replaceCatchClauseParamInBlock(catchClauseNode);
    }

    /**
     * @param catchClauseNode
     */
    private replaceCatchClauseParam (catchClauseNode: any): void {
        estraverse.replace(catchClauseNode.param, {
            leave: (node, parentNode) => {
                if (node.type !== 'Identifier') {
                    return;
                }

                this.catchClauseParam.set(node.name, Utils.getRandomVariableName());
                node.name = this.catchClauseParam.get(node.name);
            }
        });
    }

    /**
     * @param catchClauseNode
     */
    private replaceCatchClauseParamInBlock (catchClauseNode: any): void {
        estraverse.replace(catchClauseNode.body, {
            leave: (node, parentNode) => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.catchClauseParam);
            }
        });
    }
}