import 'reflect-metadata';

import { assert } from 'chai';

import * as ESTree from 'estree';

import { ServiceIdentifiers } from '../../../../../../src/container/ServiceIdentifiers';
import { InversifyContainerFacade } from '../../../../../../src/container/InversifyContainerFacade';

import { IInversifyContainerFacade } from '../../../../../../src/interfaces/container/IInversifyContainerFacade';
import { IObfuscatingReplacer } from '../../../../../../src/interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IObfuscatingReplacer';

import { LiteralObfuscatingReplacer } from '../../../../../../src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer';

import { NodeFactory } from '../../../../../../src/node/NodeFactory';

describe('BooleanLiteralObfuscatingReplacer', () => {
    describe('replace', () => {
        let inversifyContainerFacade: IInversifyContainerFacade,
            booleanLiteralObfuscatingReplacer: IObfuscatingReplacer;

        before(() => {
            inversifyContainerFacade = new InversifyContainerFacade();
            inversifyContainerFacade.load('', {});

            booleanLiteralObfuscatingReplacer = inversifyContainerFacade.getNamed(
                ServiceIdentifiers.IObfuscatingReplacer,
                LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer
            );
        });

        describe('Variant #1: correct `LiteralNode`', () => {
            describe('Variant #1: `LiteralNode` with boolean value', () => {
                let testFunc: () => void;

                before(() => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode(true);

                    testFunc = () => booleanLiteralObfuscatingReplacer.replace(literalNode);
                });

                it('Shouldn\'t throw an error when wrong `LiteralNode` will passed to the replacer', () => {
                    assert.doesNotThrow(testFunc, Error);
                });
            });
        });

        describe('Variant #2: wrong `LiteralNode`', () => {
            describe('Variant #1: `LiteralNode` with number value', () => {
                let testFunc: () => void;

                before(() => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode(1);

                    testFunc = () => booleanLiteralObfuscatingReplacer.replace(literalNode);
                });

                it('Should throw an error when wrong `LiteralNode` will passed to the replacer', () => {
                    assert.throws(testFunc, Error);
                });
            });

            describe('Variant #2: `LiteralNode` with string value', () => {
                let testFunc: () => void;

                before(() => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode('foo');

                    testFunc = () => booleanLiteralObfuscatingReplacer.replace(literalNode);
                });

                it('Should throw an error when wrong `LiteralNode` will passed to the replacer', () => {
                    assert.throws(testFunc, Error);
                });
            });
        });
    });
});
