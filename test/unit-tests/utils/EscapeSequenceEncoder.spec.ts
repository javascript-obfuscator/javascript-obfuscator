import 'reflect-metadata';

import { assert } from 'chai';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';
import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IEscapeSequenceEncoder } from '../../../src/interfaces/utils/IEscapeSequenceEncoder';


describe('EscapeSequenceEncoder', () => {
    describe('encode', () => {
        let escapeSequenceEncoder: IEscapeSequenceEncoder;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', '', {});
            escapeSequenceEncoder = inversifyContainerFacade
                .get<IEscapeSequenceEncoder>(ServiceIdentifiers.IEscapeSequenceEncoder);
        });

        describe('Variant #1: default', () => {
            const string: string = 'string';
            const expectedString: string = '\\x73\\x74\\x72\\x69\\x6e\\x67';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encode(string, true);
            });

            it('should return a string where all characters are encoded', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('Variant #2: escape `escape sequences`', () => {
            const string: string = 'abc\'\\r\\n';
            const expectedString: string = 'abc\\x27\\x5cr\\x5cn';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encode(string, false);
            });

            it('should return a string where all `escape sequences` are encoded', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('Variant #3: non-ascii character`', () => {
            const string: string = 'тест';
            const expectedString: string = '\\u0442\\u0435\\u0441\\u0442';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encode(string, true);
            });

            it('should return a string where all non-ascii characters are encoded', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('Variant #4: unicode control character`', () => {
            const string: string = '\x00\x1F\x7F\x9F';
            const expectedString: string = '\\x00\\x1f\\x7f\\u009f';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encode(string, false);
            });

            it('should return a string where all unicode control characters are encoded', () => {
                assert.equal(actualString, expectedString);
            });
        });
    });
});
