import { IObfuscationResult } from "../../../src/interfaces/IObfuscationResult";

import { NO_CUSTOM_NODES_PRESET } from "../../../src/preset-options/NoCustomNodesPreset";

import { JavaScriptObfuscator } from "../../../src/JavaScriptObfuscator";

const assert: Chai.AssertStatic = require('chai').assert;

describe('ObjectExpressionObfuscator', () => {
    it('should replace object expression node `key` property with literal value by unicode value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = { 'foo': 0 };`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET)
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *\{'\\x66\\x6f\\x6f':0x0\};$/);
    });

    it('should replace object expression node `key` property with identifier value by unicode value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = { foo: 0 };`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET)
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *\{'\\x66\\x6f\\x6f':0x0\};$/);
    });
});
