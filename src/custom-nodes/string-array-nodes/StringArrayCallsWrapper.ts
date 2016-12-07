import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { ICustomNodeWithIdentifier } from '../../interfaces/custom-nodes/ICustomNodeWithIdentifier';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

import { initializable } from '../../decorators/Initializable';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { AtobTemplate } from '../../templates/custom-nodes/AtobTemplate';
import { Rc4Template } from '../../templates/custom-nodes/Rc4Template';
import { SelfDefendingTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate';
import { StringArrayBase64DecodeNodeTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate';
import { StringArrayCallsWrapperTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate';
import { StringArrayRc4DecodeNodeTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';

@injectable()
export class StringArrayCallsWrapper extends AbstractCustomNode implements ICustomNodeWithIdentifier {
    /**
     * @type {IStorage <string>}
     */
    @initializable()
    private stringArray: IStorage <string>;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayCallsWrapperName: string;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayName: string;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param stringArray
     * @param stringArrayName
     * @param stringArrayCallsWrapperName
     */
    public initialize (
        stringArray: IStorage <string>,
        stringArrayName: string,
        stringArrayCallsWrapperName: string
    ): void {
        this.stringArray = stringArray;
        this.stringArrayName = stringArrayName;
        this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
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
     * @returns {string}
     */
    private getDecodeStringArrayTemplate (): string {
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
