import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ApiCallsObfuscationTransformer', () => {
    describe('obfuscateApiCalls option is enabled', () => {
        describe('Variant #1: DOM API calls (calls-only mode, default)', () => {
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

        describe('Variant #3: calls-only mode should NOT transform non-call bracket access', () => {
            const noGlobalThisDocumentRegExp: RegExp = /globalThis\['document'\]/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/bracket-access.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    obfuscateApiCalls: true,
                    obfuscateApiCallsMode: 'calls-only'
                }).getObfuscatedCode();
            });

            it('should NOT transform document in non-call bracket access with calls-only mode', () => {
                assert.notMatch(obfuscatedCode, noGlobalThisDocumentRegExp);
            });
        });

        describe('Variant #4: all-access mode should transform bracket notation property read', () => {
            const documentRegExp: RegExp = /globalThis\['document'\]/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/bracket-access.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    obfuscateApiCalls: true,
                    obfuscateApiCallsMode: 'all-access'
                }).getObfuscatedCode();
            });

            it('should replace document with globalThis access in bracket notation read', () => {
                assert.match(obfuscatedCode, documentRegExp);
            });
        });

        describe('Variant #5: all-access mode should transform dot notation property read (no call)', () => {
            const documentRegExp: RegExp = /globalThis\['document'\]/;
            const navigatorRegExp: RegExp = /globalThis\['navigator'\]/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/dot-access-no-call.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    obfuscateApiCalls: true,
                    obfuscateApiCallsMode: 'all-access'
                }).getObfuscatedCode();
            });

            it('should replace document with globalThis access in dot notation read', () => {
                assert.match(obfuscatedCode, documentRegExp);
            });

            it('should replace navigator with globalThis access in dot notation read', () => {
                assert.match(obfuscatedCode, navigatorRegExp);
            });
        });

        describe('Variant #6: all-access mode should still handle API calls', () => {
            const documentRegExp: RegExp = /globalThis\['document'\]/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/dom-api-calls.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    obfuscateApiCalls: true,
                    obfuscateApiCallsMode: 'all-access'
                }).getObfuscatedCode();
            });

            it('should still transform document in API calls with all-access mode', () => {
                assert.match(obfuscatedCode, documentRegExp);
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

    describe('obfuscateApiCallsMode ignored when obfuscateApiCalls is false', () => {
        const noGlobalThisRegExp: RegExp = /globalThis\['document'\]/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/dot-access-no-call.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                obfuscateApiCalls: false,
                obfuscateApiCallsMode: 'all-access'
            }).getObfuscatedCode();
        });

        it('should NOT transform when obfuscateApiCalls is false even with all-access mode', () => {
            assert.notMatch(obfuscatedCode, noGlobalThisRegExp);
        });
    });
});
