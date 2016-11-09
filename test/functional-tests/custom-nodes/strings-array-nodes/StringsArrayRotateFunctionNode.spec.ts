import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('StringsArrayRotateFunctionNode', () => {
    it('should correctly append `StringsArrayRotateFunctionNode` custom node into the obfuscated code if `rotateStringsArray` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                rotateStringsArray: true,
                stringsArray: true,
                stringsArrayThreshold: 1
            })
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /while *\(-- *_0x([a-z0-9]){4,6}\) *\{/);
    });

    it('should\'t append `StringsArrayRotateFunctionNode` custom node into the obfuscated code if `rotateStringsArray` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                rotateStringsArray: false,
                stringsArray: true,
                stringsArrayThreshold: 1
            })
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /while *\(-- *_0x([a-z0-9]){4,6}\) *\{/);
    });
});
