import * as ESTree from 'estree';

import 'format-unicorn';

import { IOptions } from 'app/interfaces/IOptions';

import { TNodeWithBlockStatement } from 'app/types/TNodeWithBlockStatement';

import { AppendState } from 'app/enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from 'app/preset-options/NoCustomNodesPreset';

import { SelfDefendingTemplate } from 'app/templates/custom-nodes/unicode-array-nodes/unicode-array-rotate-function-node/SelfDefendingTemplate';
import { UnicodeArrayRotateFunctionTemplate } from 'app/templates/custom-nodes/unicode-array-nodes/unicode-array-rotate-function-node/UnicodeArrayRotateFunctionTemplate';

import { AbstractCustomNode } from 'app/custom-nodes/AbstractCustomNode';
import { JavaScriptObfuscator } from 'app/JavaScriptObfuscator';
import { NodeUtils } from 'app/NodeUtils';
import { UnicodeArray } from 'app/UnicodeArray';
import { Utils } from 'app/Utils';

export class UnicodeArrayRotateFunctionNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {UnicodeArray}
     */
    private unicodeArray: UnicodeArray;

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
        unicodeArray: UnicodeArray,
        unicodeArrayRotateValue: number,
        options: IOptions
    ) {
        super(options);

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.unicodeArray.getLength()) {
            return;
        }

        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }

    /**
     * @returns {ESTree.Node}
     */
    public getNode (): ESTree.Node {
        return super.getNode();
    }

    /**
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
        let code: string = '',
            timesName: string = Utils.getRandomVariableName(),
            whileFunctionName: string = Utils.getRandomVariableName();

        if (this.options.selfDefending) {
            code = SelfDefendingTemplate().formatUnicorn({
                timesName,
                whileFunctionName
            });
        } else {
            code = `${whileFunctionName}(++${timesName})`;
        }

        return NodeUtils.convertCodeToStructure(
            JavaScriptObfuscator.obfuscate(
                UnicodeArrayRotateFunctionTemplate().formatUnicorn({
                    code,
                    timesName,
                    unicodeArrayName: this.unicodeArrayName,
                    unicodeArrayRotateValue: Utils.decToHex(this.unicodeArrayRotateValue),
                    whileFunctionName
                }),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode()
        );
    }
}
