import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('UnicodeArrayCallsWrapper', () => {
    it('should correctly appendNode `UnicodeArrayCallsWrapper` custom node into the obfuscated code', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                wrapUnicodeArrayCalls: true
            }
        );

        assert.match(
            obfuscationResult.getObfuscatedCode(),
            /var *_0x([a-z0-9]){4,6} *= *_0x([a-z0-9]){4}\[parseInt\(_0x([a-z0-9]){4,6}, *0x10\)\];/
        );
    });
});
