import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { ICryptUtilsSwappedAlphabet } from '../../../src/interfaces/utils/ICryptUtilsSwappedAlphabet';
import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

import { swapLettersCase } from '../../helpers/swapLettersCase';

describe('CryptUtilsSwappedAlphabet', () => {
    let cryptUtilsSwappedAlphabet: ICryptUtilsSwappedAlphabet;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        cryptUtilsSwappedAlphabet = inversifyContainerFacade
            .get<ICryptUtilsSwappedAlphabet>(ServiceIdentifiers.ICryptUtilsSwappedAlphabet);
    });

    describe('btoa', () => {
        const expectedString: string = swapLettersCase('c3RyaW5n');

        let string: string;

        before(() => {
            string = cryptUtilsSwappedAlphabet.btoa('string');
        });

        it('should create a base-64 encoded string with swapped alphabet from a given string', () => {
            assert.equal(string, expectedString);
        });
    });

    describe('rc4', () => {
        const string: string = 'test';
        const key: string = 'key';

        let encodedString: string,
            decodedString: string;

        before(() => {
            encodedString = cryptUtilsSwappedAlphabet.rc4(string, key);
            decodedString = cryptUtilsSwappedAlphabet.rc4(encodedString, key);
        });

        it('should encode string using the rc4 algorithm', () => {
            assert.notEqual(encodedString, string);
        });

        it('should encode and successfully decode string using the rc4 algorithm', () => {
            assert.equal(decodedString, string);
        });
    });
});
