import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';

import { ITreeNode } from '../../interfaces/nodes/ITreeNode';

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
            leave: (node: ITreeNode, parent: ITreeNode): any => {
                if (NodeUtils.isProgramNode(node)) {
                    NodeUtils.prependNode(node.body, this.getNode());

                    return estraverse.VisitorOption.Break;
                }

                return estraverse.VisitorOption.Skip;
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

        return super.getNode();
    }

    /**
     * @returns any
     */
    protected getNodeStructure (): any {
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
