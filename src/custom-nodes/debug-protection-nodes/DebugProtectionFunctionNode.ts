import * as esprima from 'esprima';

import { TBlockScopeNode } from "../../types/TBlockScopeNode";

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
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TBlockScopeNode): void {
        let programBodyLength: number = blockScopeNode.body.length,
            randomIndex: number = Utils.getRandomInteger(0, programBodyLength);

        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
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
