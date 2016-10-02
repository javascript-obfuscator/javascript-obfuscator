import * as ESTree from 'estree';

import 'format-unicorn';

import { IOptions } from 'app/interfaces/IOptions';

import { TNodeWithBlockStatement } from 'app/types/TNodeWithBlockStatement';

import { AppendState } from 'app/enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from 'app/preset-options/NoCustomNodesPreset';

import { AtobTemplate } from 'app/templates/custom-nodes/AtobTemplate';
import { SelfDefendingTemplate } from 'app/templates/custom-nodes/unicode-array-nodes/unicode-array-decode-node/SelfDefendingTemplate';
import { UnicodeArrayDecodeNodeTemplate } from 'app/templates/custom-nodes/unicode-array-nodes/unicode-array-decode-node/UnicodeArrayDecodeNodeTemplate';

import { AbstractCustomNode } from 'app/custom-nodes/AbstractCustomNode';
import { JavaScriptObfuscator } from 'app/JavaScriptObfuscator';
import { NodeUtils } from 'app/NodeUtils';
import { UnicodeArray } from 'app/UnicodeArray';

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
