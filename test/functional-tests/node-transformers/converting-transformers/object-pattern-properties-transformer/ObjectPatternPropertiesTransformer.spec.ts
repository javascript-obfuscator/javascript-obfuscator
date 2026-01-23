import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';
import { evalLocal } from '../../../../helpers/evalLocal';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ObjectPatternPropertiesTransformer', () => {
    describe('Variant #1: function scope', () => {
        describe('Variant #1: `renameGlobals` option is disabled', () => {
            const regExp: RegExp = new RegExp(
                'const { *' +
                    'foo: *_0x([a-f0-9]){4,6}, *' +
                    'bar: *_0x([a-f0-9]){4,6}, *' +
                    '..._0x([a-f0-9]){4,6}' +
                    '} *= *{}; *' +
                    "console\\['log']\\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\\);"
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/function-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    renameGlobals: false
                }).getObfuscatedCode();
            });

            it('should transform object properties', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: `renameGlobals` option is enabled', () => {
            const regExp: RegExp = new RegExp(
                'const { *' +
                    'foo: *_0x([a-f0-9]){4,6}, *' +
                    'bar: *_0x([a-f0-9]){4,6}, *' +
                    '..._0x([a-f0-9]){4,6}' +
                    '} *= *{}; *' +
                    "console\\['log']\\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\\);"
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/function-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    renameGlobals: true
                }).getObfuscatedCode();
            });

            it('should transform object properties', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #3: issue 781. Wrong parentize of cloned `propertyNode` value', () => {
            const regExp: RegExp = new RegExp(
                'const { *' +
                    'foo: *_0x([a-f0-9]){4,6}, *' +
                    'bar: *_0x([a-f0-9]){4,6} *' +
                    '} *= *{}; *' +
                    'const _0x([a-f0-9]){4,6} *= *{};' +
                    "_0x([a-f0-9]){4,6}\\['prop'] *= *0x1;" +
                    'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6};'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/function-scope-wrong-parentize.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    renameGlobals: false,
                    transformObjectKeys: true
                }).getObfuscatedCode();
            });

            it('should transform object properties', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });

    describe('Variant #2: global scope', () => {
        describe('Variant #1: `renameGlobals` option is disabled', () => {
            const regExp: RegExp = new RegExp(
                'const { *' +
                    'foo, *' +
                    'bar, *' +
                    '...rest' +
                    '} *= *{}; *' +
                    "console\\['log']\\(foo, *bar, *rest\\);"
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/global-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    renameGlobals: false
                }).getObfuscatedCode();
            });

            it('should transform object properties', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: `renameGlobals` option is enabled', () => {
            const regExp: RegExp = new RegExp(
                'const { *' +
                    'foo: *_0x([a-f0-9]){4,6}, *' +
                    'bar: *_0x([a-f0-9]){4,6}, *' +
                    '..._0x([a-f0-9]){4,6}' +
                    '} *= *{}; *' +
                    "console\\['log']\\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\\);"
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/global-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    renameGlobals: true
                }).getObfuscatedCode();
            });

            it('should transform object properties', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });

    describe('Variant #3: destructuring default parameter with var shadowing', () => {
        describe('Variant #1: destructuring default should reference outer var, not inner var', () => {
            const code = `
                (function() {
                    var x = 'outer';
                    function f({ a = x } = {}) {
                        var x = 'inner';
                        return a;
                    }
                    return f();
                })();
            `;

            let obfuscatedCode: string;

            before(() => {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET
                }).getObfuscatedCode();
            });

            it('should correctly resolve destructuring default to outer variable', () => {
                // Default parameter `a = x` should use outer 'x' value ('outer'),
                // NOT the inner var x = 'inner' which is in the function body scope
                assert.equal(evalLocal(code), 'outer');
                assert.equal(evalLocal(obfuscatedCode), evalLocal(code));
            });
        });

        describe('Variant #2: nested destructuring default should reference outer var', () => {
            const code = `
                (function() {
                    var x = 'outer';
                    function f({ a: { b = x } } = { a: {} }) {
                        var x = 'inner';
                        return b;
                    }
                    return f();
                })();
            `;

            let obfuscatedCode: string;

            before(() => {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET
                }).getObfuscatedCode();
            });

            it('should correctly resolve nested destructuring default to outer variable', () => {
                assert.equal(evalLocal(code), 'outer');
                assert.equal(evalLocal(obfuscatedCode), evalLocal(code));
            });
        });

        describe('Variant #3: simple default param with var shadow', () => {
            const code = `
                (function() {
                    var x = 'outer';
                    function f(a = x) {
                        var x = 'inner';
                        return a;
                    }
                    return f();
                })();
            `;

            let obfuscatedCode: string;

            before(() => {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET
                }).getObfuscatedCode();
            });

            it('should correctly resolve default param to outer variable', () => {
                assert.equal(evalLocal(code), 'outer');
                assert.equal(evalLocal(obfuscatedCode), evalLocal(code));
            });
        });
    });
});
