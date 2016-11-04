import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';
import { UnicodeArrayEncoding } from '../../enums/UnicodeArrayEncoding';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { AtobTemplate } from '../../templates/custom-nodes/AtobTemplate';
import { Rc4Template } from '../../templates/custom-nodes/Rc4Template';
import { SelfDefendingTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/SelfDefendingTemplate';
import { UnicodeArrayBase64DecodeNodeTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayBase64DecodeNodeTemplate';
import { UnicodeArrayCallsWrapperTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayCallsWrapperTemplate';
import { UnicodeArrayRc4DecodeNodeTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayRC4DecodeNodeTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeAppender } from '../../NodeAppender';
import { NodeUtils } from '../../NodeUtils';
import { UnicodeArray } from '../../UnicodeArray';

export class UnicodeArrayCallsWrapper extends AbstractCustomNode {
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
        unicodeArray: UnicodeArray,
        options: IOptions
    ) {
        super(options);

        this.unicodeArrayCallsWrapperName = unicodeArrayCallsWrapperName;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.unicodeArray.getLength()) {
            return;
        }

        NodeAppender.insertNodeAtIndex(blockScopeNode, this.getNode(), 1);
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.unicodeArrayCallsWrapperName;
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
    protected getDecodeUnicodeArrayTemplate (): string {
        let decodeUnicodeArrayTemplate: string = '',
            selfDefendingCode: string = '';

        if (this.options.selfDefending) {
            selfDefendingCode = SelfDefendingTemplate().formatUnicorn({
                unicodeArrayCallsWrapperName: this.unicodeArrayCallsWrapperName,
                unicodeArrayName: this.unicodeArrayName
            });
        }

        switch (this.options.unicodeArrayEncoding) {
            case UnicodeArrayEncoding.base64:
                decodeUnicodeArrayTemplate = UnicodeArrayBase64DecodeNodeTemplate().formatUnicorn({
                    atobPolyfill: AtobTemplate(),
                    selfDefendingCode,
                    unicodeArrayCallsWrapperName: this.unicodeArrayCallsWrapperName
                });

                break;

            case UnicodeArrayEncoding.rc4:
                decodeUnicodeArrayTemplate = UnicodeArrayRc4DecodeNodeTemplate().formatUnicorn({
                    atobPolyfill: AtobTemplate(),
                    rc4Polyfill: Rc4Template(),
                    selfDefendingCode,
                    unicodeArrayCallsWrapperName: this.unicodeArrayCallsWrapperName
                });

                break;
        }

        return decodeUnicodeArrayTemplate;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const decodeNodeTemplate: string = this.getDecodeUnicodeArrayTemplate();

        return NodeUtils.convertCodeToStructure(
            JavaScriptObfuscator.obfuscate(
                UnicodeArrayCallsWrapperTemplate().formatUnicorn({
                    decodeNodeTemplate,
                    unicodeArrayCallsWrapperName: this.unicodeArrayCallsWrapperName,
                    unicodeArrayName: this.unicodeArrayName
                }),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode()
        );
    }
}
