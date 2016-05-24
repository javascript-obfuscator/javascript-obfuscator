import * as esprima from 'esprima';

import { INode } from "../../interfaces/nodes/INode";

import { BlockScopeNode } from "../../types/BlockScopeNode";

import { AppendState } from "../../enums/AppendState";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import {Utils} from "../../Utils";
import {Obfuscator} from "../../Obfuscator";

export class UnicodeArrayRotateFunctionNode extends Node {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string[]}
     */
    private unicodeArray: string[];

    /**
     * @type {string}
     */
    private unicodeArrayName: string;

    /**
     * @param {number}
     */
    private unicodeArrayRotateValue: number;

    /**
     * @param unicodeArrayName
     * @param unicodeArray
     * @param unicodeArrayRotateValue
     */
    constructor (
        unicodeArrayName: string,
        unicodeArray: string[],
        unicodeArrayRotateValue
    ) {
        super();

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;

        this.node = this.getNodeStructure();
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: BlockScopeNode): void {
        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }

    /**
     * @returns {INode}
     */
    public getNode (): INode {
        if (!this.unicodeArray.length) {
            return;
        }

        return super.getNode();
    }

    /**
     * @returns any
     */
    protected getNodeStructure (): any {
        return NodeUtils.getBlockScopeNodeByIndex(
            esprima.parse(`
                    (function (array, times, reverse) {
                        if (times < 0) {
                            return;
                        }
                    
                        var temp;
                    
                        while (times--) {
                            if (!reverse) {
                                temp = array.pop();
                                array.unshift(temp);
                            } else {
                                temp = array.shift();
                                array.push(temp);
                            }
                        }
                    })(${this.unicodeArrayName}, ${this.unicodeArrayRotateValue}, true);
                `)
        );

        /*return new Obfuscator({
            rotateUnicodeArray: false
        }).obfuscateNode(
            NodeUtils.getBlockScopeNodeByIndex(
                esprima.parse(`
                    (function (array, times, reverse) {
                        if (times < 0) {
                            return;
                        }
                    
                        var temp;
                    
                        while (times--) {
                            if (!reverse) {
                                temp = array.pop();
                                array.unshift(temp);
                            } else {
                                temp = array.shift();
                                array.push(temp);
                            }
                        }
                    })(${this.unicodeArrayName}, ${this.unicodeArrayRotateValue}, true);
                `)
            )
        );*/
    }
}
