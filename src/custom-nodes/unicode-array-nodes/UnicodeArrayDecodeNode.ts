import * as esprima from 'esprima';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';

import { INode } from "../../interfaces/nodes/INode";
import { IOptions } from "../../interfaces/IOptions";

import { TBlockScopeNode } from "../../types/TBlockScopeNode";

import { AppendState } from "../../enums/AppendState";

import { NO_CUSTOM_NODES_PRESET } from "../../preset-options/NoCustomNodesPreset";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

export class UnicodeArrayDecodeNode extends Node {
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
     * @param unicodeArrayName
     * @param unicodeArray
     * @param options
     */
    constructor (
        unicodeArrayName: string,
        unicodeArray: string[],
        options: IOptions = {}
    ) {
        super(options);

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;

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

        this.updateNode();

        return super.getNode();
    }

    /**
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        const environmentName: string = Utils.getRandomVariableName(),
            indexVariableName: string = Utils.getRandomVariableName(),
            tempArrayName: string = Utils.getRandomVariableName();

        let node: INode,
            selfDefendingCode: string = '';

        if (this.options['selfDefending']) {
            selfDefendingCode = `
                var ${environmentName} = function(){return ${Utils.stringToUnicode('dev')};};
                                        
                if (
                    ${indexVariableName} % ${Utils.getRandomInteger(this.unicodeArray.length / 8, this.unicodeArray.length / 2)} === 0 &&
                    /\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/.test(
                        ${environmentName}[${Utils.stringToUnicode('toString')}]()
                    ) !== true && ${indexVariableName}++
                ) {
                    continue;
                }
            `;
        }

        node = esprima.parse(`
            (function () {
                ${JavaScriptObfuscator.obfuscate(`
                    (function () {
                        var object = []['filter']['constructor']('return this')();
                        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            
                        object.atob || (
                            object.atob = function(input) {
                                var str = String(input).replace(/=+$/, '');
                                for (
                                    var bc = 0, bs, buffer, idx = 0, output = '';
                                    buffer = str.charAt(idx++);
                                    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                                        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
                                ) {
                                    buffer = chars.indexOf(buffer);
                                }
                            return output;
                        });
                    })();
                `, NO_CUSTOM_NODES_PRESET)}
              
                var ${tempArrayName} = [];
                
                for (var ${indexVariableName} in ${this.unicodeArrayName}) {
                    ${selfDefendingCode}
                
                    ${tempArrayName}[${Utils.stringToUnicode('push')}](decodeURI(atob(${this.unicodeArrayName}[${indexVariableName}])));
                }
                
                ${this.unicodeArrayName} = ${tempArrayName};
            })();
        `);

        NodeUtils.addXVerbatimPropertyToLiterals(node);

        return NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
