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

        describe('Variant #3: ignore already escaped unicode string`', () => {
            const string: string = '\\ud83d\\ude03';
            const expectedString: string = '\\ud83d\\ude03';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encode(string, false);
            });

            it('should ignore already escaped string', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('Variant #4: ignore already escaped hex string`', () => {
            describe('Variant #1: base`', () => {
                const string: string = '\\x48\\x65\\x6c\\x6c\\x6f';
                const expectedString: string = '\\x48\\x65\\x6c\\x6c\\x6f';

                let actualString: string;

                before(() => {
                    actualString = escapeSequenceEncoder.encode(string, true);
                });

                it('should ignore already escaped string', () => {
                    assert.equal(actualString, expectedString);
                });
            });

            describe('Variant #2: encode string with `x` character`', () => {
                const string: string = 'xxx';
                const expectedString: string = '\\x78\\x78\\x78';

                let actualString: string;

                before(() => {
                    actualString = escapeSequenceEncoder.encode(string, true);
                });

                it('should encode string with `x` character', () => {
                    assert.equal(actualString, expectedString);
                });
            });
        });
    });
});
