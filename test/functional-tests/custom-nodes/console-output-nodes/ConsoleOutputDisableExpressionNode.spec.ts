import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('ConsoleOutputDisableExpressionNode', () => {
    const regExp = /(_0x([a-z0-9]){4,6}\['(\\x[a-f0-9]*)*'\]\['(\\x[a-f0-9]*)*'\] *= *_0x([a-z0-9]){4,6};){4}/;

    it('should correctly appendNodeToOptimalBlockScope `ConsoleOutputDisableExpressionNode` custom node into the obfuscated code if `disableConsoleOutput` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                disableConsoleOutput: true
            })
        );

        assert.match(obfuscationResult.getObfuscatedCode(), regExp);
    });

    it('should\'t appendNodeToOptimalBlockScope `ConsoleOutputDisableExpressionNode` custom node into the obfuscated code if `disableConsoleOutput` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                disableConsoleOutput: false,
                unicodeArrayThreshold: 1
            })
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), regExp);
    });
});
