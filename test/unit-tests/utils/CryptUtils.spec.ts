import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { ICryptUtils } from '../../../src/interfaces/utils/ICryptUtils';
import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';
import { atob } from '../../helpers/atob';

describe('CryptUtils', () => {
    let cryptUtils: ICryptUtils;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        cryptUtils = inversifyContainerFacade.get<ICryptUtils>(ServiceIdentifiers.ICryptUtils);
    });

    describe('btoa', () => {
       describe('Variant #1: basic', () => {
           const expectedEncodedString: string = 'c3RyaW5n';
           const expectedDecodedString: string = 'string';

           let encodedString: string,
               decodedString: string;

           before(() => {
               encodedString = cryptUtils.btoa('string');
               decodedString = atob(encodedString);
           });

           it('should create a base-64 encoded string from a given string', () => {
               assert.equal(encodedString, expectedEncodedString);
           });

           it('should create encoded string that can be successfully decoded', () => {
               assert.equal(decodedString, expectedDecodedString);
           });
       });

        describe('Variant #2: padding characters', () => {
            const expectedEncodedString: string = 'c3RyaQ==';
            const expectedDecodedString: string = 'stri';

            let encodedString: string,
                decodedString: string;

            before(() => {
                encodedString = cryptUtils.btoa('stri');
                decodedString = atob(encodedString);
            });

            it('should create a base-64 encoded string from a given string with padding characters', () => {
                assert.equal(encodedString, expectedEncodedString);
            });

            it('should create encoded string that can be successfully decoded', () => {
                assert.equal(decodedString, expectedDecodedString);
            });
        });

        describe('Variant #3: cyrillic string', () => {
            const expectedEncodedString: string = '0YLQtdGB0YI=';
            const expectedDecodedString: string = 'тест';

            let encodedString: string,
                decodedString: string;

            before(() => {
                encodedString = cryptUtils.btoa('тест');
                decodedString = atob(encodedString);
            });

            it('should create a base-64 encoded string from a given string', () => {
                assert.equal(encodedString, expectedEncodedString);
            });

            it('should create encoded string with a cyrillic characters that can be successfully decoded', () => {
                assert.equal(decodedString, expectedDecodedString);
            });
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
