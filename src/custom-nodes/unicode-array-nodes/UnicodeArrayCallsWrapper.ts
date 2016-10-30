import * as ESTree from 'estree';

import 'format-unicorn';

import { IOptions } from '../../interfaces/IOptions';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { AppendState } from '../../enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { AtobTemplate } from '../../templates/custom-nodes/AtobTemplate';
import { SelfDefendingTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/SelfDefendingTemplate';
import { UnicodeArrayAtobDecodeNodeTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayAtobDecodeNodeTemplate';
import { UnicodeArrayCallsWrapperTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayCallsWrapperTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
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

        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.unicodeArrayCallsWrapperName;
    };

    /**
     * @returns {ESTree.Node}
     */
    public getNode (): ESTree.Node {
        return super.getNode();
    }

    /**
     * @returns {string}
     */
    protected getDecodeUnicodeArrayTemplate (): string {
        let selfDefendingCode: string = '';

        if (this.options.selfDefending) {
            selfDefendingCode = SelfDefendingTemplate().formatUnicorn({
                unicodeArrayCallsWrapperName: this.unicodeArrayCallsWrapperName,
                unicodeArrayName: this.unicodeArrayName
            });
        }

        return UnicodeArrayAtobDecodeNodeTemplate().formatUnicorn({
            atobPolyfill: AtobTemplate(),
            selfDefendingCode,
            unicodeArrayCallsWrapperName: this.unicodeArrayCallsWrapperName
        })
    }

    /**
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
        const decodeNodeTemplate: string = this.options.encodeUnicodeLiterals ?
            this.getDecodeUnicodeArrayTemplate() :
            '';

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
