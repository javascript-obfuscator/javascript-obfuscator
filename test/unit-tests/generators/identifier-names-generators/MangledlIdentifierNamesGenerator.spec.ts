import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IIdentifierNamesGenerator } from '../../../../src/interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

describe('MangledIdentifierNamesGenerator', () => {
    describe('generate (length: number): string', () => {
        let identifierNamesGenerator: IIdentifierNamesGenerator,
            mangledIdentifierName: string;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', {});
            identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                ServiceIdentifiers.IIdentifierNamesGenerator,
                IdentifierNamesGenerator.MangledIdentifierNamesGenerator
            )
        });

        describe('variant #1: initial mangled name', () => {
            const expectedMangledIdentifierName: string = 'a';

            before(() => {
                mangledIdentifierName = identifierNamesGenerator.generate(4);
            });

            it('should return hexadecimal name', () => {
                assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
            })
        });

        describe('variant #2: second mangled name', () => {
            const expectedMangledIdentifierName: string = 'b';

            before(() => {
                mangledIdentifierName = identifierNamesGenerator.generate(6);
            });

            it('should return hexadecimal name', () => {
                assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
            })
        });

        describe('variant #3: last mangled name with single character', () => {
            const expectedMangledIdentifierName: string = 'Z';

            before(() => {
                for (let i: number = 0; i <= 49; i++) {
                    mangledIdentifierName = identifierNamesGenerator.generate(6);
                }
            });

            it('should return hexadecimal name', () => {
                assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
            })
        });

        describe('variant #4: correct increase of mangled name length', () => {
            const expectedMangledIdentifierName: string = 'a0';

            before(() => {
                for (let i: number = 0; i < 1; i++) {
                    mangledIdentifierName = identifierNamesGenerator.generate(6);
                }
            });

            it('should return hexadecimal name', () => {
                assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
            })
        });

        describe('variant #4: correct increase of mangled name length #2', () => {
            const expectedMangledIdentifierName: string = 'aa';

            before(() => {
                for (let i: number = 0; i < 10; i++) {
                    mangledIdentifierName = identifierNamesGenerator.generate(6);
                }
            });

            it('should return hexadecimal name', () => {
                assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
            })
        });
    });
});
