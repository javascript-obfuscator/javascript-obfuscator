import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';

import { IProgramNode } from '../interfaces/nodes/IProgramNode';
import { ITreeNode } from '../interfaces/nodes/ITreeNode';

import { Node } from './Node';
import { Utils } from '../Utils';

import { AppendState } from '../enums/AppendState';

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
     * @type {ITreeNode}
     */
    private astTree: ITreeNode;

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
     * @type {ITreeNode}
     */
    protected node: ITreeNode;

    /**
     * @param astTree
     * @param unicodeArrayName
     * @param unicodeArrayRotateValue
     */
    constructor (astTree: ITreeNode, unicodeArrayName: string, unicodeArrayRotateValue: number = 0) {
        super();

        this.astTree = astTree;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        this.node = this.getNodeStructure();
    }

    public appendNode (): void {
        estraverse.replace(this.astTree, {
            leave: (node: ITreeNode, parent: ITreeNode) => {
                switch (node.type) {
                    case 'Program':
                        (<IProgramNode>node).body.unshift(this.getNode());

                        break;
                }
            }
        });
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
     * @returns {ITreeNode}
     */
    public getNode (): ITreeNode {
        Utils.arrayRotate(this.unicodeArray, this.unicodeArrayRotateValue);

        this.updateNode();

        return this.node;
    }

    /**
     * @returns any
     */
    protected getNodeStructure (): any {
        return {
            'type': 'VariableDeclaration',
            'declarations': [
                {
                    'type': 'VariableDeclarator',
                    'id': {
                        'type': 'Identifier',
                        'name': this.unicodeArrayName
                    },
                    'init': {
                        'type': 'ArrayExpression',
                        'elements': this.unicodeArray.map((value) => {
                            return {
                                'type': 'Literal',
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