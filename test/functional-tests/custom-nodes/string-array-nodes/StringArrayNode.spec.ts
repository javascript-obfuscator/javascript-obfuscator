import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('StringArrayNode', () => {
    it('should correctly append `StringArrayNode` custom node into the obfuscated code if `stringArray` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                stringArray: true,
                stringArrayThreshold: 1
            })
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /^var _0x([a-z0-9]){4} *= *\[/);
    });

    it('should\'t append `StringArrayNode` custom node into the obfuscated code if `stringArray` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                stringArray: false
            })
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /^var _0x([a-z0-9]){4} *= *\[/);
    });
});
