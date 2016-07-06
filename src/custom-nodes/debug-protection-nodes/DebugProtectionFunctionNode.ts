import { INode } from "../../interfaces/nodes/INode";
import { IOptions } from "../../interfaces/IOptions";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { Node } from '../Node';
import { NodeUtils } from '../../NodeUtils';
import { Utils } from "../../Utils";

export class DebugProtectionFunctionNode extends Node {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @type {string}
     */
    private debugProtectionFunctionName: string;

    /**
     * @param debugProtectionFunctionName
     * @param options
     */
    constructor (debugProtectionFunctionName: string, options: IOptions) {
        super(options);

        this.debugProtectionFunctionName = debugProtectionFunctionName;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        let programBodyLength: number = blockScopeNode.body.length,
            randomIndex: number = Utils.getRandomGenerator().integer({
                min: 0,
                max: programBodyLength
            });

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
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        return NodeUtils.convertCodeToStructure(`
            var ${this.debugProtectionFunctionName} = function () {
                function debuggerProtection (counter) {
                    if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {
                        (function () {}.constructor('debugger')());
                    } else {
                        [].filter.constructor(${Utils.stringToJSFuck('debugger')})();
                    }
                    
                    debuggerProtection(++counter);
                }
                
                try {
                    debuggerProtection(0);
                } catch (y) {}
            };
        `);
    }
}
