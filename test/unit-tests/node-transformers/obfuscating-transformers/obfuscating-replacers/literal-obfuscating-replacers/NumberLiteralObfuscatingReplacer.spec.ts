import 'reflect-metadata';

import { assert } from 'chai';
import * as ESTree from 'estree';

import { IInversifyContainerFacade } from '../../../../../../src/interfaces/container/IInversifyContainerFacade';
import { IObfuscatingReplacer } from '../../../../../../src/interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IObfuscatingReplacer';

import { LiteralObfuscatingReplacer } from '../../../../../../src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer';
import { ServiceIdentifiers } from '../../../../../../src/container/ServiceIdentifiers';

import { InversifyContainerFacade } from '../../../../../../src/container/InversifyContainerFacade';
import { NodeFactory } from '../../../../../../src/node/NodeFactory';

describe('NumberLiteralObfuscatingReplacer', () => {
    describe('replace', () => {
        let inversifyContainerFacade: IInversifyContainerFacade,
            obfuscatingReplacer: IObfuscatingReplacer;

        before(() => {
            inversifyContainerFacade = new InversifyContainerFacade();
            inversifyContainerFacade.load('', '', {});

            obfuscatingReplacer = inversifyContainerFacade
                .getNamed(ServiceIdentifiers.IObfuscatingReplacer, LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer);
        });

        describe('Variant #1: literal value type check', () => {
            describe('Variant #1: literal values is a `number` value', () => {
                let testFunc: () => void;

                before(() => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode(1);

                    testFunc = () => <ESTree.Identifier>obfuscatingReplacer.replace(literalNode);
                });

                it('should not throw an error if literal values is a `number` value', () => {
                    assert.doesNotThrow(testFunc,);
                });
            });

            describe('Variant #2: literal values is not a `number` value', () => {
                const expectedError: ErrorConstructor = Error;

                let testFunc: () => void;

                before(() => {
                    const literalNode: ESTree.Literal = NodeFactory.literalNode('foo');

                    testFunc = () => <ESTree.Identifier>obfuscatingReplacer.replace(literalNode);
                });

                it('should throw an error if literal values is not a `number` value', () => {
                    assert.throws(testFunc, expectedError);
                });
            });
        });
    });
});
