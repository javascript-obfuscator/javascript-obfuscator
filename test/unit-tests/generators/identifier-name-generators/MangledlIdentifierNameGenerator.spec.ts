import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IIdentifierNameGenerator } from '../../../../src/interfaces/generators/identifier-name-generators/IIdentifierNameGenerator';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { IdentifierNameGenerator } from '../../../../src/enums/generators/identifier-name-generators/IdentifierNameGenerator';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

describe('MangledIdentifierNameGenerator', () => {
    describe('generate (length: number): string', () => {
        let identifierNameGenerator: IIdentifierNameGenerator,
            mangledIdentifierName: string;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', {});
            identifierNameGenerator = inversifyContainerFacade.getNamed<IIdentifierNameGenerator>(
                ServiceIdentifiers.IIdentifierNameGenerator,
                IdentifierNameGenerator.MangledIdentifierNameGenerator
            )
        });

        describe('variant #1: initial mangled name', () => {
            const expectedMangledIdentifierName: string = 'a';

            before(() => {
                mangledIdentifierName = identifierNameGenerator.generate(4);
            });

            it('should return hexadecimal name', () => {
                assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
            })
        });

        describe('variant #2: second mangled name', () => {
            const expectedMangledIdentifierName: string = 'b';

            before(() => {
                mangledIdentifierName = identifierNameGenerator.generate(6);
            });

            it('should return hexadecimal name', () => {
                assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
            })
        });

        describe('variant #3: special character as mangled name', () => {
            const expectedMangledIdentifierName: string = '_';

            before(() => {
                for (let i: number = 0; i <= 50; i++) {
                    mangledIdentifierName = identifierNameGenerator.generate(6);
                }
            });

            it('should return hexadecimal name', () => {
                assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
            })
        });

        describe('variant #4: correct increase of mangled name length', () => {
            const expectedMangledIdentifierName: string = 'a0';

            before(() => {
                for (let i: number = 0; i < 2; i++) {
                    mangledIdentifierName = identifierNameGenerator.generate(6);
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
                    mangledIdentifierName = identifierNameGenerator.generate(6);
                }
            });

            it('should return hexadecimal name', () => {
                assert.equal(mangledIdentifierName, expectedMangledIdentifierName);
            })
        });
    });
});
