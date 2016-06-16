import { NodeType } from "../src/enums/NodeType";

import { NodeUtils } from '../src/NodeUtils';

let assert: any = require('chai').assert;

describe('NodeUtils', () => {
    describe('addXVerbatimPropertyToLiterals (node: INode): void', () => {
        let node: any;

        beforeEach(() => {
            node = {
                type: NodeType.Literal,
                value: 'string',
                raw: `'string'`
            };

            NodeUtils.addXVerbatimPropertyToLiterals(node)
        });

        it('should add `x-verbatim-property` to `Literal` node', () => {
            assert.deepEqual(node, {
                type: NodeType.Literal,
                value: 'string',
                raw: `'string'`,
                'x-verbatim-property': `'string'`
            });
        });
    });
});