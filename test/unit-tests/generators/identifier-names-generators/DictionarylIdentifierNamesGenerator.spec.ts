import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IIdentifierNamesGenerator } from '../../../../src/interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

describe('DictionaryIdentifierNamesGenerator', () => {
    let identifierNamesGenerator: IIdentifierNamesGenerator,
        dictionaryIdentifierName: string;

    describe('generateNext', () => {
        describe('Base behaviour', () => {
            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', '', {
                    identifiersDictionary: ['a', 'b']
                });
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator
                );
            });

            describe('Variant #1: first dictionary iteration', () => {
                const expectedDictionaryIdentifierNameRegExp: RegExp = /[a|b]/;

                beforeEach(() => {
                    dictionaryIdentifierName = identifierNamesGenerator.generateNext();
                });

                it('Match #1: should return first identifier name', () => {
                    assert.match(dictionaryIdentifierName, expectedDictionaryIdentifierNameRegExp);
                });

                it('Match #2: should return second identifier name', () => {
                    assert.match(dictionaryIdentifierName, expectedDictionaryIdentifierNameRegExp);
                });
            });

            describe('Variant #2: second dictionary iteration', () => {
                const expectedDictionaryIdentifierNameRegExp: RegExp = /[A|B]/;

                beforeEach(() => {
                    dictionaryIdentifierName = identifierNamesGenerator.generateNext();
                });

                it('Match #1: should return third identifier name', () => {
                    assert.match(dictionaryIdentifierName, expectedDictionaryIdentifierNameRegExp);
                });

                it('Match #2: should return fourth identifier name', () => {
                    assert.match(dictionaryIdentifierName, expectedDictionaryIdentifierNameRegExp);
                });
            });
        });

        describe('Empty string as dictionary value', () => {
            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', '', {
                    identifiersDictionary: ['', 'a']
                });
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator
                );
            });

            describe('Variant #1: Should ignore empty strings from dictionary', () => {
                const expectedDictionaryIdentifierNameRegExp: RegExp = /[a|A]/;

                beforeEach(() => {
                    dictionaryIdentifierName = identifierNamesGenerator.generateNext();
                });

                it('Match #1: should return first identifier name', () => {
                    assert.match(dictionaryIdentifierName, expectedDictionaryIdentifierNameRegExp);
                });

                it('Match #2: should return second identifier name', () => {
                    assert.match(dictionaryIdentifierName, expectedDictionaryIdentifierNameRegExp);
                });
            });
        });

        describe('Multi-character string as dictionary value', () => {
            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', '', {
                    identifiersDictionary: ['aa']
                });
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator
                );
            });

            describe('Variant #1: Should generate identifier names based on all variants of word from dictionary', () => {
                const expectedFirstIterationIdentifierName: string = 'aa';
                const expectedSecondIterationIdentifierName: string = 'Aa';
                const expectedThirdIterationIdentifierName: string = 'aA';
                const expectedFourthIterationIdentifierName: string = 'AA';

                beforeEach(() => {
                    dictionaryIdentifierName = identifierNamesGenerator.generateNext();
                });

                it('Match #1: should return first identifier name', () => {
                    assert.equal(dictionaryIdentifierName, expectedFirstIterationIdentifierName);
                });

                it('Match #2: should return second identifier name', () => {
                    assert.equal(dictionaryIdentifierName, expectedSecondIterationIdentifierName);
                });

                it('Match #3: should return third identifier name', () => {
                    assert.equal(dictionaryIdentifierName, expectedThirdIterationIdentifierName);
                });

                it('Match #4: should return fourth identifier name', () => {
                    assert.equal(dictionaryIdentifierName, expectedFourthIterationIdentifierName);
                });
            });
        });

        describe('Errors', () => {
            let inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            beforeEach(() => {
                inversifyContainerFacade = new InversifyContainerFacade();
            });

            describe('Variant #1: No more identifier variants for generation', () => {
                const expectedDictionaryIdentifierNameRegExp: RegExp = /[a|A]/;

                let testFunc: () => string;

                before(() => {
                    inversifyContainerFacade.load('', '', {
                        identifiersDictionary: ['a']
                    });
                    identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                        ServiceIdentifiers.IIdentifierNamesGenerator,
                        IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator
                    );

                    testFunc = () => identifierNamesGenerator.generateNext();
                });

                it('Match #1: should return first identifier name', () => {
                    dictionaryIdentifierName = testFunc();
                    assert.match(dictionaryIdentifierName, expectedDictionaryIdentifierNameRegExp);
                });

                it('Match #2: should return second identifier name', () => {
                    dictionaryIdentifierName = testFunc();
                    assert.match(dictionaryIdentifierName, expectedDictionaryIdentifierNameRegExp);
                });

                it('Should throw an error when all identifier variants are used', () => {
                    assert.throws(testFunc, Error);
                });
            });

            describe('Variant #2: Empty identifiers dictionary', () => {
                let testFunc: () => string;

                before(() => {
                    inversifyContainerFacade.load('', '', {
                        identifiersDictionary: []
                    });
                    identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                        ServiceIdentifiers.IIdentifierNamesGenerator,
                        IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator
                    );

                    testFunc = () => identifierNamesGenerator.generateNext();
                });

                it('Should throw an error when identifiers dictionary is empty', () => {
                    assert.throws(testFunc, Error);
                });
            });
        });
    });

    describe('generateForGlobalScope', () => {
        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', '', {
                identifiersDictionary: ['a'],
                identifiersPrefix: 'foo'
            });
            identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                ServiceIdentifiers.IIdentifierNamesGenerator,
                IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator
            );
        });

        describe('Variant #1: Should generate identifier names with prefix', () => {
            const expectedDictionaryIdentifierNameRegExp: RegExp = /foo[a|A]/;

            beforeEach(() => {
                dictionaryIdentifierName = identifierNamesGenerator.generateForGlobalScope();
            });

            it('Match #1: should return first identifier name', () => {
                assert.match(dictionaryIdentifierName, expectedDictionaryIdentifierNameRegExp);
            });

            it('Match #2: should return second identifier name', () => {
                assert.match(dictionaryIdentifierName, expectedDictionaryIdentifierNameRegExp);
            });
        });
    });
});
