import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1474
//
describe('Issue #1474', () => {
    describe('Directives should be emitted with their original raw value', () => {
        describe('Variant #1: escaped `use strict` in a function directive prologue', () => {
            const code: string = `
                function f() {
                    "use\\x20strict";
                    return this === undefined;
                }
                return f();
            `;

            let obfuscatedCode: string;
            let result: unknown;

            before(() => {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET
                }).getObfuscatedCode();

                result = new Function(obfuscatedCode)();
            });

            it('should keep the escape sequence of the directive', () => {
                assert.match(obfuscatedCode, /"use\\x20strict";/);
            });

            it('should not enable strict mode', () => {
                assert.strictEqual(result, false);
            });
        });

        describe('Variant #2: escaped `use strict` in a program directive prologue', () => {
            const code: string = `
                'use\\u0020strict';
                function f() {
                    return this === undefined;
                }
                return f();
            `;

            let obfuscatedCode: string;
            let result: unknown;

            before(() => {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }).getObfuscatedCode();

                result = new Function(obfuscatedCode)();
            });

            it('should keep the escape sequence of the directive', () => {
                assert.match(obfuscatedCode, /^'use\\u0020strict';/);
            });

            it('should not enable strict mode', () => {
                assert.strictEqual(result, false);
            });
        });
    });
});
