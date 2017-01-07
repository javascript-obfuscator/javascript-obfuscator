import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('LiteralTransformer', () => {
    describe('transformation of literal node with string value', () => {
        it('should replace literal node value with unicode escape sequence', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/simple-input.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *'\\x74\\x65\\x73\\x74';$/);
        });

        it('should replace literal node value with unicode escape sequence from string array', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/simple-input.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                /^var *_0x([a-z0-9]){4} *= *\['\\x74\\x65\\x73\\x74'\];/
            );
            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *_0x([a-z0-9]){4}\('0x0'\);/);
        });

        it('should create only one item in string array for same literal node values', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/same-literal-values.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                /^var *_0x([a-z0-9]){4} *= *\['\\x74\\x65\\x73\\x74'\];/
            );
            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *_0x([a-z0-9]){4}\('0x0'\);/);
        });

        it('should replace literal node value with raw value from string array if `unicodeEscapeSequence` is disabled', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/simple-input.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    unicodeEscapeSequence: false
                }
            );

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                /^var *_0x([a-z0-9]){4} *= *\['test'\];/
            );
            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *_0x([a-z0-9]){4}\('0x0'\);/);
        });

        it('should replace literal node value with raw value from string array if `unicodeEscapeSequence` and `stringArray` are disabled', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/simple-input.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            );

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                /^var *test *= *'test';/
            );
        });

        it('should\'t throw an error when string contains non-latin and non-digit characters and `unicodeEscapeSequence` is disabled', () => {
            assert.doesNotThrow(() => JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/error-when-non-latin.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    unicodeEscapeSequence: false
                }
            ));
        });

        it('shouldn\'t replace short literal node value with value from string array', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/short-literal-value.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *'\\x74\\x65';/);
        });

        it('should replace literal node value with value from string array encoded using base64', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/simple-input.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayEncoding: 'base64',
                    stringArrayThreshold: 1
                }
            );

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                /^var *_0x([a-z0-9]){4} *= *\['\\x64\\x47\\x56\\x7a\\x64\\x41\\x3d\\x3d'\];/
            );
            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *_0x([a-z0-9]){4}\('0x0'\);/);
        });

        it('should replace literal node value with value from string array encoded using rc4', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/simple-input.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayEncoding: 'rc4',
                    stringArrayThreshold: 1
                }
            );

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                /var *test *= *_0x([a-z0-9]){4}\('0x0', '(\\x[a-f0-9]*){4}'\);/
            );
        });

        it('should replace literal node value with value from string array with `stringArrayThreshold` chance', () => {
            const samples: number = 1000;
            const stringArrayThreshold: number = 0.5;
            const delta: number = 0.1;
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `${readFileAsString(__dirname + '/fixtures/simple-input.js')}\n`.repeat(samples),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: stringArrayThreshold
                }
            );

            const regExp1: RegExp = /var *test *= *_0x([a-z0-9]){4}\('0x0'\);/g;
            const regExp2: RegExp = /var *test *= *'\\x74\\x65\\x73\\x74';/g;
            const stringArrayMatchesLength = obfuscationResult.getObfuscatedCode().match(regExp1)!.length;
            const noStringArrayMatchesLength = obfuscationResult.getObfuscatedCode().match(regExp2)!.length;

            assert.closeTo(stringArrayMatchesLength / samples, stringArrayThreshold, delta);
            assert.closeTo(noStringArrayMatchesLength / samples, stringArrayThreshold, delta);
        });
    });

    it('should transform literal node with boolean value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/boolean-value.js'),
            {
                ...NO_CUSTOM_NODES_PRESET,
                stringArray: true,
                stringArrayThreshold: 1
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *!!\[\];$/);
    });

    it('should transform literal node with number value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/number-value.js'),
            {
                ...NO_CUSTOM_NODES_PRESET,
                stringArray: true,
                stringArrayThreshold: 1
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *0x0;$/);
    });
});
