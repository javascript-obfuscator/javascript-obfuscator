import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('UnicodeArrayNode', () => {
    it('should correctly appendNodeToOptimalBlockScope `UnicodeArrayNode` custom node into the obfuscated code if `unicodeArray` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                unicodeArray: true,
                unicodeArrayThreshold: 1
            })
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /^var _0x([a-z0-9]){4} *= *\[/);
    });

    it('should\'t appendNodeToOptimalBlockScope `UnicodeArrayNode` custom node into the obfuscated code if `unicodeArray` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                unicodeArray: false
            })
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /^var _0x([a-z0-9]){4} *= *\[/);
    });
});
