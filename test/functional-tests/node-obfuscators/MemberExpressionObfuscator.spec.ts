import { IObfuscationResult } from '../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('MemberExpressionObfuscator', () => {
    describe('obfuscation of member expression node with dot notation', () => {
        it('should replace member expression dot notation call by square brackets call with unicode literal value', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = console.log;`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET)
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *console\['\\x6c\\x6f\\x67'\];/);
        });

        it('should replace member expression dot notation call by square brackets call to unicode array', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = console.log;`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                    unicodeArray: true,
                    unicodeArrayThreshold: 1
                })
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var *_0x([a-z0-9]){4} *= *\['\\x6c\\x6f\\x67'\];/);
            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *console\[_0x([a-z0-9]){4}\[0x0\]\];/);
        });
    });

    describe('obfuscation of member expression node without dot notation', () => {
        it('should replace member expression square brackets call by square brackets call to unicode array', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = console['log'];`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                    unicodeArray: true,
                    unicodeArrayThreshold: 1
                })
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var *_0x([a-z0-9]){4} *= *\['\\x6c\\x6f\\x67'\];/);
            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *console\[_0x([a-z0-9]){4}\[0x0\]\];/);
        });

        it('should ignore square brackets call with identifier value', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `
                    var identifier = 'log'; 
                    var test = console[identifier];
                `,
                Object.assign({}, NO_CUSTOM_NODES_PRESET)
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *console\[identifier\];/);
        });
    });
});
