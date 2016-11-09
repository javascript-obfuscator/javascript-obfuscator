import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';
import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { AtobTemplate } from '../../templates/custom-nodes/AtobTemplate';
import { Rc4Template } from '../../templates/custom-nodes/Rc4Template';
import { SelfDefendingTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate';
import { StringArrayBase64DecodeNodeTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate';
import { StringArrayCallsWrapperTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayRc4DecodeNodeTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeUtils } from '../../node/NodeUtils';
import { StringArray } from '../../StringArray';

export class StringArrayCallsWrapper extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {StringArray}
     */
    private stringArray: StringArray;

    /**
     * @type {string}
     */
    private stringArrayName: string;

    /**
     * @type {string}
     */
    private stringArrayCallsWrapperName: string;

    /**
     * @param stringArrayCallsWrapperName
     * @param stringArrayName
     * @param stringArray
     * @param options
     */
    constructor (
        stringArrayCallsWrapperName: string,
        stringArrayName: string,
        stringArray: StringArray,
        options: IOptions
    ) {
        super(options);

        this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
        this.stringArrayName = stringArrayName;
        this.stringArray = stringArray;
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
    public getNodeIdentifier (): string {
        return this.stringArrayCallsWrapperName;
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
    protected getDecodeStringArrayTemplate (): string {
        let decodeStringArrayTemplate: string = '',
            selfDefendingCode: string = '';

        if (this.options.selfDefending) {
            selfDefendingCode = SelfDefendingTemplate().formatUnicorn({
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                stringArrayName: this.stringArrayName
            });
        }

        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding.base64:
                decodeStringArrayTemplate = StringArrayBase64DecodeNodeTemplate().formatUnicorn({
                    atobPolyfill: AtobTemplate(),
                    selfDefendingCode,
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                });

                break;

            case StringArrayEncoding.rc4:
                decodeStringArrayTemplate = StringArrayRc4DecodeNodeTemplate().formatUnicorn({
                    atobPolyfill: AtobTemplate(),
                    rc4Polyfill: Rc4Template(),
                    selfDefendingCode,
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                });

                break;
        }

        return decodeStringArrayTemplate;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const decodeNodeTemplate: string = this.getDecodeStringArrayTemplate();

        return NodeUtils.convertCodeToStructure(
            JavaScriptObfuscator.obfuscate(
                StringArrayCallsWrapperTemplate().formatUnicorn({
                    decodeNodeTemplate,
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                    stringArrayName: this.stringArrayName
                }),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode()
        );
    }
}
