import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('LiteralObfuscator', () => {
    describe('obfuscation of literal node with string value', () => {
        it('should replace literal node value with unicode escape sequence', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'test';`,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *'\\x74\\x65\\x73\\x74';$/);
        });

        it('should replace literal node value with unicode escape sequence from unicode array', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'test';`,
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

        it('should replace literal node value with raw value from unicode array if `unicodeEscapeSequence` is disabled', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'test';`,
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

        it('should replace literal node value with raw value from unicode array if `unicodeEscapeSequence` and `stringArray` are disabled', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'test';`,
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
                readFileAsString('./test/fixtures/node-transformers/node-obfuscators/literal-obfuscator/literal-obfuscator-unicode-sequence.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    unicodeEscapeSequence: false
                }
            ));
        });

        it('shouldn\'t replace short literal node value with unicode array value', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'te';`,
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *'\\x74\\x65';/);
        });

        it('should replace literal node value with unicode array value encoded using base64', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'test';`,
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

        it('should replace literal node value with unicode array value encoded using rc4', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'test';`,
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
    });

    it('should obfuscate literal node with boolean value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = true;`,
            {
                ...NO_CUSTOM_NODES_PRESET,
                stringArray: true,
                stringArrayThreshold: 1
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *!!\[\];$/);
    });

    it('should obfuscate literal node with number value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 0;`,
            {
                ...NO_CUSTOM_NODES_PRESET,
                stringArray: true,
                stringArrayThreshold: 1
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *0x0;$/);
    });
});
