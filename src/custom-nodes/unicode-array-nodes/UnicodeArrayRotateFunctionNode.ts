import * as esprima from 'esprima';

import { INode } from "../../interfaces/nodes/INode";
import { IOptions } from "../../interfaces/IOptions";

import { TBlockScopeNode } from "../../types/TBlockScopeNode";

import { AppendState } from "../../enums/AppendState";
import { JSFuck } from "../../enums/JSFuck";

import { NO_CUSTOM_NODES_PRESET } from "../../preset-options/NoCustomNodesPreset";

import { JavaScriptObfuscator } from "../../JavaScriptObfuscator";
import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

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
     * @param options
     */
    constructor (
        unicodeArrayName: string,
        unicodeArray: string[],
        unicodeArrayRotateValue: number,
        options: IOptions = {}
    ) {
        super(options);

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;

        this.node = this.getNodeStructure();
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TBlockScopeNode): void {
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
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        let arrayName: string = Utils.getRandomVariableName(),
            code: string = '',
            timesName: string = Utils.getRandomVariableName(),
            timesArgumentName: string = Utils.getRandomVariableName(),
            whileFunctionName: string = Utils.getRandomVariableName(),
            node: INode;

        if (this.options['selfDefending']) {
            code = JavaScriptObfuscator.obfuscate(`
                (function () {
                    var func = function(){return ${Utils.stringToUnicode('dev')};};
                                        
                    !Function(${Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})().test(func.toString()) ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.True}){}')() : Function(${Utils.stringToUnicode('a')}, ${Utils.stringToUnicode('b')}, ${Utils.stringToUnicode('a(++b)')})(${whileFunctionName}, ${timesName}) ? []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.False}){}')() : []['filter']['constructor'](${Utils.stringToJSFuck('while')} + '(${JSFuck.False}){}')();
                })();
            `, NO_CUSTOM_NODES_PRESET);
        } else {
            code = `${whileFunctionName}(++${timesName})`;
        }

        node = esprima.parse(`
            (function (${arrayName}, ${timesName}) {
                var ${whileFunctionName} = function (${timesArgumentName}) {
                    while (--${timesArgumentName}) {
                        ${arrayName}[${Utils.stringToUnicode('push')}](${arrayName}[${Utils.stringToUnicode('shift')}]());
                    }
                };
                
                ${code}
            })(${this.unicodeArrayName}, 0x${Utils.decToHex(this.unicodeArrayRotateValue)});
        `);

        NodeUtils.addXVerbatimPropertyToLiterals(node);

        return NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
