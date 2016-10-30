import { IObfuscationResult } from '../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('LiteralObfuscator', () => {
    describe('obfuscation of literal node with string value', () => {
        it('should replace literal node value with unicode value without encoding', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'test';`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET)
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *'\\x74\\x65\\x73\\x74';$/);
        });

        it('should replace literal node value with unicode value encoded using base64', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'test';`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                    unicodeArray: true,
                    unicodeArrayEncoding: 'base64',
                    unicodeArrayThreshold: 1
                })
            );

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                /^var *_0x([a-z0-9]){4} *= *\['\\x64\\x47\\x56\\x7a\\x64\\x41\\x3d\\x3d'\];/
            );
            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *_0x([a-z0-9]){4}\('0x0'\);/);
        });

        it('should replace literal node value with unicode value encoded using rc4', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'test';`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                    unicodeArray: true,
                    unicodeArrayEncoding: 'rc4',
                    unicodeArrayThreshold: 1
                })
            );

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                /^var *_0x([a-z0-9]){4} *= *\['(\\x[a-f0-9]*){8}'\];/
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
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                unicodeArray: true,
                unicodeArrayThreshold: 1
            })
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *!!\[\];$/);
    });

    it('should obfuscate literal node with number value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 0;`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                unicodeArray: true,
                unicodeArrayThreshold: 1
            })
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *0x0;$/);
    });
});
