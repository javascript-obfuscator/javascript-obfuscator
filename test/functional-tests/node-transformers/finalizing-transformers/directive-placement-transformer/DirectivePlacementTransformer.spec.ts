import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getStringArrayRegExp } from '../../../../helpers/get-string-array-regexp';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('DirectivePlacementTransformer', function () {
    this.timeout(120000);

    describe('Variant #1: program scope', () => {
        describe('Variant #1: directive at the top of program scope', () => {
            const directiveRegExp: RegExp = new RegExp(
                '^\'use strict\';.*' +
                getStringArrayRegExp(['test']).source
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/top-of-program-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should keep directive at the top of program scope', () => {
                assert.match(obfuscatedCode, directiveRegExp);
            });
        });

        describe('Variant #2: directive-like string literal at the middle of program scope', () => {
            const stringArrayStorageRegExp: RegExp = getStringArrayRegExp(['test', 'use\\\\x20strict']);
            const directiveRegExp: RegExp = new RegExp(
                'var test *= *_0x([a-f0-9]){4}\\(0x0\\);.*' +
                '_0x([a-f0-9]){4}\\(0x1\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/middle-of-program-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should add directive-like string literal to the string array', () => {
                assert.match(obfuscatedCode, stringArrayStorageRegExp);
            });

            it('should add call to the directive-like string literal from the string array', () => {
                assert.match(obfuscatedCode, directiveRegExp);
            });
        });
    });

    describe('Variant #2: function declaration scope', () => {
        describe('Variant #1: directive at the top of function declaration scope', () => {
            const directiveRegExp: RegExp = new RegExp(
                'function test\\(\\) *{ *' +
                    '\'use strict\'; *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4}; *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x0\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/top-of-function-declaration-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayWrappersCount: 1
                    }
                ).getObfuscatedCode();
            });

            it('should keep directive at the top of function declaration scope', () => {
                assert.match(obfuscatedCode, directiveRegExp);
            });
        });

        describe('Variant #2: directive-like string literal at the middle of function-declaration scope', () => {
            const directiveRegExp: RegExp = new RegExp(
                'function test\\(\\) *{ *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4}; *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x0\\);' +
                    '_0x([a-f0-9]){4,6}\\(0x1\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/middle-of-function-declaration-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayWrappersCount: 1
                    }
                ).getObfuscatedCode();
            });

            it('should keep directive-like string literal at the middle of function declaration scope', () => {
                assert.match(obfuscatedCode, directiveRegExp);
            });
        })
    });

    describe('Variant #3: function expression scope', () => {
        describe('Variant #1: directive at the top of function expression scope', () => {
            const directiveRegExp: RegExp = new RegExp(
                'var test *= *function *\\(\\) *{ *' +
                    '\'use strict\'; *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4}; *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x0\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/top-of-function-expression-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayWrappersCount: 1
                    }
                ).getObfuscatedCode();
            });

            it('should keep directive at the top of function expression scope', () => {
                assert.match(obfuscatedCode, directiveRegExp);
            });
        });

        describe('Variant #2: directive-like string literal at the middle of function-expression scope', () => {
            const directiveRegExp: RegExp = new RegExp(
                'var test *= *function *\\(\\) *{ *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4}; *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x0\\);' +
                    '_0x([a-f0-9]){4,6}\\(0x1\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/middle-of-function-expression-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayWrappersCount: 1
                    }
                ).getObfuscatedCode();
            });

            it('should keep directive-like string literal at the middle of function expression scope', () => {
                assert.match(obfuscatedCode, directiveRegExp);
            });
        })
    });

    describe('Variant #4: arrow function expression scope', () => {
        describe('Variant #1: directive at the top of arrow function expression scope', () => {
            const directiveRegExp: RegExp = new RegExp(
                'var test *= *\\(\\) *=> *{ *' +
                    '\'use strict\'; *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4}; *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x0\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/top-of-arrow-function-expression-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayWrappersCount: 1
                    }
                ).getObfuscatedCode();
            });

            it('should keep directive at the top of arrow function expression scope', () => {
                assert.match(obfuscatedCode, directiveRegExp);
            });
        });

        describe('Variant #2: directive-like string literal at the middle of arrow function-expression scope', () => {
            const directiveRegExp: RegExp = new RegExp(
                'var test *= *\\(\\) *=> *{ *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4}; *' +
                    'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x0\\);' +
                    '_0x([a-f0-9]){4,6}\\(0x1\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/middle-of-arrow-function-expression-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayWrappersCount: 1
                    }
                ).getObfuscatedCode();
            });

            it('should keep directive-like string literal at the middle of arrow function expression scope', () => {
                assert.match(obfuscatedCode, directiveRegExp);
            });
        })
    });
});
