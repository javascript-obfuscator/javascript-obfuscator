import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { StringArrayIndexesType } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayIndexesType';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('EscapeSequenceTransformer', function () {
    this.timeout(120000);

    describe('Variant #1: string contains non-latin and non-digit characters and `unicodeEscapeSequence` is disabled', () => {
        let testFunc: () => void;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/error-when-non-latin.js');

            testFunc = () => JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );
        });

        it('should\'t throw an error', () => {
            assert.doesNotThrow(testFunc);
        });
    });

    describe('Variant #2: `unicodeEscapeSequence` option is enabled', () => {
        const regExp: RegExp = /^var test *= *'\\x74\\x65\\x73\\x74';$/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: true

                }
            ).getObfuscatedCode();
        });

        it('should replace literal node value with unicode escape sequence', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #3: `unicodeEscapeSequence` and `stringArray` options are enabled', () => {
        const stringArrayRegExp: RegExp = /^var _0x([a-f0-9]){4} *= *\['\\x74\\x65\\x73\\x74'\];/;
        const stringArrayCallRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('\\x30\\x78\\x30'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayIndexesType: [
                        StringArrayIndexesType.HexadecimalNumericString
                    ],
                    stringArrayThreshold: 1,
                    unicodeEscapeSequence: true
                }
            ).getObfuscatedCode();
        });

        it('match #1: should replace literal node value with unicode escape sequence from string array', () => {
            assert.match(obfuscatedCode, stringArrayRegExp);
        });

        it('match #2: should replace literal node value with unicode escape sequence from string array', () => {
            assert.match(obfuscatedCode, stringArrayCallRegExp);
        });
    });

    describe('Variant #4: `reservedStrings` option is enabled', () => {
        describe('Variant #1: base', () => {
            const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
            const stringLiteralRegExp2: RegExp = /const bar *= *'\\x62\\x61\\x72';/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        reservedStrings: ['foo'],
                        unicodeEscapeSequence: true
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should ignore reserved strings', () => {
                assert.match(obfuscatedCode, stringLiteralRegExp1);
            });

            it('match #2: should transform non-reserved strings', () => {
                assert.match(obfuscatedCode, stringLiteralRegExp2);
            });
        });

        describe('Variant #2: correct escape of special characters', () => {
            const stringLiteralRegExp: RegExp = /var baz *= *'Cannot find module \\'' *\+ *foo *\+ *'\\x27';/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        reservedStrings: ['a']
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should ignore reserved strings', () => {
                assert.match(obfuscatedCode, stringLiteralRegExp);
            });
        });
    });

    describe('Variant #5: `forceTransformStrings` option is enabled', () => {
        const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
        const stringLiteralRegExp2: RegExp = /const bar *= *'bar';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/force-transform-strings-option.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    forceTransformStrings: ['bar'],
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();
        });

        it('match #1: should not encode force transform string with unicode escape sequence', () => {
            assert.match(obfuscatedCode, stringLiteralRegExp1);
        });

        it('match #2: should not encode force transform string with unicode escape sequence', () => {
            assert.match(obfuscatedCode, stringLiteralRegExp2);
        });
    });

    describe('Variant #6: `stringArrayWrappersCount` option enabled', () => {
        const stringArrayCallRegExp: RegExp = new RegExp(
                'return e;' +
            '};' +
            'const f *= *b;' +
            'const foo *= *f\\(\'\\\\x30\\\\x78\\\\x30\'\\);' +
            'const bar *= *f\\(\'\\\\x30\\\\x78\\\\x31\'\\);' +
            'const baz *= *f\\(\'\\\\x30\\\\x78\\\\x32\'\\);' +
            'function test\\( *\\) *{' +
                'const g *= *f;' +
                'const c *= *g\\(\'\\\\x30\\\\x78\\\\x33\'\\);' +
                'const d *= *g\\(\'\\\\x30\\\\x78\\\\x34\'\\);' +
                'const e *= *g\\(\'\\\\x30\\\\x78\\\\x35\'\\);' +
            '}'
        );

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                    stringArray: true,
                    stringArrayIndexesType: [
                        StringArrayIndexesType.HexadecimalNumericString
                    ],
                    stringArrayThreshold: 1,
                    stringArrayWrappersChainedCalls: true,
                    stringArrayWrappersCount: 1,
                    unicodeEscapeSequence: true
                }
            ).getObfuscatedCode();
        });

        it('should encode calls to the string array wrappers', () => {
            assert.match(obfuscatedCode, stringArrayCallRegExp);
        });
    });
});
