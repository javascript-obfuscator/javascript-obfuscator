import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1477
//
describe('Issue #1477', () => {
    describe('Transformed template literals should convert substitutions with `ToString`', () => {
        const samples: { name: string; code: string; expectedResult: unknown }[] = [
            {
                name: 'Variant #1: object with `valueOf` and `toString`',
                code: `
                    var when = { valueOf() { return 1700000000000; }, toString() { return 'Tue Nov 14 2023'; } };
                    return \`Today: \${when}\`;
                `,
                expectedResult: 'Today: Tue Nov 14 2023'
            },
            {
                name: 'Variant #2: object with `Symbol.toPrimitive`',
                code: `
                    var value = { [Symbol.toPrimitive](hint) { return hint; } };
                    return \`\${value}|\${value}\`;
                `,
                expectedResult: 'string|string'
            },
            {
                name: 'Variant #3: substitution is the first part of the template literal',
                code: `
                    var value = { valueOf() { return 1; }, toString() { return 'a'; } };
                    return \`\${value}\${value}b\`;
                `,
                expectedResult: 'aab'
            },
            {
                name: 'Variant #4: evaluation and conversion order of substitutions',
                code: `
                    var log = [];
                    var make = (name) => ({ toString() { log.push('toString ' + name); return name; } });
                    var get = (name) => { log.push('get ' + name); return make(name); };
                    var result = \`\${get('a')}-\${get('b')}\`;
                    return result + ':' + log.join(',');
                `,
                expectedResult: 'a-b:get a,toString a,get b,toString b'
            },
            {
                name: 'Variant #5: symbol substitution should throw',
                code: `
                    try {
                        return \`\${Symbol('foo')}\`;
                    } catch (error) {
                        return error instanceof TypeError;
                    }
                `,
                expectedResult: true
            }
        ];

        samples.forEach(({ name, code, expectedResult }) => {
            describe(name, () => {
                let result: unknown;

                before(() => {
                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }).getObfuscatedCode();

                    result = new Function(obfuscatedCode)();
                });

                it('should return the same result as the original code', () => {
                    assert.strictEqual(result, expectedResult);
                });
            });
        });
    });
});
