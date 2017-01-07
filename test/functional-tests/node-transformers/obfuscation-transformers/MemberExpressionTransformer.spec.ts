import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('MemberExpressionTransformer', () => {
    describe('obfuscation of member expression node with dot notation', () => {
        it('should replace member expression dot notation call by square brackets call with unicode literal value', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = console.log;`,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *console\['\\x6c\\x6f\\x67'\];/);
        });

        it('should replace member expression dot notation call by square brackets call to unicode array', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = console.log;`,
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var *_0x([a-z0-9]){4} *= *\['\\x6c\\x6f\\x67'\];/);
            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *console\[_0x([a-z0-9]){4}\('0x0'\)\];/);
        });
    });

    describe('obfuscation of member expression node without dot notation', () => {
        it('should replace member expression square brackets call by square brackets call to unicode array', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = console['log'];`,
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var *_0x([a-z0-9]){4} *= *\['\\x6c\\x6f\\x67'\];/);
            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *console\[_0x([a-z0-9]){4}\('0x0'\)\];/);
        });

        it('should ignore square brackets call with identifier value', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `
                    var identifier = 'log'; 
                    var test = console[identifier];
                `,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *console\[identifier\];/);
        });
    });
});
