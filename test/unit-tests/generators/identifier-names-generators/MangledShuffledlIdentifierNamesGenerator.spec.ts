import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IIdentifierNamesGenerator } from '../../../../src/interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

describe('MangledShuffledIdentifierNamesGenerator', () => {
    describe('generateNext', () => {
        let identifierNamesGenerator: IIdentifierNamesGenerator,
            mangledIdentifierName: string;

        beforeEach(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', '', {});
            identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                ServiceIdentifiers.IIdentifierNamesGenerator,
                IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator
            );
        });

        describe('Variant #1: initial mangled name', () => {
            const expectedMangledIdentifierNameRegExp: RegExp = /[a-zA-Z]/;

            beforeEach(() => {
                mangledIdentifierName = identifierNamesGenerator.generateNext();
            });

            it('should return mangled name', () => {
                assert.match(mangledIdentifierName, expectedMangledIdentifierNameRegExp);
            });
        });

        describe('Variant #2: second mangled name', () => {
            const expectedMangledIdentifierNameRegExp: RegExp = /[a-zA-Z]/;
            const expectedMangledIdentifierPosition: number = 1;

            beforeEach(() => {
                for (let i: number = 0; i <= expectedMangledIdentifierPosition; i++) {
                    mangledIdentifierName = identifierNamesGenerator.generateNext();
                }
            });

            it('should return mangled name', () => {
                assert.match(mangledIdentifierName, expectedMangledIdentifierNameRegExp);
            });
        });

        describe('Variant #3: correct increase of mangled name length', () => {
            const expectedMangledIdentifierNameRegExp: RegExp = /[a-zA-Z]0/;
            const expectedMangledIdentifierPosition: number = 52;

            beforeEach(() => {
                for (let i: number = 0; i <= expectedMangledIdentifierPosition; i++) {
                    mangledIdentifierName = identifierNamesGenerator.generateNext();
                }
            });

            it('should return mangled name', () => {
                assert.match(mangledIdentifierName, expectedMangledIdentifierNameRegExp);
            });
        });

        describe('Variant #4: correct increase of mangled name length #2', () => {
            const expectedMangledIdentifierNameRegExp: RegExp = /[a-zA-Z][a-zA-Z]/;
            const expectedMangledIdentifierPosition: number = 62;

            beforeEach(() => {
                for (let i: number = 0; i <= expectedMangledIdentifierPosition; i++) {
                    mangledIdentifierName = identifierNamesGenerator.generateNext();
                }
            });

            it('should return mangled name', () => {
                assert.match(mangledIdentifierName, expectedMangledIdentifierNameRegExp);
            });
        });
    });

    describe('generateForGlobalScope', () => {
        let identifierNamesGenerator: IIdentifierNamesGenerator,
            mangledIdentifierName: string;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', '', {
                identifiersPrefix: 'foo'
            });
            identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                ServiceIdentifiers.IIdentifierNamesGenerator,
                IdentifierNamesGenerator.MangledIdentifierNamesGenerator
            );
        });

        describe('Variant #1: initial mangled name', () => {
            const expectedMangledIdentifierNameRegExp: RegExp = /foo[a-zA-Z]/;

            beforeEach(() => {
                mangledIdentifierName = identifierNamesGenerator.generateForGlobalScope();
            });

            it('should return mangled name with prefix', () => {
                assert.match(mangledIdentifierName, expectedMangledIdentifierNameRegExp);
            });
        });
    });
});
