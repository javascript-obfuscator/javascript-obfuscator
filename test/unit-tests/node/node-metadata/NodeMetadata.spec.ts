import 'reflect-metadata';

import * as ESTree from 'estree';

import { assert } from 'chai';

import { NodeMetadata } from '../../../../src/node/NodeMetadata';
import { NodeFactory } from '../../../../src/node/NodeFactory';

describe('NodeMetadata', () => {
    describe('set', () => {
        const expectedMetadata: ESTree.IdentifierNodeMetadata = {
            ignoredNode: true,
            renamedIdentifier: true
        };

        let node: ESTree.Identifier;

        before(() => {
            node = NodeFactory.identifierNode('foo');
            NodeMetadata.set(node, {
                ignoredNode: true,
                renamedIdentifier: true
            })
        });

        it('should set metadata to the node', () => {
            assert.deepPropertyVal(node, 'metadata', expectedMetadata);
        });
    });

    describe('get', () => {
        const expectedValue: boolean = true;

        let node: ESTree.Identifier,
            value: boolean | undefined;

        before(() => {
            node = NodeFactory.identifierNode('foo');
            node.metadata = {};
            node.metadata.renamedIdentifier = true;
            value = NodeMetadata.get<ESTree.IdentifierNodeMetadata>(node, 'renamedIdentifier');
        });

        it('should get metadata value of the node', () => {
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

    describe('isRenamedIdentifier', () => {
        const expectedValue: boolean = true;

        let node: ESTree.Identifier,
            value: boolean | undefined;

        before(() => {
            node = NodeFactory.identifierNode('foo');
            node.metadata = {};
            node.metadata.renamedIdentifier = true;
            value = NodeMetadata.isRenamedIdentifier(node);
        });

        it('should return metadata value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('isReplacedLiteral', () => {
        const expectedValue: boolean = true;

        let node: ESTree.Literal,
            value: boolean | undefined;

        before(() => {
            node = NodeFactory.literalNode('foo');
            node.metadata = {};
            node.metadata.replacedLiteral = true;
            value = NodeMetadata.isReplacedLiteral(node);
        });

        it('should return metadata value', () => {
            assert.equal(value, expectedValue);
        });
    });
});
