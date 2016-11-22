import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { IOptions } from '../../interfaces/IOptions';
import { IStorage } from '../../interfaces/IStorage';

import { AppendState } from '../../enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { SelfDefendingTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate';
import { StringArrayRotateFunctionTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeAppender } from '../../node/NodeAppender';
import { Utils } from '../../Utils';

export class StringArrayRotateFunctionNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {IStorage <string>}
     */
    private stringArray: IStorage <string>;

    /**
     * @type {string}
     */
    private stringArrayName: string;

    /**
     * @param {number}
     */
    private stringArrayRotateValue: number;

    /**
     * @param stringArrayName
     * @param stringArray
     * @param stringArrayRotateValue
     * @param options
     */
    constructor (
        stringArrayName: string,
        stringArray: IStorage <string>,
        stringArrayRotateValue: number,
        options: IOptions
    ) {
        super(options);

        this.stringArrayName = stringArrayName;
        this.stringArray = stringArray;
        this.stringArrayRotateValue = stringArrayRotateValue;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.stringArray.getLength()) {
            return;
        }

        NodeAppender.insertNodeAtIndex(blockScopeNode, this.getNode(), 1);
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        let code: string = '',
            timesName: string = Utils.getRandomVariableName(),
            whileFunctionName: string = Utils.getRandomVariableName();

        if (this.options.selfDefending) {
            code = format(SelfDefendingTemplate(), {
                timesName,
                whileFunctionName
            });
        } else {
            code = `${whileFunctionName}(++${timesName})`;
        }

        return JavaScriptObfuscator.obfuscate(
            format(StringArrayRotateFunctionTemplate(), {
                code,
                timesName,
                stringArrayName: this.stringArrayName,
                stringArrayRotateValue: Utils.decToHex(this.stringArrayRotateValue),
                whileFunctionName
            }),
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                seed: this.options.seed
            })
        ).getObfuscatedCode();
    }
}
