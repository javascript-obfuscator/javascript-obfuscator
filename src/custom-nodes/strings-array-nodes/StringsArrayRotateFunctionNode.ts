import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { SelfDefendingTemplate } from '../../templates/custom-nodes/strings-array-nodes/strings-array-rotate-function-node/SelfDefendingTemplate';
import { StringsArrayRotateFunctionTemplate } from '../../templates/custom-nodes/strings-array-nodes/strings-array-rotate-function-node/StringsArrayRotateFunctionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeUtils } from '../../node/NodeUtils';
import { StringsArray } from '../../StringsArray';
import { Utils } from '../../Utils';

export class StringsArrayRotateFunctionNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {StringsArray}
     */
    private stringsArray: StringsArray;

    /**
     * @type {string}
     */
    private stringsArrayName: string;

    /**
     * @param {number}
     */
    private stringsArrayRotateValue: number;

    /**
     * @param stringsArrayName
     * @param stringsArray
     * @param stringsArrayRotateValue
     * @param options
     */
    constructor (
        stringsArrayName: string,
        stringsArray: StringsArray,
        stringsArrayRotateValue: number,
        options: IOptions
    ) {
        super(options);

        this.stringsArrayName = stringsArrayName;
        this.stringsArray = stringsArray;
        this.stringsArrayRotateValue = stringsArrayRotateValue;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.stringsArray.getLength()) {
            return;
        }

        NodeAppender.insertNodeAtIndex(blockScopeNode, this.getNode(), 1);
    }

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        return super.getNode();
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
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
                StringsArrayRotateFunctionTemplate().formatUnicorn({
                    code,
                    timesName,
                    stringsArrayName: this.stringsArrayName,
                    stringsArrayRotateValue: Utils.decToHex(this.stringsArrayRotateValue),
                    whileFunctionName
                }),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode()
        );
    }
}
