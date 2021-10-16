import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IIdentifierNamesGenerator } from '../../../../src/interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

describe('HexadecimalIdentifierNamesGenerator', () => {
    describe('generateNext', () => {
        describe('Base', () => {
            let identifierNamesGenerator: IIdentifierNamesGenerator,
                hexadecimalIdentifierName: string,
                regExp: RegExp;

            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', '', {});
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                );

                hexadecimalIdentifierName = identifierNamesGenerator.generateNext();
                regExp = /^_0x(\w){4,6}$/;
            });

            it('should return hexadecimal name', () => {
                assert.match(hexadecimalIdentifierName, regExp);
            })
        });

        describe('Custom length', () => {
            let identifierNamesGenerator: IIdentifierNamesGenerator,
                hexadecimalIdentifierName: string,
                regExp: RegExp;

            before(() => {
                const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

                inversifyContainerFacade.load('', '', {});
                identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                    ServiceIdentifiers.IIdentifierNamesGenerator,
                    IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                );

                hexadecimalIdentifierName = identifierNamesGenerator.generateNext(3);
                regExp = /^_0x(\w){3}$/;
            });

            it('should return hexadecimal name', () => {
                assert.match(hexadecimalIdentifierName, regExp);
            })
        });
    });

    describe('generateForGlobalScope', () => {
        const regExp: RegExp = /^foo_0x(\w){4,6}$/;

        let identifierNamesGenerator: IIdentifierNamesGenerator,
            hexadecimalIdentifierName: string;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', '', {
                identifiersPrefix: 'foo'
            });
            identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                ServiceIdentifiers.IIdentifierNamesGenerator,
                IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
            );

            hexadecimalIdentifierName = identifierNamesGenerator.generateForGlobalScope();
        });

        it('should return hexadecimal name with prefix', () => {
            assert.match(hexadecimalIdentifierName, regExp);
        })
    });

    describe('generateForLabel', () => {
        const label1: string = 'label1';
        const label2: string = 'label2';
        const regExp: RegExp = /^_0x(\w){4,6}$/;

        let identifierNamesGenerator: IIdentifierNamesGenerator,
            hexadecimalIdentifierName1: string,
            hexadecimalIdentifierName2: string;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', '', {
                identifiersPrefix: 'foo'
            });
            identifierNamesGenerator = inversifyContainerFacade.getNamed<IIdentifierNamesGenerator>(
                ServiceIdentifiers.IIdentifierNamesGenerator,
                IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
            );

            identifierNamesGenerator.generateForLabel(label1)
            identifierNamesGenerator.generateForLabel(label1)
            hexadecimalIdentifierName1 = identifierNamesGenerator.generateForLabel(label1);

            identifierNamesGenerator.generateForLabel(label2)
            identifierNamesGenerator.generateForLabel(label2)
            hexadecimalIdentifierName2 = identifierNamesGenerator.generateForLabel(label2);
        });

        it('should return valid hexadecimal name 1', () => {
            assert.match(hexadecimalIdentifierName1, regExp);
        })

        it('should return valid hexadecimal name 2', () => {
            assert.match(hexadecimalIdentifierName2, regExp);
        })

        it('should generate different hexadecimal names for different labels', () => {
            assert.notEqual(hexadecimalIdentifierName1, hexadecimalIdentifierName2);
        })
    });
});
