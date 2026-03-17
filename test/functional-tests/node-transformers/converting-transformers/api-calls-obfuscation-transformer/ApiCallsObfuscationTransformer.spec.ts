import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ApiCallsObfuscationTransformer', () => {
    describe('obfuscateApiCalls option is enabled', () => {
        describe('Variant #1: DOM API calls', () => {
            const documentRegExp: RegExp = /globalThis\['document'\]/;
            const windowRegExp: RegExp = /globalThis\['window'\]/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/dom-api-calls.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    obfuscateApiCalls: true
                }).getObfuscatedCode();
            });

            it('should replace document with globalThis access in API call', () => {
                assert.match(obfuscatedCode, documentRegExp);
            });

            it('should replace window with globalThis access in API call', () => {
                assert.match(obfuscatedCode, windowRegExp);
            });
        });

        describe('Variant #2: standalone API function calls (fetch)', () => {
            const fetchRegExp: RegExp = /globalThis\['fetch'\]/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/fetch-call.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    obfuscateApiCalls: true
                }).getObfuscatedCode();
            });

            it('should replace fetch with globalThis access', () => {
                assert.match(obfuscatedCode, fetchRegExp);
            });
        });
    });

    describe('obfuscateApiCalls option is disabled', () => {
        const documentDirectRegExp: RegExp = /\bdocument\b/;
        const noGlobalThisRegExp: RegExp = /globalThis\['document'\]/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/disabled-option.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                obfuscateApiCalls: false
            }).getObfuscatedCode();
        });

        it('should keep document as direct identifier', () => {
            assert.match(obfuscatedCode, documentDirectRegExp);
        });

        it('should not add globalThis access', () => {
            assert.notMatch(obfuscatedCode, noGlobalThisRegExp);
        });
    });
});
