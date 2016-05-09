import { Node } from './Node';

let estraverse = require('estraverse');

export class UnicodeArrayRotateFunctionCallNode extends Node {
    /**
     * @type any
     */
    private astTree: any;

    /**
     * @type {string}
     */
    private unicodeArrayName: string;

    /**
     * @type {number}
     */
    private unicodeArrayRotateValue: number;

    /**
     * @param {string}
     */
    private unicodeArrayRotateFunctionName: string;

    /**
     * @type any
     */
    protected node: any;

    /**
     * @param astTree
     * @param unicodeArrayRotateFunctionName
     * @param unicodeArrayName
     * @param unicodeArrayRotateValue
     */
    constructor (
        astTree: any,
        unicodeArrayRotateFunctionName: string,
        unicodeArrayName: string,
        unicodeArrayRotateValue: number
    ) {
        super();

        this.astTree = astTree;
        this.unicodeArrayRotateFunctionName = unicodeArrayRotateFunctionName;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        this.node = this.getNodeStructure();
    }

    public appendNode (): void {
        estraverse.replace(this.astTree, {
            leave: (node, parent) => {
                switch (node.type) {
                    case 'Program':
                        node.body.unshift(this.getNode());

                        break;
                }
            }
        });
    }

    /**
     * @returns any
     */
    protected getNodeStructure (): any {
        return {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': this.unicodeArrayRotateFunctionName
                },
                'arguments': [
                    {
                        'type': 'Identifier',
                        'name': this.unicodeArrayName
                    },
                    {
                        'type': 'Literal',
                        'value': this.unicodeArrayRotateValue,
                        'raw': `'${this.unicodeArrayRotateValue}'`
                    },
                    {
                        'type': 'Literal',
                        'value': true,
                        'raw': 'true'
                    }
                ]
            }
        };
    }
}