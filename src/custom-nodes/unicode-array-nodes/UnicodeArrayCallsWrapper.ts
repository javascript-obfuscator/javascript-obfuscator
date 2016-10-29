import * as ESTree from 'estree';

import 'format-unicorn';

import { IOptions } from '../../interfaces/IOptions';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { AppendState } from '../../enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { AtobTemplate } from '../../templates/custom-nodes/AtobTemplate';
import { SelfDefendingTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/SelfDefendingTemplate';
import { UnicodeArrayCallsWrapperTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayCallsWrapperTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeUtils } from '../../NodeUtils';
import { UnicodeArray } from '../../UnicodeArray';
import { UnicodeArrayAtobDecodeNodeTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayAtobDecodeNodeTemplate';

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
     * @returns {any}
     */
    protected getDecodeUnicodeArrayTemplate (): string {
        const forLoopFunctionName: string = 'forLoopFunc';

        let code: string;

        if (this.options.selfDefending) {
            code = SelfDefendingTemplate().formatUnicorn({
                forLoopFunctionName,
                unicodeArrayName: this.unicodeArrayName
            });
        } else {
            code = `${forLoopFunctionName}();`;
        }

        return UnicodeArrayAtobDecodeNodeTemplate().formatUnicorn({
            atobPolyfill: AtobTemplate(),
            code,
            forLoopFunctionName,
            unicodeArrayName: this.unicodeArrayName
        })
    }

    /**
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
        let decodeNodeTemplate: string = this.options.encodeUnicodeLiterals ? this.getDecodeUnicodeArrayTemplate() : '';

        return NodeUtils.convertCodeToStructure(
            JavaScriptObfuscator.obfuscate(
                UnicodeArrayCallsWrapperTemplate().formatUnicorn({
                    decodeNodeTemplate: decodeNodeTemplate,
                    unicodeArrayCallsWrapperName: this.unicodeArrayCallsWrapperName,
                    unicodeArrayName: this.unicodeArrayName
                }),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode()
        );
    }
}
