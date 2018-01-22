import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IIdentifierNamesGenerator } from '../../../../src/interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

describe('HexadecimalIdentifierNamesGenerator', () => {
    describe('generate (length: number, attachPrefix: boolean): string', () => {
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
                );

                hexadecimalIdentifierName = identifierNamesGenerator.generate();
                regExp = /^_0x(\w){4,6}$/;
            });

            it('should return hexadecimal name', () => {
                assert.match(hexadecimalIdentifierName, regExp);
            })
        });

        describe('Hexadecimal name with prefix', () => {
            const regExp: RegExp = /^foo_0x(\w){4,6}$/;

            let identifierNamesGenerator: IIdentifierNamesGenerator,
                hexadecimalIdentifierName: string;

            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', {
                    identifiersPrefix: 'foo'
                });
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                );

                hexadecimalIdentifierName = identifierNamesGenerator.generateWithPrefix();
            });

            it('should return hexadecimal name with prefix', () => {
                assert.match(hexadecimalIdentifierName, regExp);
            })
        });

        describe('Hexadecimal name with random prefix', () => {
            const regExp: RegExp = /^(\w){6}_0x(\w){4,6}$/;

            let identifierNamesGenerator: IIdentifierNamesGenerator,
                hexadecimalIdentifierName: string;

            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', {
                    identifiersPrefix: true
                });
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                );

                hexadecimalIdentifierName = identifierNamesGenerator.generateWithPrefix();
            });

            it('should return hexadecimal name with prefix', () => {
                assert.match(hexadecimalIdentifierName, regExp);
            })
        });
    });
});
