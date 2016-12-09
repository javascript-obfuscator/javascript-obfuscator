import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('ObjectExpressionObfuscator', () => {
    it('should replace object expression node `key` property with literal value by unicode value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = { 'foo': 0 };`,
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *\{'\\x66\\x6f\\x6f':0x0\};/);
    });

    it('should replace object expression node `key` property with identifier value by unicode value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = { foo: 0 };`,
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *\{'\\x66\\x6f\\x6f':0x0\};/);
    });

    it('should correct convert shorthand ES6 object expression to non-shorthand object expression', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `
                (function () {
                    let a = 0;
                    let b = 0;
                    var test = {a, b};
                })();
            `,
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(
            obfuscationResult.getObfuscatedCode(),
            /var *_0x[a-z0-9]{4,6} *= *\{'\\x61': *_0x[a-z0-9]{4,6}\, *'\\x62': *_0x[a-z0-9]{4,6}\};/
        );
    });

    it('should correct convert shorthand ES6 object expression to non-shorthand object expression', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `
                (function () {
                    let a = 0;
                    let b = 0;
                    var test = {a, b};
                })();
            `,
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(
            obfuscationResult.getObfuscatedCode(),
            /var *_0x[a-z0-9]{4,6} *= *\{'\\x61': *_0x[a-z0-9]{4,6}\, *'\\x62': *_0x[a-z0-9]{4,6}\};/
        );
    });
});
