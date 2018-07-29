import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('ConsoleOutputDisableExpressionNode', () => {
    const consoleLogRegExp: RegExp = /_0x([a-f0-9]){4,6}\['console'\]\['log'\] *= *_0x([a-f0-9]){4,6};/u;
    const consoleErrorRegExp: RegExp = /_0x([a-f0-9]){4,6}\['console'\]\['error'\] *= *_0x([a-f0-9]){4,6};/u;
    const consoleWarnRegExp: RegExp = /_0x([a-f0-9]){4,6}\['console'\]\['warn'\] *= *_0x([a-f0-9]){4,6};/u;

    describe('`disableConsoleOutput` option is set', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    disableConsoleOutput: true
                }
            ).getObfuscatedCode();
        });

        it('match #1: should correctly append custom node into the obfuscated code', () => {
            assert.match(obfuscatedCode, consoleLogRegExp);
        });

        it('match #2: should correctly append custom node into the obfuscated code', () => {
            assert.match(obfuscatedCode, consoleErrorRegExp);
        });

        it('match #3: should correctly append custom node into the obfuscated code', () => {
            assert.match(obfuscatedCode, consoleWarnRegExp);
        });
    });

    describe('`disableConsoleOutput` option isn\'t set', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    disableConsoleOutput: false
                }
            ).getObfuscatedCode();
        });

        it('match #1: shouldn\'t append custom node into the obfuscated code', () => {
            assert.notMatch(obfuscatedCode, consoleLogRegExp);
        });

        it('match #2: shouldn\'t append custom node into the obfuscated code', () => {
            assert.notMatch(obfuscatedCode, consoleErrorRegExp);
        });

        it('match #3: shouldn\'t append custom node into the obfuscated code', () => {
            assert.notMatch(obfuscatedCode, consoleWarnRegExp);
        });
    });
});
