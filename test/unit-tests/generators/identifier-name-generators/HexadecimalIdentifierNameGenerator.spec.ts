import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { IIdentifierNameGenerator } from '../../../../src/interfaces/generators/identifier-name-generators/IIdentifierNameGenerator';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { IdentifierNameGenerator } from '../../../../src/enums/generators/identifier-name-generators/IdentifierNameGenerator';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

describe('HexadecimalIdentifierNameGenerator', () => {
    describe('generate (length: number): string', () => {
        let identifierNameGenerator: IIdentifierNameGenerator,
            hexadecimalIdentifierName: string,
            regExp: RegExp;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', {});
            identifierNameGenerator = inversifyContainerFacade.getNamed<IIdentifierNameGenerator>(
                ServiceIdentifiers.IIdentifierNameGenerator,
                IdentifierNameGenerator.HexadecimalIdentifierNameGenerator
            )
        });

        describe('variant #1: hexadecimal name with length `4`', () => {
            before(() => {
                hexadecimalIdentifierName = identifierNameGenerator.generate(4);
                regExp = /^_0x(\w){4}$/;
            });

            it('should return hexadecimal name', () => {
                assert.match(hexadecimalIdentifierName, regExp);
            })
        });

        describe('variant #2: hexadecimal name with length `6`', () => {
            before(() => {
                hexadecimalIdentifierName = identifierNameGenerator.generate(6);
                regExp = /^_0x(\w){4,6}$/;
            });

            it('should return hexadecimal name', () => {
                assert.match(hexadecimalIdentifierName, regExp);
            })
        });
    });
});
