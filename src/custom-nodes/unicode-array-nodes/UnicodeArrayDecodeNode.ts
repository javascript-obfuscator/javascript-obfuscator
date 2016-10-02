import * as ESTree from 'estree';

import 'format-unicorn';

import { IOptions } from '../../interfaces/IOptions';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { AppendState } from '../../enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { AtobTemplate } from '../../templates/custom-nodes/AtobTemplate';
import { SelfDefendingTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-decode-node/SelfDefendingTemplate';
import { UnicodeArrayDecodeNodeTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-decode-node/UnicodeArrayDecodeNodeTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeUtils } from '../../NodeUtils';
import { UnicodeArray } from '../../UnicodeArray';

export class UnicodeArrayDecodeNode extends AbstractCustomNode {
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
     * @param unicodeArrayName
     * @param unicodeArray
     * @param options
     */
    constructor (
        unicodeArrayName: string,
        unicodeArray: UnicodeArray,
        options: IOptions
    ) {
        super(options);

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
     * @returns {ESTree.Node}
     */
    public getNode (): ESTree.Node {
        return super.getNode();
    }

    /**
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
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

        return NodeUtils.convertCodeToStructure(
            JavaScriptObfuscator.obfuscate(
                UnicodeArrayDecodeNodeTemplate().formatUnicorn({
                    atobPolyfill: AtobTemplate(),
                    code,
                    forLoopFunctionName,
                    unicodeArrayName: this.unicodeArrayName
                }),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode()
        );
    }
}
