import * as esprima from 'esprima';
import * as estraverse from 'estraverse';

import { ITreeNode } from '../../interfaces/nodes/ITreeNode';

import { Node } from '../Node';
import { NodeUtils } from '../../NodeUtils';

export class DebugProtectionFunctionNode extends Node {
    /**
     * @type {string}
     */
    private debugProtectionFunctionName: string;

    /**
     * @type {number}
     */
    private debugProtectionFunctionIndex: number;

    /**
     * @param astTree
     * @param debugProtectionFunctionName
     * @param debugProtectionFunctionIndex
     */
    constructor (
        astTree: ITreeNode,
        debugProtectionFunctionName: string,
        debugProtectionFunctionIndex: number
    ) {
        super();

        this.astTree = astTree;
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.debugProtectionFunctionIndex = debugProtectionFunctionIndex;

        this.node = this.getNodeStructure();
    }

    public appendNode (): void {
        estraverse.replace(this.astTree, {
            leave: (node: ITreeNode, parent: ITreeNode): any => {
                if (NodeUtils.isProgramNode(node)) {
                    NodeUtils.insertNodeAtIndex(node.body, this.getNode(), this.debugProtectionFunctionIndex);

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
