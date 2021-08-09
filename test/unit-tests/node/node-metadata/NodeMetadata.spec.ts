import 'reflect-metadata';

import * as ESTree from 'estree';

import { assert } from 'chai';

import { NodeMetadata } from '../../../../src/node/NodeMetadata';
import { NodeFactory } from '../../../../src/node/NodeFactory';

describe('NodeMetadata', () => {
    describe('set', () => {
        const expectedMetadata: ESTree.LiteralNodeMetadata = {
            ignoredNode: true,
            stringArrayCallLiteralNode: true
        };

        let node: ESTree.Literal;

        before(() => {
            node = NodeFactory.literalNode('foo');
            NodeMetadata.set(node, {
                ignoredNode: true,
                stringArrayCallLiteralNode: true
            })
        });

        it('should set metadata to the node', () => {
            assert.deepPropertyVal(node, 'metadata', expectedMetadata);
        });
    });

    describe('get', () => {
        const expectedValue: boolean = true;

        let node: ESTree.Literal,
            value: boolean | undefined;

        before(() => {
            node = NodeFactory.literalNode('foo');
            node.metadata = {};
            node.metadata.stringArrayCallLiteralNode = true;
            value = NodeMetadata.get<
                ESTree.LiteralNodeMetadata,
                'stringArrayCallLiteralNode'
            >(node, 'stringArrayCallLiteralNode');
        });

        it('should get metadata value of the node', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('isForceTransformNode', () => {
        const expectedValue: boolean = true;

        let node: ESTree.Identifier,
            value: boolean | undefined;

        before(() => {
            node = NodeFactory.identifierNode('foo');
            node.metadata = {};
            node.metadata.forceTransformNode = true;
            value = NodeMetadata.isForceTransformNode(node);
        });

        it('should return metadata value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('isIgnoredNode', () => {
        const expectedValue: boolean = true;

        let node: ESTree.Identifier,
            value: boolean | undefined;

        before(() => {
            node = NodeFactory.identifierNode('foo');
            node.metadata = {};
            node.metadata.ignoredNode = true;
            value = NodeMetadata.isIgnoredNode(node);
        });

        it('should return metadata value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('isStringArrayCallLiteralNode', () => {
        const expectedValue: boolean = true;

        let node: ESTree.Literal,
            value: boolean | undefined;

        before(() => {
            node = NodeFactory.literalNode('foo');
            node.metadata = {};
            node.metadata.stringArrayCallLiteralNode = true;
            value = NodeMetadata.isStringArrayCallLiteralNode(node);
        });

        it('should return metadata value', () => {
            assert.equal(value, expectedValue);
        });
    });
});
