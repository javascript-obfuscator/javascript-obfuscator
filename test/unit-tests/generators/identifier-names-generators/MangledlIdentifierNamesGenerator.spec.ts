import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IIdentifierNamesGenerator } from '../../../../src/interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

describe('MangledIdentifierNamesGenerator', () => {
    describe('generate (length: number): string', () => {
        describe('Mangled name without prefix', () => {
            let identifierNamesGenerator: IIdentifierNamesGenerator,
                mangledIdentifierName: string;

            beforeEach(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', {});
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                );
            });

            describe('variant #1: initial mangled name', () => {
                const expectedMangledIdentifierName: string = 'a';

                beforeEach(() => {
                    mangledIdentifierName = identifierNamesGenerator.generate(4);
                });

                it('should return mangled name', () => {
                    assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
                });
            });

            describe('variant #2: second mangled name', () => {
                const expectedMangledIdentifierName: string = 'b';
                const expectedMangledIdentifierPosition: number = 1;

                beforeEach(() => {
                    for (let i: number = 0; i <= expectedMangledIdentifierPosition; i++) {
                        mangledIdentifierName = identifierNamesGenerator.generate(6);
                    }
                });

                it('should return mangled name', () => {
                    assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
                });
            });

            describe('variant #3: last mangled name with single character', () => {
                const expectedMangledIdentifierName: string = 'Z';
                const expectedMangledIdentifierPosition: number = 51;

                beforeEach(() => {
                    for (let i: number = 0; i <= expectedMangledIdentifierPosition; i++) {
                        mangledIdentifierName = identifierNamesGenerator.generate(6);
                    }
                });

                it('should return mangled name', () => {
                    assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
                });
            });

            describe('variant #4: correct increase of mangled name length', () => {
                const expectedMangledIdentifierName: string = 'a0';
                const expectedMangledIdentifierPosition: number = 52;

                beforeEach(() => {
                    for (let i: number = 0; i <= expectedMangledIdentifierPosition; i++) {
                        mangledIdentifierName = identifierNamesGenerator.generate(6);
                    }
                });

                it('should return mangled name', () => {
                    assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
                });
            });

            describe('variant #5: correct increase of mangled name length #2', () => {
                const expectedMangledIdentifierName: string = 'aa';
                const expectedMangledIdentifierPosition: number = 62;

                beforeEach(() => {
                    for (let i: number = 0; i <= expectedMangledIdentifierPosition; i++) {
                        mangledIdentifierName = identifierNamesGenerator.generate(6);
                    }
                });

                it('should return mangled name', () => {
                    assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
                });
            });

            describe('variant #6: reserved names', () => {
                const expectedMangledIdentifierName1: string = 'dn';
                const expectedMangledIdentifierName2: string = 'dp';
                const expectedMangledIdentifierPosition1: number = 261;
                const expectedMangledIdentifierPosition2: number = 262;

                let mangledIdentifierName1: string,
                    mangledIdentifierName2: string;

                beforeEach(() => {
                    for (let i: number = 0; i <= expectedMangledIdentifierPosition2; i++) {
                        mangledIdentifierName = identifierNamesGenerator.generate(6);

                        if (i === expectedMangledIdentifierPosition1) {
                            mangledIdentifierName1 = mangledIdentifierName;
                        } else if (i === expectedMangledIdentifierPosition2) {
                            mangledIdentifierName2 = mangledIdentifierName;
                        }
                    }
                });

                it('should return mangled name', () => {
                    assert.equal(mangledIdentifierName1, expectedMangledIdentifierName1);
                });

                it('shouldn\'t return reserved mangled name', () => {
                    assert.equal(mangledIdentifierName2, expectedMangledIdentifierName2);
                });
            });
        });

        describe('Mangled name with prefix', () => {
            let identifierNamesGenerator: IIdentifierNamesGenerator,
                mangledIdentifierName: string;

            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', {
                    identifiersPrefix: 'foo'
                });
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                );
            });

            describe('variant #1: initial mangled name', () => {
                const expectedMangledIdentifierName: string = 'foo_a';

                beforeEach(() => {
                    mangledIdentifierName = identifierNamesGenerator.generate(4);
                });

                it('should return mangled name with prefix', () => {
                    assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
                });
            });

            describe('variant #2: second mangled name', () => {
                const expectedMangledIdentifierName: string = 'foo_b';

                beforeEach(() => {
                    mangledIdentifierName = identifierNamesGenerator.generate(4);
                });

                it('should return mangled name with prefix', () => {
                    assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
                });
            });
        });

        describe('Mangled name with random prefix', () => {
            let identifierNamesGenerator: IIdentifierNamesGenerator,
                mangledIdentifierName: string;

            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', {
                    identifiersPrefix: true
                });
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                );
            });

            describe('variant #1: initial mangled name', () => {
                const expectedMangledIdentifierNameRegExp: RegExp = /(\w){6}_a/;

                beforeEach(() => {
                    mangledIdentifierName = identifierNamesGenerator.generate(4);
                });

                it('should return mangled name with prefix', () => {
                    assert.match(mangledIdentifierName, expectedMangledIdentifierNameRegExp);
                });
            });

            describe('variant #2: second mangled name', () => {
                const expectedMangledIdentifierNameRegExp: RegExp = /(\w){6}_b/;

                beforeEach(() => {
                    mangledIdentifierName = identifierNamesGenerator.generate(4);
                });

                it('should return mangled name with prefix', () => {
                    assert.match(mangledIdentifierName, expectedMangledIdentifierNameRegExp);
                });
            });
        });
    });
});
