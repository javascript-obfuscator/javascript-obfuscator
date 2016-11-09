import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';
import { StringsArrayEncoding } from '../../enums/StringsArrayEncoding';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { AtobTemplate } from '../../templates/custom-nodes/AtobTemplate';
import { Rc4Template } from '../../templates/custom-nodes/Rc4Template';
import { SelfDefendingTemplate } from '../../templates/custom-nodes/strings-array-nodes/strings-array-calls-wrapper/SelfDefendingTemplate';
import { StringsArrayBase64DecodeNodeTemplate } from '../../templates/custom-nodes/strings-array-nodes/strings-array-calls-wrapper/StringsArrayBase64DecodeNodeTemplate';
import { StringsArrayCallsWrapperTemplate } from '../../templates/custom-nodes/strings-array-nodes/strings-array-calls-wrapper/StringsArrayCallsWrapperTemplate';
import { StringsArrayRc4DecodeNodeTemplate } from '../../templates/custom-nodes/strings-array-nodes/strings-array-calls-wrapper/StringsArrayRC4DecodeNodeTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeUtils } from '../../node/NodeUtils';
import { StringsArray } from '../../StringsArray';

export class StringsArrayCallsWrapper extends AbstractCustomNode {
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
     * @type {string}
     */
    private stringsArrayCallsWrapperName: string;

    /**
     * @param stringsArrayCallsWrapperName
     * @param stringsArrayName
     * @param stringsArray
     * @param options
     */
    constructor (
        stringsArrayCallsWrapperName: string,
        stringsArrayName: string,
        stringsArray: StringsArray,
        options: IOptions
    ) {
        super(options);

        this.stringsArrayCallsWrapperName = stringsArrayCallsWrapperName;
        this.stringsArrayName = stringsArrayName;
        this.stringsArray = stringsArray;
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
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.stringsArrayCallsWrapperName;
    };

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        return super.getNode();
    }

    /**
     * @returns {string}
     */
    protected getDecodeStringsArrayTemplate (): string {
        let decodeStringsArrayTemplate: string = '',
            selfDefendingCode: string = '';

        if (this.options.selfDefending) {
            selfDefendingCode = SelfDefendingTemplate().formatUnicorn({
                stringsArrayCallsWrapperName: this.stringsArrayCallsWrapperName,
                stringsArrayName: this.stringsArrayName
            });
        }

        switch (this.options.stringsArrayEncoding) {
            case StringsArrayEncoding.base64:
                decodeStringsArrayTemplate = StringsArrayBase64DecodeNodeTemplate().formatUnicorn({
                    atobPolyfill: AtobTemplate(),
                    selfDefendingCode,
                    stringsArrayCallsWrapperName: this.stringsArrayCallsWrapperName
                });

                break;

            case StringsArrayEncoding.rc4:
                decodeStringsArrayTemplate = StringsArrayRc4DecodeNodeTemplate().formatUnicorn({
                    atobPolyfill: AtobTemplate(),
                    rc4Polyfill: Rc4Template(),
                    selfDefendingCode,
                    stringsArrayCallsWrapperName: this.stringsArrayCallsWrapperName
                });

                break;
        }

        return decodeStringsArrayTemplate;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const decodeNodeTemplate: string = this.getDecodeStringsArrayTemplate();

        return NodeUtils.convertCodeToStructure(
            JavaScriptObfuscator.obfuscate(
                StringsArrayCallsWrapperTemplate().formatUnicorn({
                    decodeNodeTemplate,
                    stringsArrayCallsWrapperName: this.stringsArrayCallsWrapperName,
                    stringsArrayName: this.stringsArrayName
                }),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode()
        );
    }
}
