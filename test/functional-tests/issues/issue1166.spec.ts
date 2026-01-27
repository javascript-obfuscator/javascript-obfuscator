import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1166
//
describe('Issue #1166', () => {
    describe('`arguments` in collected block statement should not be injected into class field initializer', () => {
        let testFunc: () => string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1166.js');

            testFunc = () =>
                JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 1
                }).getObfuscatedCode();
        });

        it('does not crash on obfuscating', () => {
            // Run multiple times to increase chance of triggering the bug
            for (let i = 0; i < 50; i++) {
                assert.doesNotThrow(testFunc);
            }
        });
    });

    describe('`arguments` in collected block statement should not be injected into static block', () => {
        let testFunc: () => string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue1166-static-block.js');

            testFunc = () =>
                JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 1
                }).getObfuscatedCode();
        });

        it('does not crash on obfuscating', () => {
            // Run multiple times to increase chance of triggering the bug
            for (let i = 0; i < 50; i++) {
                assert.doesNotThrow(testFunc);
            }
        });
    });
});
