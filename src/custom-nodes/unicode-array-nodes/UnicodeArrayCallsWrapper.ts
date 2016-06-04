import * as esprima from 'esprima';

import { INode } from "../../interfaces/nodes/INode";
import { IOptions } from "../../interfaces/IOptions";

import { TBlockScopeNode } from "../../types/TBlockScopeNode";

import { AppendState } from "../../enums/AppendState";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

export class UnicodeArrayCallsWrapper extends Node {
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
     * @type {string}
     */
    private unicodeArrayCallsWrapperName: string;

    /**
     * @param unicodeArrayCallsWrapperName
     * @param unicodeArrayName
     * @param unicodeArray
     * @param options
     */
    constructor (
        unicodeArrayCallsWrapperName: string,
        unicodeArrayName: string,
        unicodeArray: string[],
        options: IOptions = {}
    ) {
        super(options);

        this.unicodeArrayCallsWrapperName = unicodeArrayCallsWrapperName;
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
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.unicodeArrayCallsWrapperName;
    };

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
        let code: string = '',
            environmentName: string = Utils.getRandomVariableName(),
            keyName: string = Utils.getRandomVariableName(),
            node: INode;

        if (this.options['selfDefending']) {
            code = `
                var ${environmentName} = function(){return ${Utils.stringToUnicode('production')};};
                                                                      
                if (
                    ${keyName} % ${Utils.getRandomInteger(this.unicodeArray.length / 8, this.unicodeArray.length / 2)} === 0 &&
                    /\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/.test(
                        ${environmentName}[${Utils.stringToUnicode('toString')}]()
                    ) === true || ${keyName}++
                ) {
                    return ${this.unicodeArrayName}[parseInt(${keyName}, 16)];
                }
                
                return ${this.unicodeArrayName}[parseInt(${keyName}, 16)];
            `;
        } else {
            code = `return ${this.unicodeArrayName}[parseInt(${keyName}, 16)]`;
        }

        node = esprima.parse(`
            var ${this.unicodeArrayCallsWrapperName} = function (${keyName}) {
                ${code}
            };
        `);

        NodeUtils.addXVerbatimPropertyToLiterals(node);

        return NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
