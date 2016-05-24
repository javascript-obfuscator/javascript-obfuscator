import * as esprima from 'esprima';
import * as estraverse from 'estraverse';

import { INode } from '../../interfaces/nodes/INode';

import { Node } from '../Node';
import { NodeUtils } from '../../NodeUtils';
import { Utils } from "../../Utils";

export class DebugProtectionFunctionNode extends Node {
    /**
     * @type {string}
     */
    private debugProtectionFunctionName: string;

    /**
     * @param debugProtectionFunctionName
     */
    constructor (
        debugProtectionFunctionName: string
    ) {
        super();

        this.debugProtectionFunctionName = debugProtectionFunctionName;

        this.node = this.getNodeStructure();
    }

    /**
     * @param astTree
     */
    public appendNode (astTree: INode): void {
        estraverse.replace(astTree, {
            leave: (node: INode, parent: INode): any => {
                if (NodeUtils.isProgramNode(node)) {
                    let programBodyLength: number = node.body.length,
                        randomIndex = Utils.getRandomInteger(0, programBodyLength);

                    NodeUtils.insertNodeAtIndex(node.body, this.getNode(), randomIndex);

                    return estraverse.VisitorOption.Break;
                }

                return estraverse.VisitorOption.Skip;
            }
        });
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.debugProtectionFunctionName;
    }

    /**
     * Found this trick in JScrambler
     *
     * @returns any
     */
    protected getNodeStructure (): any {
        return NodeUtils.getBlockScopeNodeByIndex(
            esprima.parse(`
                var ${this.debugProtectionFunctionName} = function () {
                    function debuggerProtection (counter) {
                        if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {
                            (function () {}.constructor('debugger')());
                        } else {
                            [].filter.constructor((undefined + '')[2] + (!![] + '')[3] + (Function('return{}')() + '')[2] + (undefined + '')[0] + (![] + [0] + String)[20] + (![] + [0] + String)[20] + (!![] + '')[3] + (!![] + '')[1])();
                        }
                        
                        debuggerProtection(++counter);
                    }
                    
                    try {
                        debuggerProtection(0);
                    } catch (y) {}
                };
            `)
        );
    }
}
