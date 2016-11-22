import * as format from 'string-template';

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
import { StringArray } from '../../storages/StringArray';

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
    public getCode (): string {
        const decodeNodeTemplate: string = this.getDecodeStringArrayTemplate();

        return JavaScriptObfuscator.obfuscate(
            format(StringArrayCallsWrapperTemplate(), {
                decodeNodeTemplate,
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                stringArrayName: this.stringArrayName
            }),
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                seed: this.options.seed
            })
        ).getObfuscatedCode();
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
            selfDefendingCode = format(SelfDefendingTemplate(), {
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                stringArrayName: this.stringArrayName
            });
        }

        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding.base64:
                decodeStringArrayTemplate = format(StringArrayBase64DecodeNodeTemplate(), {
                    atobPolyfill: AtobTemplate(),
                    selfDefendingCode,
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                });

                break;

            case StringArrayEncoding.rc4:
                decodeStringArrayTemplate = format(StringArrayRc4DecodeNodeTemplate(), {
                    atobPolyfill: AtobTemplate(),
                    rc4Polyfill: Rc4Template(),
                    selfDefendingCode,
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                });

                break;
        }

        return decodeStringArrayTemplate;
    }
}
