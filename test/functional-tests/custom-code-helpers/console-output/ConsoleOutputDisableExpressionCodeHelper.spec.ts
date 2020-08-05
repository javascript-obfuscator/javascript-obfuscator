import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('ConsoleOutputDisableExpressionCodeHelper', () => {
    const consoleGetterRegExp: RegExp = /var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\['console'] *= *_0x([a-f0-9]){4,6}\['console'] *\|| *{};/;

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

        it('match #1: should correctly append code helper into the obfuscated code', () => {
            assert.match(obfuscatedCode, consoleGetterRegExp);
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

        it('match #1: shouldn\'t append code helper into the obfuscated code', () => {
            assert.notMatch(obfuscatedCode, consoleGetterRegExp);
        });
    });
});
