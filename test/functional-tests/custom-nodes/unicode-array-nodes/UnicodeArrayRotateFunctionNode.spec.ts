import { IObfuscationResult } from "../../../../src/interfaces/IObfuscationResult";

import { JavaScriptObfuscator } from "../../../../src/JavaScriptObfuscator";

const assert: Chai.AssertStatic = require('chai').assert;

describe('UnicodeArrayRotateFunctionNode', () => {
    it('should correctly append `UnicodeArrayRotateFunctionNode` custom node into the obfuscated code if `rotateUnicodeArray` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                rotateUnicodeArray: true
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /while *\(-- *_0x([a-z0-9]){5,6}\) *\{/);
    });

    it('should\'t append `UnicodeArrayRotateFunctionNode` custom node into the obfuscated code if `rotateUnicodeArray` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                rotateUnicodeArray: false
            }
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /while *\(-- *_0x([a-z0-9]){5,6}\) *\{/);
    });
});
