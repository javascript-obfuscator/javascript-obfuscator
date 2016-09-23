import { IObfuscationResult } from "../../../../src/interfaces/IObfuscationResult";

import { JavaScriptObfuscator } from "../../../../src/JavaScriptObfuscator";

const assert: Chai.AssertStatic = require('chai').assert;

describe('UnicodeArrayDecodeNode', () => {
    it('should correctly append `UnicodeArrayDecodeNode` custom node into the obfuscated code if `encodeUnicodeLiterals` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                encodeUnicodeLiterals: true
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /decodeURI\(atob\(_0x([a-z0-9]){4}\[_0x([a-z0-9]){4,6}\]\)\)/);
    });

    it('should\'t append `UnicodeArrayDecodeNode` custom node into the obfuscated code if `encodeUnicodeLiterals` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                encodeUnicodeLiterals: false
            }
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /decodeURI\(atob\(_0x([a-z0-9]){4}\[_0x([a-z0-9]){4,6}\]\)\)/);
    });
});
