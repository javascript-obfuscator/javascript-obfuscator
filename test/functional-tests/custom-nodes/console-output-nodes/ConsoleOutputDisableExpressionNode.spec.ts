import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('ConsoleOutputDisableExpressionNode', () => {
    const consoleLogRegExp: RegExp = /_0x([a-f0-9]){4,6}\['console'\]\['log'\] *= *_0x([a-f0-9]){4,6};/u;
    const consoleErrorRegExp: RegExp = /_0x([a-f0-9]){4,6}\['console'\]\['error'\] *= *_0x([a-f0-9]){4,6};/u;
    const consoleWarnRegExp: RegExp = /_0x([a-f0-9]){4,6}\['console'\]\['warn'\] *= *_0x([a-f0-9]){4,6};/u;

    it('should correctly append `ConsoleOutputDisableExpressionNode` custom node into the obfuscated code if `disableConsoleOutput` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/simple-input.js'),
            {
                ...NO_CUSTOM_NODES_PRESET,
                disableConsoleOutput: true
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(), consoleLogRegExp);
        assert.match(obfuscationResult.getObfuscatedCode(), consoleErrorRegExp);
        assert.match(obfuscationResult.getObfuscatedCode(), consoleWarnRegExp);
    });

    it('should\'t append `ConsoleOutputDisableExpressionNode` custom node into the obfuscated code if `disableConsoleOutput` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/simple-input.js'),
            {
                ...NO_CUSTOM_NODES_PRESET,
                disableConsoleOutput: false,
                stringArrayThreshold: 1
            }
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), consoleLogRegExp);
        assert.notMatch(obfuscationResult.getObfuscatedCode(), consoleErrorRegExp);
        assert.notMatch(obfuscationResult.getObfuscatedCode(), consoleWarnRegExp);
    });
});
