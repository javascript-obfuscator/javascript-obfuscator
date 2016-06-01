import * as escodegen from 'escodegen';

import { INode } from '../../interfaces/nodes/INode';
import { IVariableDeclarationNode } from "../../interfaces/nodes/IVariableDeclarationNode";

import { TBlockScopeNode } from "../../types/TBlockScopeNode";

import { AppendState } from '../../enums/AppendState';
import { NodeType } from "../../enums/NodeType";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from '../../Utils';

export class UnicodeArrayNode extends Node {
    /**
     * @type {number}
     */
    public static UNICODE_ARRAY_RANDOM_LENGTH: number = 4;

    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string[]}
     */
    private unicodeArray: string[] = [];

    /**
     * @type {string}
     */
    private unicodeArrayName: string;

    /**
     * @type {number}
     */
    private unicodeArrayRotateValue: number;

    /**
     * @param unicodeArrayName
     * @param unicodeArrayRotateValue
     */
    constructor (unicodeArrayName: string, unicodeArrayRotateValue: number = 0) {
        super();

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;

        this.node = this.getNodeStructure();
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TBlockScopeNode): void {
        NodeUtils.prependNode(blockScopeNode.body, this.getNode());
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.unicodeArrayName;
    }

    /**
     * @returns {string[]}
     */
    public getNodeData (): string[] {
        return this.unicodeArray;
    }

    /**
     * @returns {INode}
     */
    public getNode (): INode {
        if (!this.unicodeArray.length) {
            return;
        }

        Utils.arrayRotate <string> (this.unicodeArray, this.unicodeArrayRotateValue);

        this.updateNode();

        return super.getNode();
    }

    /**
     * @returns {INode}
     */
    protected getNodeStructure (): IVariableDeclarationNode {
        return {
            'type': NodeType.VariableDeclaration,
            'declarations': [
                {
                    'type': NodeType.VariableDeclarator,
                    'id': {
                        'type': NodeType.Identifier,
                        'name': this.unicodeArrayName
                    },
                    'init': {
                        'type': NodeType.ArrayExpression,
                        'elements': this.unicodeArray.map((value: string) => {
                            return {
                                'type': NodeType.Literal,
                                'value': value,
                                'raw': `'${value}'`,
                                'x-verbatim-property': {
                                    'content' : value,
                                    precedence: escodegen.Precedence.Primary
                                }
                            };
                        })
                    }
                }
            ],
            'kind': 'var'
        };
    }
}
