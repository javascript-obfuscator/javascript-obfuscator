import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1456
//
describe('Issue #1456', () => {
    describe('`controlFlowFlattening` should keep short-circuit evaluation of logical expressions', () => {
        const samples: { name: string; code: string; expectedResult: unknown }[] = [
            {
                name: 'Variant #1: `&&` with object expression that reads property of falsy left operand',
                code: 'function size(img) { return img && { width: img.width }; } return size(null);',
                expectedResult: null
            },
            {
                name: 'Variant #2: `&&` with identifier in temporal dead zone',
                code: 'function pick(ready) { return ready && late; } var result = pick(false); let late = 1; return result;',
                expectedResult: false
            },
            {
                name: 'Variant #3: `&&` with undeclared global identifier',
                code: 'function pick(ready) { return ready && undeclaredGlobal1456; } return pick(false);',
                expectedResult: false
            },
            {
                name: 'Variant #4: `||` with side effect inside object expression',
                code: 'var count = 0; function next(seen) { return seen || { n: ++count }; } next(true); return count;',
                expectedResult: 0
            },
            {
                name: 'Variant #5: `??` with unary expression over identifier in temporal dead zone',
                code: 'function pick(value) { return value ?? !late; } var result = pick(1); let late = 1; return result;',
                expectedResult: 1
            }
        ];

        samples.forEach(({ name, code, expectedResult }) => {
            describe(name, () => {
                let result: unknown;

                before(() => {
                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }).getObfuscatedCode();

                    result = new Function(obfuscatedCode)();
                });

                it('should not evaluate the skipped right operand', () => {
                    assert.strictEqual(result, expectedResult);
                });
            });
        });
    });
});
