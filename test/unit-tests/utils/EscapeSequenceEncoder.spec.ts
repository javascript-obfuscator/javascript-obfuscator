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
            escapeSequenceEncoder = inversifyContainerFacade.get<IEscapeSequenceEncoder>(
                ServiceIdentifiers.IEscapeSequenceEncoder
            );
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
            const string: string = "abc'\\r\\n";
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

    describe('encodeLiteral', () => {
        let escapeSequenceEncoder: IEscapeSequenceEncoder;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', '', {});
            escapeSequenceEncoder = inversifyContainerFacade.get<IEscapeSequenceEncoder>(
                ServiceIdentifiers.IEscapeSequenceEncoder
            );
        });

        describe('Variant #1: preserve unicode escape sequences from the raw value', () => {
            // eslint-disable-next-line no-useless-escape
            const value: string = '😃';
            const rawValue: string = '"\\ud83d\\ude03"';
            const expectedString: string = '\\ud83d\\ude03';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encodeLiteral(value, rawValue, false);
            });

            it('should keep the escape sequence untouched', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('Variant #2: preserve hex escape sequences from the raw value', () => {
            const value: string = 'ABC';
            const rawValue: string = '"\\x41\\x42\\x43"';
            const expectedString: string = '\\x41\\x42\\x43';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encodeLiteral(value, rawValue, false);
            });

            it('should keep the hex escape sequence untouched', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('Variant #3: preserve unicode code point escape sequences from the raw value', () => {
            const value: string = '\u{1F604}';
            const rawValue: string = '"\\u{1F604}"';
            const expectedString: string = '\\u{1F604}';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encodeLiteral(value, rawValue, false);
            });

            it('should keep the unicode code point escape sequence untouched', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('Variant #4: keep an un-escaped character un-escaped', () => {
            const value: string = '😃';
            const rawValue: string = '"😃"';
            const expectedString: string = '😃';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encodeLiteral(value, rawValue, false);
            });

            it('should keep the character un-escaped', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('Variant #5: non unicode escape sequences are encoded as regular characters', () => {
            const value: string = 'a\tb';
            const rawValue: string = '"a\\tb"';
            const expectedString: string = 'a\\x09b';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encodeLiteral(value, rawValue, false);
            });

            it('should encode the escape sequence as a regular character', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('Variant #6: untrusted raw value falls back to value-based encoding', () => {
            // synthesized `raw` (e.g. `'a\b'`) does not faithfully represent the value `a\b`
            const value: string = 'a\\b';
            const rawValue: string = "'a\\b'";
            const expectedString: string = 'a\\x5cb';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encodeLiteral(value, rawValue, false);
            });

            it('should encode the value with the safe value-based encoding', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('Variant #7: `encodeAllSymbols` escapes everything regardless of the raw value', () => {
            const value: string = '😃';
            const rawValue: string = '"😃"';
            const expectedString: string = '\\ud83d\\ude03';

            let actualString: string;

            before(() => {
                actualString = escapeSequenceEncoder.encodeLiteral(value, rawValue, true);
            });

            it('should encode all symbols', () => {
                assert.equal(actualString, expectedString);
            });
        });
    });
});
