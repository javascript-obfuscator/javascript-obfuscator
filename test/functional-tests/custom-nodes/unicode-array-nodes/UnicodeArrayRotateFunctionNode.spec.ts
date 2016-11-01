import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('UnicodeArrayRotateFunctionNode', () => {
    it('should correctly appendNode `UnicodeArrayRotateFunctionNode` custom node into the obfuscated code if `rotateUnicodeArray` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                rotateUnicodeArray: true,
                unicodeArray: true,
                unicodeArrayThreshold: 1
            })
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /while *\(-- *_0x([a-z0-9]){4,6}\) *\{/);
    });

    it('should\'t appendNode `UnicodeArrayRotateFunctionNode` custom node into the obfuscated code if `rotateUnicodeArray` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                rotateUnicodeArray: false,
                unicodeArray: true,
                unicodeArrayThreshold: 1
            })
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /while *\(-- *_0x([a-z0-9]){4,6}\) *\{/);
    });
});
