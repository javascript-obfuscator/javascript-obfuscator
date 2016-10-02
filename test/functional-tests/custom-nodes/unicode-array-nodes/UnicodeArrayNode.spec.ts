import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('UnicodeArrayNode', () => {
    it('should correctly append `UnicodeArrayNode` custom node into the obfuscated code if `unicodeArray` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                unicodeArray: true
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /^var _0x([a-z0-9]){4} *= *\[/);
    });

    it('should\'t append `UnicodeArrayNode` custom node into the obfuscated code if `unicodeArray` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                unicodeArray: false
            }
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /^var _0x([a-z0-9]){4} *= *\[/);
    });
});
