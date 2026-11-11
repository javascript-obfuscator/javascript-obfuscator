import { assert } from 'chai';
import * as vm from 'vm';

import { TInputOptions } from '../../../src/types/options/TInputOptions';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1475
//
describe('Issue #1475', function () {
    this.timeout(60000);

    describe('Custom code helpers should not be placed before the directive prologue', () => {
        const samplesCount: number = 10;

        const codeSamples: { name: string; code: string }[] = [
            {
                name: 'function scope',
                code: `
                    function f() {
                        'use strict';
                        return this === undefined;
                    }
                    var result = f();
                `
            },
            {
                name: 'function scope with multiple directives',
                code: `
                    function f() {
                        'ngInject';
                        'use strict';
                        return this === undefined;
                    }
                    var result = f();
                `
            },
            {
                name: 'program scope',
                // no functions, so custom code helpers are placed in the program scope
                code: `
                    'use strict';
                    var result;
                    try {
                        undeclaredVariable1475 = 1;
                        result = false;
                    } catch (error) {
                        result = error instanceof ReferenceError;
                    }
                `
            }
        ];

        const optionsSamples: { name: string; options: TInputOptions }[] = [
            { name: 'selfDefending', options: { selfDefending: true } },
            { name: 'disableConsoleOutput', options: { disableConsoleOutput: true } },
            { name: 'debugProtection', options: { debugProtection: true } }
        ];

        codeSamples.forEach(({ name: codeName, code }) => {
            optionsSamples.forEach(({ name: optionsName, options }) => {
                describe(`Variant: ${codeName}, \`${optionsName}\``, () => {
                    const results: unknown[] = [];

                    before(() => {
                        for (let i = 0; i < samplesCount; i++) {
                            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                ...options,
                                seed: i + 1
                            }).getObfuscatedCode();

                            const context: { result?: unknown } = {};

                            vm.runInNewContext(obfuscatedCode, context, { timeout: 10000 });

                            results.push(context.result);
                        }
                    });

                    it('should keep strict mode enabled', () => {
                        results.forEach((result: unknown) => assert.strictEqual(result, true));
                    });
                });
            });
        });
    });
});
