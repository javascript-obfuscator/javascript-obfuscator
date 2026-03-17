import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('BuiltinsObfuscationTransformer', () => {
    describe('obfuscateBuiltins option is enabled', () => {
        describe('Variant #1: basic built-in identifiers', () => {
            const consoleRegExp: RegExp = /globalThis\['console'\]/;
            const mathRegExp: RegExp = /globalThis\['Math'\]/;
            const jsonRegExp: RegExp = /globalThis\['JSON'\]/;
            const objectRegExp: RegExp = /globalThis\['Object'\]/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/basic-builtins.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    obfuscateBuiltins: true
                }).getObfuscatedCode();
            });

            it('should replace console with globalThis access', () => {
                assert.match(obfuscatedCode, consoleRegExp);
            });

            it('should replace Math with globalThis access', () => {
                assert.match(obfuscatedCode, mathRegExp);
            });

            it('should replace JSON with globalThis access', () => {
                assert.match(obfuscatedCode, jsonRegExp);
            });

            it('should replace Object with globalThis access', () => {
                assert.match(obfuscatedCode, objectRegExp);
            });
        });

        describe('Variant #2: should not transform shadowed built-in (variable declaration)', () => {
            const customConsoleRegExp: RegExp = /var console *=/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/shadowed-builtins.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    obfuscateBuiltins: true
                }).getObfuscatedCode();
            });

            it('should preserve user-defined console variable declaration', () => {
                assert.match(obfuscatedCode, customConsoleRegExp);
            });
        });

        describe('Variant #3: should not transform property access identifiers', () => {
            const propertyArrayRegExp: RegExp = /obj\['Array'\]/;
            const propertyMathRegExp: RegExp = /obj\['Math'\]/;
            const noGlobalThisArrayRegExp: RegExp = /globalThis\['Array'\]/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/property-access.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    obfuscateBuiltins: true
                }).getObfuscatedCode();
            });

            it('should transform property .Array to computed [\'Array\'] via MemberExpressionTransformer', () => {
                assert.match(obfuscatedCode, propertyArrayRegExp);
            });

            it('should transform property .Math to computed [\'Math\'] via MemberExpressionTransformer', () => {
                assert.match(obfuscatedCode, propertyMathRegExp);
            });

            it('should not add globalThis for Array when used as a property', () => {
                assert.notMatch(obfuscatedCode, noGlobalThisArrayRegExp);
            });
        });

        describe('Variant #4: reserved names exclusion', () => {
            const consoleRegExp: RegExp = /globalThis\['console'\]/;
            const mathDirectRegExp: RegExp = /\bMath\b/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/reserved-names.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    obfuscateBuiltins: true,
                    reservedNames: ['^Math$']
                }).getObfuscatedCode();
            });

            it('should obfuscate console (not reserved)', () => {
                assert.match(obfuscatedCode, consoleRegExp);
            });

            it('should preserve Math (reserved)', () => {
                assert.match(obfuscatedCode, mathDirectRegExp);
            });
        });
    });

    describe('obfuscateBuiltins option is disabled', () => {
        const consoleDirectRegExp: RegExp = /\bconsole\b/;
        const noGlobalThisRegExp: RegExp = /globalThis\['console'\]/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/disabled-option.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                obfuscateBuiltins: false
            }).getObfuscatedCode();
        });

        it('should keep console as direct identifier', () => {
            assert.match(obfuscatedCode, consoleDirectRegExp);
        });

        it('should not add globalThis access', () => {
            assert.notMatch(obfuscatedCode, noGlobalThisRegExp);
        });
    });
});
