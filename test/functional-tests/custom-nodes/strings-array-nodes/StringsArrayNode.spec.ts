import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('StringsArrayNode', () => {
    it('should correctly append `StringsArrayNode` custom node into the obfuscated code if `stringsArray` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                stringsArray: true,
                stringsArrayThreshold: 1
            })
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /^var _0x([a-z0-9]){4} *= *\[/);
    });

    it('should\'t append `StringsArrayNode` custom node into the obfuscated code if `stringsArray` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                stringsArray: false
            })
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /^var _0x([a-z0-9]){4} *= *\[/);
    });
});
