import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IIdentifierNamesGenerator } from '../../../../src/interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

describe('HexadecimalIdentifierNamesGenerator', () => {
    describe('generate (length: number): string', () => {
        describe('Hexadecimal name without prefix', () => {
            let identifierNamesGenerator: IIdentifierNamesGenerator,
                hexadecimalIdentifierName: string,
                regExp: RegExp;

            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', {});
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                )
            });

            describe('variant #1: hexadecimal name with length `4`', () => {
                before(() => {
                    hexadecimalIdentifierName = identifierNamesGenerator.generate(4);
                    regExp = /^_0x(\w){4}$/;
                });

                it('should return hexadecimal name', () => {
                    assert.match(hexadecimalIdentifierName, regExp);
                })
            });

            describe('variant #2: hexadecimal name with length `6`', () => {
                before(() => {
                    hexadecimalIdentifierName = identifierNamesGenerator.generate(6);
                    regExp = /^_0x(\w){4,6}$/;
                });

                it('should return hexadecimal name', () => {
                    assert.match(hexadecimalIdentifierName, regExp);
                })
            });
        });

        describe('Hexadecimal name with prefix', () => {
            let identifierNamesGenerator: IIdentifierNamesGenerator,
                hexadecimalIdentifierName: string,
                regExp: RegExp;

            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', {
                    identifiersPrefix: 'foo'
                });
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                )
            });

            describe('variant #1: hexadecimal name with prefix', () => {
                before(() => {
                    hexadecimalIdentifierName = identifierNamesGenerator.generate(6);
                    regExp = /^foo_0x(\w){4,6}$/;
                });

                it('should return hexadecimal name', () => {
                    assert.match(hexadecimalIdentifierName, regExp);
                })
            });
        });
    });
});
