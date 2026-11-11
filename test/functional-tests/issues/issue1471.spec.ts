import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1471
//
describe('Issue #1471', () => {
    describe('Custom nodes should not change the kind of variable declarations of the embedded original code', () => {
        const perIterationBinding: string = `
            var fs = [];
            for (var i = 0; i < 3; i++) {
                let j = i;
                const k = j;
                fs.push(() => k);
            }
            return fs.map((g) => g()).join();
        `;
        const expectedResult: string = '0,1,2';
        const samplesCount: number = 20;

        const samples: { name: string; code: string }[] = [
            {
                name: 'Variant #1: function passed as an argument of a call expression',
                code: `
                    function main() {
                        var run = (f) => f();
                        return run(() => {
                            ${perIterationBinding}
                        });
                    }
                    return main();
                `
            },
            {
                name: 'Variant #2: function as an operand of a binary expression',
                code: `
                    function main() {
                        var prefix = '';
                        return prefix + (() => {
                            ${perIterationBinding}
                        })();
                    }
                    return main();
                `
            },
            {
                name: 'Variant #3: function inside a flattened block statement',
                code: `
                    function main() {
                        var a = 1;
                        var b = 2;
                        var result;
                        var n = 0;
                        while (n++ < 1) {
                            result = (function () {
                                ${perIterationBinding}
                            })();
                        }
                        var c = 3;
                        return result;
                    }
                    return main();
                `
            }
        ];

        samples.forEach(({ name, code }) => {
            describe(name, () => {
                const results: unknown[] = [];

                before(() => {
                    for (let i = 0; i < samplesCount; i++) {
                        const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 1,
                            seed: i + 1
                        }).getObfuscatedCode();

                        results.push(new Function(obfuscatedCode)());
                    }
                });

                it('should keep per-iteration `let` and `const` bindings', () => {
                    results.forEach((result: unknown) => assert.strictEqual(result, expectedResult));
                });
            });
        });
    });
});
