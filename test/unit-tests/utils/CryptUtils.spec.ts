import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { ICryptUtils } from '../../../src/interfaces/utils/ICryptUtils';
import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

describe('CryptUtils', () => {
    let cryptUtils: ICryptUtils;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        cryptUtils = inversifyContainerFacade.get<ICryptUtils>(ServiceIdentifiers.ICryptUtils);
    });

    describe('btoa', () => {
        const expectedString: string = 'c3RyaW5n';

        let string: string;

        before(() => {
            string = cryptUtils.btoa('string');
        });

        it('should create a base-64 encoded string from a given string', () => {
            assert.equal(string, expectedString);
        });
    });

    describe('hideString', () => {
        const originalString: string = 'example.com';
        const hiddenStringLength: number = 30;

        let hiddenString: string,
            diffString: string;

        before(() => {
            [hiddenString, diffString] = cryptUtils.hideString(originalString, hiddenStringLength);
        });

        describe('hidden string length check', () => {
            let originalStringActualLength: number,
                hiddenStringActualLength: number;

            before(() => {
                originalStringActualLength = originalString.length;
                hiddenStringActualLength = hiddenString.length;
            });

            it('should create hidden string with length equal or bigger than given length', () => {
                assert.isTrue(hiddenStringActualLength > originalStringActualLength);
            });
        });

        describe('hidden string content', () => {
            let hiddenStringWithoutDiff: string;

            before(() => {
                const regExp: RegExp = new RegExp(`[${diffString}]`, 'g');

                hiddenStringWithoutDiff = hiddenString.replace(regExp, '');
            });

            it('should return a hidden string with the original string within', () => {
                assert.equal(hiddenStringWithoutDiff, originalString);
            });
        });
    });

    describe('rc4', () => {
        const string: string = 'test';
        const key: string = 'key';

        let encodedString: string,
            decodedString: string;

        before(() => {
            encodedString = cryptUtils.rc4(string, key);
            decodedString = cryptUtils.rc4(encodedString, key);
        });

        it('should encode string using the rc4 algorithm', () => {
            assert.notEqual(encodedString, string);
        });

        it('should encode and successfully decode string using the rc4 algorithm', () => {
            assert.equal(decodedString, string);
        });
    });
});
