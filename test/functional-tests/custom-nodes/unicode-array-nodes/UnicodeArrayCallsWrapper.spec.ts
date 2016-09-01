import { IObfuscationResult } from "../../../../src/interfaces/IObfuscationResult";

import { JavaScriptObfuscator } from "../../../../src/JavaScriptObfuscator";

const assert: Chai.AssertStatic = require('chai').assert;

describe('UnicodeArrayCallsWrapper', () => {
    it('should correctly append `UnicodeArrayCallsWrapper` custom node into the obfuscated code if `wrapUnicodeArrayCalls` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                wrapUnicodeArrayCalls: true
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /return _0x([a-z0-9]){4}\[parseInt\(_0x([a-z0-9]){5,6}, *0x010\)\];/);
    });

    it('should\'t append `UnicodeArrayDecodeNode` custom node into the obfuscated code if `wrapUnicodeArrayCalls` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                wrapUnicodeArrayCalls: false
            }
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /return _0x([a-z0-9]){4}\[parseInt\(_0x([a-z0-9]){5,6}, *0x010\)\];/);
    });
});
