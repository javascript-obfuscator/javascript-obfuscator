import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('StringArrayRotateFunctionNode', () => {
    it('should correctly append `StringArrayRotateFunctionNode` custom node into the obfuscated code if `rotateStringArray` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                rotateStringArray: true,
                stringArray: true,
                stringArrayThreshold: 1
            })
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /while *\(-- *_0x([a-z0-9]){4,6}\) *\{/);
    });

    it('should\'t append `StringArrayRotateFunctionNode` custom node into the obfuscated code if `rotateStringArray` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                rotateStringArray: false,
                stringArray: true,
                stringArrayThreshold: 1
            })
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /while *\(-- *_0x([a-z0-9]){4,6}\) *\{/);
    });
});
