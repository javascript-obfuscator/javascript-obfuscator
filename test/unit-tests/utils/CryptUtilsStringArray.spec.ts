import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { ICryptUtilsStringArray } from '../../../src/interfaces/utils/ICryptUtilsStringArray';
import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

import { swapLettersCase } from '../../helpers/swapLettersCase';

describe('CryptUtilsStringArray', () => {
    let cryptUtilsStringArray: ICryptUtilsStringArray;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        cryptUtilsStringArray = inversifyContainerFacade
            .get<ICryptUtilsStringArray>(ServiceIdentifiers.ICryptUtilsStringArray);
    });

    describe('btoa', () => {
        describe('Variant #1: basic', () => {
            const expectedString: string = swapLettersCase('c3RyaW5n');

            let string: string;

            before(() => {
                string = cryptUtilsStringArray.btoa('string');
            });

            it('should create a base-64 encoded string with swapped alphabet from a given string', () => {
                assert.equal(string, expectedString);
            });
        });

        describe('Variant #2: no padding characters', () => {
            const expectedString: string = swapLettersCase('c3RyaQ');

            let string: string;

            before(() => {
                string = cryptUtilsStringArray.btoa('stri');
            });

            it('should create a base-64 encoded string from a given string without padding characters', () => {
                assert.equal(string, expectedString);
            });
        });
    });

    describe('rc4', () => {
        const string: string = 'test';
        const key: string = 'key';

        let encodedString: string,
            decodedString: string;

        before(() => {
            encodedString = cryptUtilsStringArray.rc4(string, key);
            decodedString = cryptUtilsStringArray.rc4(encodedString, key);
        });

        it('should encode string using the rc4 algorithm', () => {
            assert.notEqual(encodedString, string);
        });

        it('should encode and successfully decode string using the rc4 algorithm', () => {
            assert.equal(decodedString, string);
        });
    });
});
