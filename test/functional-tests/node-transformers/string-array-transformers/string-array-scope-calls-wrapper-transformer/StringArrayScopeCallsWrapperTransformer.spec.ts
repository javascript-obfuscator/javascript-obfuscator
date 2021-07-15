import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { StringArrayEncoding } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayIndexesType } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayIndexesType';
import { StringArrayWrappersType } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';
import { checkCodeEvaluation } from '../../../../helpers/checkCodeEvaluation';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayScopeCallsWrapperTransformer', function () {
    this.timeout(120000);

    describe('Variant #1: base', () => {
        describe('Variant #1: root scope', () => {
            describe('Variant #1: option value is lower then count `literal` nodes in the scope', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    '(?<!const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                    '(const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};(function .*)?){2}' +
                    '(?!const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                    'const foo *= *_0x([a-f0-9]){4,6}\\(0x0\\);.*' +
                    'const bar *= *_0x([a-f0-9]){4,6}\\(0x1\\);.*' +
                    'const baz *= *_0x([a-f0-9]){4,6}\\(0x2\\);'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 2
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });

            describe('Variant #2: option value is bigger then count `literal` nodes in the scope', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    '(?<!const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                    '(const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};(function .*)?){3}' +
                    '(?!const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                    'const foo *= *_0x([a-f0-9]){4,6}\\(0x0\\);.*' +
                    'const bar *= *_0x([a-f0-9]){4,6}\\(0x1\\);.*' +
                    'const baz *= *_0x([a-f0-9]){4,6}\\(0x2\\);'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 5
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });

            describe('Variant #3: correct wrappers order', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'const f *= *b;.*' +
                    'const g *= *b;.*' +
                    'const foo *= *[f|g]\\(0x0\\);.*' +
                    'const bar *= *[f|g]\\(0x1\\);.*' +
                    'const baz *= *[f|g]\\(0x2\\);'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 2
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });

            describe('Variant #4: `identifiersPrefix` option is set', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'const foo_d *= *foo_b;.*' +
                    'const foo_e *= *foo_b;.*' +
                    'const foo *= *foo_[d|e]\\(0x0\\);.*' +
                    'const bar *= *foo_[d|e]\\(0x1\\);.*' +
                    'const baz *= *foo_[d|e]\\(0x2\\);'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            identifiersPrefix: 'foo_',
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 2
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });
        });

        describe('Variant #2: function scope', () => {
            describe('Variant #1: option value is lower then count `literal` nodes in the scope', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'function test *\\( *\\) *{' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x3\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x4\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x5\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 2
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });

            describe('Variant #2: option value is bigger then count `literal` nodes in the scope', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'function test *\\(\\) *{' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x3\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x4\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x5\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 5
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });

            describe('Variant #3: correct wrappers order', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'function test *\\( *\\) *{' +
                        'const h *= *b;' +
                        'const i *= *b;' +
                        'const c *= *[h|i]\\(0x3\\);' +
                        'const d *= *[h|i]\\(0x4\\);' +
                        'const e *= *[h|i]\\(0x5\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 2
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });

            describe('Variant #4: correct wrapper for the function default parameter', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'const e *= *b;.*' +
                    'const foo *= *e\\(0x0\\);.*' +
                    'function test *\\(c *= *e\\(0x1\\)\\) *{' +
                        'const f *= *b;' +
                        'const d *= *f\\(0x2\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrapper-for-the-function-default-parameter.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });

            describe('Variant #5: `identifiersPrefix` option is set', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'function test *\\( *\\) *{' +
                        'const f *= *foo_b;' +
                        'const g *= *foo_b;' +
                        'const a *= *[f|g]\\(0x3\\);' +
                        'const b *= *[f|g]\\(0x4\\);' +
                        'const c *= *[f|g]\\(0x5\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            identifiersPrefix: 'foo_',
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 2
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });
        });

        describe('Variant #3: prohibited scopes', () => {
            describe('Variant #1: if statement scope', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'var c *= *b;.*' +
                    'if *\\(!!\\[]\\) *{' +
                        'var foo *= *c\\(0x0\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/prohibited-scope-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should not add scope calls wrappers to a prohibited scope', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });

            describe('Variant #2: arrow function scope without statements', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'var c *= *b;.*' +
                    '\\[]\\[c\\(0x0\\)]\\(\\(\\) *=> *c\\(0x1\\)\\);'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/prohibited-scope-2.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersCount: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should not add scope calls wrappers to a prohibited scope', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });
        });

        describe('Variant #4: prevailing kind of variables', () => {
            const stringArrayCallRegExp: RegExp = new RegExp(
                '(?<!var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                '(var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};(function .*)?){2}' +
                '(?!var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                'var foo *= *_0x([a-f0-9]){4,6}\\(0x0\\);.*' +
                'var bar *= *_0x([a-f0-9]){4,6}\\(0x1\\);.*' +
                'var baz *= *_0x([a-f0-9]){4,6}\\(0x2\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-var.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayWrappersCount: 2
                    }
                ).getObfuscatedCode();
            });

            it('should add scope calls wrappers with a correct variables kind', () => {
                assert.match(obfuscatedCode, stringArrayCallRegExp);
            });
        });

        describe('Variant #5: correct evaluation of the scope calls wrappers', () => {
            const expectedEvaluationResult: string = 'aaabbbcccdddeee';
            let evaluationResult: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-eval.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayWrappersCount: 5
                    }
                ).getObfuscatedCode();

                evaluationResult = eval(obfuscatedCode);
            });

            it('should correctly evaluate scope calls wrappers', () => {
                assert.equal(evaluationResult, expectedEvaluationResult);
            });
        });

        describe('Variant #6: `stringArrayWrappersChainedCalls` option is enabled', () => {
            describe('Variant #1: correct chained calls', () => {
                describe('Variant #1: `Mangled` identifier names generator', () => {
                    const stringArrayCallRegExp: RegExp = new RegExp(
                        'const q *= *b;.*' +
                        'const foo *= *q\\(0x0\\);.*' +
                        'function test\\(c, *d\\) *{' +
                            'const r *= *q;' +
                            'const e *= *r\\(0x1\\);' +
                            'const f *= *r\\(0x2\\);' +
                            'function g\\(h, *i\\) *{' +
                                'const s *= *r;' +
                                'const j *= *s\\(0x3\\);' +
                                'const k *= *s\\(0x4\\);' +
                                'function l\\(m, *n *\\) *{' +
                                    'const t *= *s;' +
                                    'const o *= *t\\(0x3\\);' +
                                    'const p *= *t\\(0x4\\);' +
                                    'return o *\\+ *p;' +
                                '}' +
                                'return j *\\+ *k;' +
                            '}' +
                            'return e *\\+ *f *\\+ *g\\(\\);' +
                        '}'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/chained-calls-1.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                stringArray: true,
                                stringArrayThreshold: 1,
                                stringArrayWrappersChainedCalls: true,
                                stringArrayWrappersCount: 1
                            }
                        ).getObfuscatedCode();
                    });

                    it('should add correct scope calls wrappers', () => {
                        assert.match(obfuscatedCode, stringArrayCallRegExp);
                    });
                });
            });

            describe('Variant #2: correct evaluation of the string array wrappers chained calls', () => {
                describe('Variant #1: base', () => {
                    describe('Variant #1: `Hexadecimal` identifier names generator', () => {
                        const samplesCount: number = 50;
                        const expectedEvaluationResult: string = 'aaabbbcccdddeee';
                        let isEvaluationSuccessful: boolean = true;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/chained-calls-1.js');

                            for (let i = 0; i < samplesCount; i++) {
                                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                                    code,
                                    {
                                        ...NO_ADDITIONAL_NODES_PRESET,
                                        identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
                                        stringArray: true,
                                        stringArrayThreshold: 1,
                                        stringArrayEncoding: [
                                            StringArrayEncoding.None,
                                            StringArrayEncoding.Rc4
                                        ],
                                        stringArrayWrappersChainedCalls: true,
                                        stringArrayWrappersCount: 5
                                    }
                                ).getObfuscatedCode();

                                const evaluationResult: string = eval(obfuscatedCode);

                                if (evaluationResult !== expectedEvaluationResult) {
                                    isEvaluationSuccessful = false;
                                    break;
                                }
                            }
                        });

                        it('should correctly evaluate string array wrappers chained calls', () => {
                            assert.equal(isEvaluationSuccessful, true);
                        });
                    });

                    describe('Variant #2: `Mangled` identifier names generator', () => {
                        const samplesCount: number = 50;
                        const expectedEvaluationResult: string = 'aaabbbcccdddeee';
                        let isEvaluationSuccessful: boolean = true;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/chained-calls-1.js');

                            for (let i = 0; i < samplesCount; i++) {
                                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                                    code,
                                    {
                                        ...NO_ADDITIONAL_NODES_PRESET,
                                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                        stringArray: true,
                                        stringArrayThreshold: 1,
                                        stringArrayEncoding: [
                                            StringArrayEncoding.None,
                                            StringArrayEncoding.Rc4
                                        ],
                                        stringArrayWrappersChainedCalls: true,
                                        stringArrayWrappersCount: 5
                                    }
                                ).getObfuscatedCode();

                                const evaluationResult: string = eval(obfuscatedCode);

                                if (evaluationResult !== expectedEvaluationResult) {
                                    isEvaluationSuccessful = false;
                                    break;
                                }
                            }
                        });

                        it('should correctly evaluate string array wrappers chained calls', () => {
                            assert.equal(isEvaluationSuccessful, true);
                        });
                    });
                });

                describe('Variant #2: advanced', () => {
                    describe('Variant #1: `Hexadecimal` identifier names generator', () => {
                        const samplesCount: number = 50;
                        const expectedEvaluationResult: string = 'aaabbbcccdddeee';
                        let isEvaluationSuccessful: boolean = true;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/chained-calls-2.js');

                            for (let i = 0; i < samplesCount; i++) {
                                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                                    code,
                                    {
                                        ...NO_ADDITIONAL_NODES_PRESET,
                                        identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
                                        stringArray: true,
                                        stringArrayThreshold: 1,
                                        stringArrayEncoding: [
                                            StringArrayEncoding.None,
                                            StringArrayEncoding.Rc4
                                        ],
                                        stringArrayWrappersChainedCalls: true,
                                        stringArrayWrappersCount: 5
                                    }
                                ).getObfuscatedCode();

                                const evaluationResult: string = eval(obfuscatedCode);

                                if (evaluationResult !== expectedEvaluationResult) {
                                    isEvaluationSuccessful = false;
                                    break;
                                }
                            }
                        });

                        it('should correctly evaluate string array wrappers chained calls', () => {
                            assert.equal(isEvaluationSuccessful, true);
                        });
                    });

                    describe('Variant #2: `Mangled` identifier names generator', () => {
                        const samplesCount: number = 50;
                        const expectedEvaluationResult: string = 'aaabbbcccdddeee';
                        let isEvaluationSuccessful: boolean = true;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/chained-calls-2.js');

                            for (let i = 0; i < samplesCount; i++) {
                                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                                    code,
                                    {
                                        ...NO_ADDITIONAL_NODES_PRESET,
                                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                        stringArray: true,
                                        stringArrayThreshold: 1,
                                        stringArrayEncoding: [
                                            StringArrayEncoding.None,
                                            StringArrayEncoding.Rc4
                                        ],
                                        stringArrayWrappersChainedCalls: true,
                                        stringArrayWrappersCount: 5
                                    }
                                ).getObfuscatedCode();

                                const evaluationResult: string = eval(obfuscatedCode);

                                if (evaluationResult !== expectedEvaluationResult) {
                                    isEvaluationSuccessful = false;
                                    break;
                                }
                            }
                        });

                        it('should correctly evaluate string array wrappers chained calls', () => {
                            assert.equal(isEvaluationSuccessful, true);
                        });
                    });
                });
            });
        });

        describe('Variant #7: `stringArrayWrappersType` option has `Function` value', () => {
            const evaluationSamplesCount: number = 500;
            const hexadecimalIndexMatch: string = '0x[a-z0-9]{1,3}';

            describe('Variant #1: base', () => {
                describe('Variant #1: `hexadecimal-number` indexes type', () => {
                    const getStringArrayCallsWrapperMatch = (stringArrayCallsWrapperName: string) =>
                        `function *${stringArrayCallsWrapperName} *\\(c, *d\\) *{` +
                            `return b\\([cd] *-(?: -)?${hexadecimalIndexMatch}, *[cd]\\);` +
                        '}';

                    const stringArrayScopeCallsWrapperRegExp1: RegExp = new RegExp(
                        'const a *= *\\[.*?];.*?' +
                        getStringArrayCallsWrapperMatch('f')
                    );
                    const stringArrayScopeCallsWrapperRegExp2: RegExp = new RegExp(
                        'const a *= *\\[.*?];.*?' +
                        'function test *\\( *\\) *{.*' +
                            `${getStringArrayCallsWrapperMatch('g')}.*?` +
                        '}'
                    );
                    const stringArrayCallsWrapperCallsRegExp: RegExp = new RegExp(
                        `const foo *= *f\\(-? *${hexadecimalIndexMatch}\\, *-? *${hexadecimalIndexMatch}\\);.*` +
                        `const bar *= *f\\(-? *${hexadecimalIndexMatch}\\, *-? *${hexadecimalIndexMatch}\\);.*` +
                        `const baz *= *f\\(-? *${hexadecimalIndexMatch}\\, *-? *${hexadecimalIndexMatch}\\);.*` +
                        'function test *\\( *\\) *{.*' +
                            `const c *= *g\\(-? *${hexadecimalIndexMatch}\\, *-? *${hexadecimalIndexMatch}\\);.*` +
                            `const d *= *g\\(-? *${hexadecimalIndexMatch}\\, *-? *${hexadecimalIndexMatch}\\);.*` +
                            `const e *= *g\\(-? *${hexadecimalIndexMatch}\\, *-? *${hexadecimalIndexMatch}\\);.*` +
                        '}'
                    );

                    let obfuscatedCode: string;
                    let areSuccessEvaluations: boolean;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');
                        const getObfuscatedCode: () => string = () => JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                stringArray: true,
                                stringArrayIndexesType: [
                                    StringArrayIndexesType.HexadecimalNumber
                                ],
                                stringArrayThreshold: 1,
                                stringArrayWrappersChainedCalls: false,
                                stringArrayWrappersCount: 1,
                                stringArrayWrappersType: StringArrayWrappersType.Function
                            }
                        ).getObfuscatedCode();

                        obfuscatedCode = getObfuscatedCode();
                        areSuccessEvaluations = checkCodeEvaluation(
                            getObfuscatedCode,
                            evaluationSamplesCount
                        ).areSuccessEvaluations;
                    });

                    it('Match #1: should add correct scope calls wrapper 1', () => {
                        assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp1);
                    });

                    it('Match #2: should add correct scope calls wrapper 2', () => {
                        assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp2);
                    });

                    it('Match #3: should add correct scope calls wrappers calls', () => {
                        assert.match(obfuscatedCode, stringArrayCallsWrapperCallsRegExp);
                    });

                    it('should evaluate code without errors', () => {
                        assert.isTrue(areSuccessEvaluations);
                    });
                });

                describe('Variant #2: `hexadecimal-numeric-string` indexes type', () => {
                    const getStringArrayCallsWrapperMatch = (stringArrayCallsWrapperName: string) =>
                        `function *${stringArrayCallsWrapperName} *\\(c, *d\\) *{` +
                            `return b\\([cd] *-(?: -)?'${hexadecimalIndexMatch}', *[cd]\\);` +
                        '}';

                    const stringArrayScopeCallsWrapperRegExp1: RegExp = new RegExp(
                        'const a *= *\\[.*?];.*?' +
                        getStringArrayCallsWrapperMatch('f')
                    );
                    const stringArrayScopeCallsWrapperRegExp2: RegExp = new RegExp(
                        'const a *= *\\[.*?];.*?' +
                        'function test *\\( *\\) *{.*' +
                            `${getStringArrayCallsWrapperMatch('g')}.*?` +
                        '}'
                    );
                    const stringArrayCallsWrapperCallRegExp: RegExp = new RegExp(
                        `const foo *= *f\\(-? *'${hexadecimalIndexMatch}', *-? *'${hexadecimalIndexMatch}'\\);.*` +
                        `const bar *= *f\\(-? *'${hexadecimalIndexMatch}', *-? *'${hexadecimalIndexMatch}'\\);.*` +
                        `const baz *= *f\\(-? *'${hexadecimalIndexMatch}', *-? *'${hexadecimalIndexMatch}'\\);.*` +
                        'function test *\\( *\\) *{.*' +
                            `const c *= *g\\(-? *'${hexadecimalIndexMatch}', *-? *'${hexadecimalIndexMatch}'\\);.*` +
                            `const d *= *g\\(-? *'${hexadecimalIndexMatch}', *-? *'${hexadecimalIndexMatch}'\\);.*` +
                            `const e *= *g\\(-? *'${hexadecimalIndexMatch}', *-? *'${hexadecimalIndexMatch}'\\);.*` +
                        '}'
                    );

                    let obfuscatedCode: string;
                    let areSuccessEvaluations: boolean;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');
                        const getObfuscatedCode = () => JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                stringArray: true,
                                stringArrayIndexesType: [
                                    StringArrayIndexesType.HexadecimalNumericString
                                ],
                                stringArrayThreshold: 1,
                                stringArrayWrappersChainedCalls: false,
                                stringArrayWrappersCount: 1,
                                stringArrayWrappersType: StringArrayWrappersType.Function
                            }
                        ).getObfuscatedCode();

                        obfuscatedCode = getObfuscatedCode();
                        areSuccessEvaluations = checkCodeEvaluation(
                            getObfuscatedCode,
                            evaluationSamplesCount
                        ).areSuccessEvaluations;
                    });

                    it('Match #1: should add correct scope calls wrapper 1', () => {
                        assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp1);
                    });

                    it('Match #2: should add correct scope calls wrapper 2', () => {
                        assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp2);
                    });

                    it('Match #3: should add correct scope calls wrappers', () => {
                        assert.match(obfuscatedCode, stringArrayCallsWrapperCallRegExp);
                    });

                    it('should evaluate code without errors', () => {
                        assert.isTrue(areSuccessEvaluations);
                    });
                });
            });

            describe('Variant #2: correct chained calls', () => {
                const stringArrayScopeCallsWrapperRegExp1: RegExp = new RegExp(
                    'const a *= *\\[.*?];.*?' +
                    'function *f *\\(c, *d\\) *{' +
                        `return b\\([cd] *-(?: -)?${hexadecimalIndexMatch}, *[cd]\\);` +
                    '}.*'
                );
                const stringArrayScopeCallsWrapperRegExp2: RegExp = new RegExp(
                    'const a *= *\\[.*?];.*?' +
                    'function test *\\( *\\) *{.*' +
                        'function *g *\\(c, *d\\) *{' +
                            `return f\\(` +
                                // order of arguments depends on the parent wrapper parameters order
                                `[cd](?: *-(?: -)?${hexadecimalIndexMatch})?, *` +
                                `[cd](?: *-(?: -)?${hexadecimalIndexMatch})?` +
                            `\\);` +
                        '}.*' +
                    '}'
                );
                const stringArrayCallsWrapperCallRegExp: RegExp = new RegExp(
                    `const foo *= *f\\(-? *${hexadecimalIndexMatch}, *-? *${hexadecimalIndexMatch}\\);.*` +
                    `const bar *= *f\\(-? *${hexadecimalIndexMatch}, *-? *${hexadecimalIndexMatch}\\);.*` +
                    `const baz *= *f\\(-? *${hexadecimalIndexMatch}, *-? *${hexadecimalIndexMatch}\\);.*` +
                    'function test *\\( *\\) *{.*' +
                        `const c *= *g\\(-? *${hexadecimalIndexMatch}, *-? *${hexadecimalIndexMatch}\\);.*` +
                        `const d *= *g\\(-? *${hexadecimalIndexMatch}, *-? *${hexadecimalIndexMatch}\\);.*` +
                        `const e *= *g\\(-? *${hexadecimalIndexMatch}, *-? *${hexadecimalIndexMatch}\\);.*` +
                    '}'
                );

                let obfuscatedCode: string;
                let areSuccessEvaluations: boolean;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');
                    const getObfuscatedCode = () => JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersChainedCalls: true,
                            stringArrayWrappersCount: 1,
                            stringArrayWrappersType: StringArrayWrappersType.Function
                        }
                    ).getObfuscatedCode();

                    obfuscatedCode = getObfuscatedCode();
                    areSuccessEvaluations = checkCodeEvaluation(
                        getObfuscatedCode,
                        evaluationSamplesCount
                    ).areSuccessEvaluations;
                });

                it('Match #1: should add correct scope calls wrapper 1', () => {
                    assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp1);
                });

                it('Match #2: should add correct scope calls wrapper 2', () => {
                    assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp2);
                });

                it('Match #3: should add correct scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallsWrapperCallRegExp);
                });

                it('should evaluate code without errors', () => {
                    assert.isTrue(areSuccessEvaluations);
                });
            });

            describe('Variant #3: no wrappers on a root scope', () => {
                const stringArrayScopeCallsWrapperRegExp: RegExp = new RegExp(
                    'const a *= *\\[.*?];.*' +
                    'function test *\\( *\\) *{.*' +
                        'function *f*\\(c, *d\\) *{' +
                            `return b\\([cd] *-(?: -)?${hexadecimalIndexMatch}, *[cd]\\);` +
                        '}.*' +
                    '}'
                );
                const stringArrayCallsWrapperCallRegExp: RegExp = new RegExp(
                    '(?<!const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                    'function test *\\( *\\) *{.*' +
                        `const c *= *f\\(-? *${hexadecimalIndexMatch}, *-? *${hexadecimalIndexMatch}\\);.*` +
                        `const d *= *f\\(-? *${hexadecimalIndexMatch}, *-? *${hexadecimalIndexMatch}\\);.*` +
                        `const e *= *f\\(-? *${hexadecimalIndexMatch}, *-? *${hexadecimalIndexMatch}\\);.*` +
                    '}'
                );

                let obfuscatedCode: string;
                let areSuccessEvaluations: boolean;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const-no-root-wrappers.js');
                    const getObfuscatedCode = () => JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersChainedCalls: true,
                            stringArrayWrappersCount: 1,
                            stringArrayWrappersType: StringArrayWrappersType.Function
                        }
                    ).getObfuscatedCode();

                    obfuscatedCode = getObfuscatedCode();
                    areSuccessEvaluations = checkCodeEvaluation(
                        getObfuscatedCode,
                        evaluationSamplesCount
                    ).areSuccessEvaluations;
                });

                it('Match #1: should add correct scope calls wrapper', () => {
                    assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp);
                });

                it('Match #2: should add correct scope calls wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayCallsWrapperCallRegExp);
                });

                it('should evaluate code without errors', () => {
                    assert.isTrue(areSuccessEvaluations);
                });
            });

            describe('Variant #4: correct evaluation of the string array wrappers chained calls', () => {
                describe('Variant #1: base', () => {
                    describe('Variant #1: `Hexadecimal` identifier names generator', () => {
                        const samplesCount: number = 50;
                        const expectedEvaluationResult: string = 'aaabbbcccdddeee';
                        let isEvaluationSuccessful: boolean = true;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/chained-calls-1.js');

                            for (let i = 0; i < samplesCount; i++) {
                                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                                    code,
                                    {
                                        ...NO_ADDITIONAL_NODES_PRESET,
                                        identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
                                        stringArray: true,
                                        stringArrayThreshold: 1,
                                        stringArrayEncoding: [
                                            StringArrayEncoding.None
                                        ],
                                        stringArrayWrappersChainedCalls: true,
                                        stringArrayWrappersCount: 5,
                                        stringArrayWrappersType: StringArrayWrappersType.Function
                                    }
                                ).getObfuscatedCode();

                                const evaluationResult: string = eval(obfuscatedCode);

                                if (evaluationResult !== expectedEvaluationResult) {
                                    isEvaluationSuccessful = false;
                                    break;
                                }
                            }
                        });

                        it('should correctly evaluate string array wrappers chained calls', () => {
                            assert.equal(isEvaluationSuccessful, true);
                        });
                    });

                    describe('Variant #2: `Mangled` identifier names generator', () => {
                        const samplesCount: number = 50;
                        const expectedEvaluationResult: string = 'aaabbbcccdddeee';
                        let isEvaluationSuccessful: boolean = true;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/chained-calls-1.js');

                            for (let i = 0; i < samplesCount; i++) {
                                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                                    code,
                                    {
                                        ...NO_ADDITIONAL_NODES_PRESET,
                                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                        stringArray: true,
                                        stringArrayThreshold: 1,
                                        stringArrayEncoding: [
                                            StringArrayEncoding.None
                                        ],
                                        stringArrayWrappersChainedCalls: true,
                                        stringArrayWrappersCount: 5,
                                        stringArrayWrappersType: StringArrayWrappersType.Function
                                    }
                                ).getObfuscatedCode();

                                const evaluationResult: string = eval(obfuscatedCode);

                                if (evaluationResult !== expectedEvaluationResult) {
                                    isEvaluationSuccessful = false;
                                    break;
                                }
                            }
                        });

                        it('should correctly evaluate string array wrappers chained calls', () => {
                            assert.equal(isEvaluationSuccessful, true);
                        });
                    });
                });

                describe('Variant #2: advanced', () => {
                    describe('Variant #1: `Hexadecimal` identifier names generator', () => {
                        const samplesCount: number = 50;
                        const expectedEvaluationResult: string = 'aaabbbcccdddeee';
                        let isEvaluationSuccessful: boolean = true;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/chained-calls-2.js');

                            for (let i = 0; i < samplesCount; i++) {
                                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                                    code,
                                    {
                                        ...NO_ADDITIONAL_NODES_PRESET,
                                        identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
                                        stringArray: true,
                                        stringArrayThreshold: 1,
                                        stringArrayEncoding: [
                                            StringArrayEncoding.None,
                                            StringArrayEncoding.Rc4
                                        ],
                                        stringArrayWrappersChainedCalls: true,
                                        stringArrayWrappersCount: 5,
                                        stringArrayWrappersType: StringArrayWrappersType.Function
                                    }
                                ).getObfuscatedCode();

                                const evaluationResult: string = eval(obfuscatedCode);

                                if (evaluationResult !== expectedEvaluationResult) {
                                    isEvaluationSuccessful = false;
                                    break;
                                }
                            }
                        });

                        it('should correctly evaluate string array wrappers chained calls', () => {
                            assert.equal(isEvaluationSuccessful, true);
                        });
                    });

                    describe('Variant #2: `Mangled` identifier names generator', () => {
                        const samplesCount: number = 50;
                        const expectedEvaluationResult: string = 'aaabbbcccdddeee';
                        let isEvaluationSuccessful: boolean = true;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/chained-calls-2.js');

                            for (let i = 0; i < samplesCount; i++) {
                                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                                    code,
                                    {
                                        ...NO_ADDITIONAL_NODES_PRESET,
                                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                        stringArray: true,
                                        stringArrayThreshold: 1,
                                        stringArrayEncoding: [
                                            StringArrayEncoding.None,
                                            StringArrayEncoding.Rc4
                                        ],
                                        stringArrayWrappersChainedCalls: true,
                                        stringArrayWrappersCount: 5,
                                        stringArrayWrappersType: StringArrayWrappersType.Function
                                    }
                                ).getObfuscatedCode();

                                const evaluationResult: string = eval(obfuscatedCode);

                                if (evaluationResult !== expectedEvaluationResult) {
                                    isEvaluationSuccessful = false;
                                    break;
                                }
                            }
                        });

                        it('should correctly evaluate string array wrappers chained calls', () => {
                            assert.equal(isEvaluationSuccessful, true);
                        });
                    });
                });
            });

            describe('Variant #5: variable amount of the arguments', () => {
                describe('Variant #1: base', () => {
                    const stringArrayWrapperArgumentsRegExpString: string = Array(5)
                        .fill(`-? *${hexadecimalIndexMatch}`)
                        .join(', *');

                    const stringArrayScopeCallsWrapperRegExp1: RegExp = new RegExp(
                        'const a *= *\\[.*?];.*?' +
                        'function *f *\\(c, *d, *e, *h, *i\\) *{' +
                            `return b\\([cdehi] *-(?: -)?${hexadecimalIndexMatch}, *[cdehi]\\);` +
                        '}.*'
                    );
                    const stringArrayScopeCallsWrapperRegExp2: RegExp = new RegExp(
                        'const a *= *\\[.*?];.*?' +
                        'function test *\\( *\\) *{.*' +
                            'function *g *\\(c, *d, *e, *h, *i\\) *{' +
                                `return f\\(` +
                                    // order of arguments depends on the parent wrapper parameters order
                                    `[cdehi](?: *-(?: -)?${hexadecimalIndexMatch})?, *` +
                                    `[cdehi](?: *-(?: -)?${hexadecimalIndexMatch})?, *` +
                                    `[cdehi](?: *-(?: -)?${hexadecimalIndexMatch})?, *` +
                                    `[cdehi](?: *-(?: -)?${hexadecimalIndexMatch})?, *` +
                                    `[cdehi](?: *-(?: -)?${hexadecimalIndexMatch})?` +
                                `\\);` +
                            '}.*' +
                        '}'
                    );

                    const stringArrayCallsWrapperCallRegExp: RegExp = new RegExp(
                        `const foo *= *f\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                        `const bar *= *f\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                        `const baz *= *f\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                        'function test *\\( *\\) *{.*' +
                            `const c *= *g\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                            `const d *= *g\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                            `const e *= *g\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                        '}'
                    );

                    let obfuscatedCode: string;
                    let areSuccessEvaluations: boolean;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');
                        const getObfuscatedCode = () => JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                stringArray: true,
                                stringArrayThreshold: 1,
                                stringArrayWrappersChainedCalls: true,
                                stringArrayWrappersCount: 1,
                                stringArrayWrappersParametersMaxCount: 5,
                                stringArrayWrappersType: StringArrayWrappersType.Function
                            }
                        ).getObfuscatedCode();

                        obfuscatedCode = getObfuscatedCode();
                        areSuccessEvaluations = checkCodeEvaluation(
                            getObfuscatedCode,
                            evaluationSamplesCount
                        ).areSuccessEvaluations;
                    });

                    it('Match #1: should add correct scope calls wrapper 1', () => {
                        assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp1);
                    });

                    it('Match #2: should add correct scope calls wrapper 2', () => {
                        assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp2);
                    });

                    it('Match #3: should add correct scope calls wrappers', () => {
                        assert.match(obfuscatedCode, stringArrayCallsWrapperCallRegExp);
                    });

                    it('should evaluate code without errors', () => {
                        assert.isTrue(areSuccessEvaluations);
                    });
                });

                describe('Variant #2: `stringArrayEncoding` option is `rc4`', () => {
                    const stringArrayWrapperArgumentsRegExpString: string = Array(5)
                        .fill(`(?:-? *${hexadecimalIndexMatch}|(?:'.{4}'))`)
                        .join(', *');

                    const stringArrayScopeCallsWrapperRegExp1: RegExp = new RegExp(
                        'const a *= *\\[.*?];.*?' +
                        'function *f *\\(c, *d, *e, *h, *i\\) *{' +
                            `return b\\([cdehi] *-(?: -)?${hexadecimalIndexMatch}, *[cdehi]\\);` +
                        '}.*'
                    );
                    const stringArrayScopeCallsWrapperRegExp2: RegExp = new RegExp(
                        'const a *= *\\[.*?];.*?' +
                        'function test *\\( *\\) *{.*' +
                            'function *g *\\(c, *d, *e, *h, *i\\) *{' +
                                `return f\\(` +
                                    // order of arguments depends on the parent wrapper parameters order
                                    `[cdehi](?: *-(?: -)?${hexadecimalIndexMatch})?, *` +
                                    `[cdehi](?: *-(?: -)?${hexadecimalIndexMatch})?, *` +
                                    `[cdehi](?: *-(?: -)?${hexadecimalIndexMatch})?, *` +
                                    `[cdehi](?: *-(?: -)?${hexadecimalIndexMatch})?, *` +
                                    `[cdehi](?: *-(?: -)?${hexadecimalIndexMatch})?` +
                                `\\);` +
                            '}.*' +
                        '}'
                    );

                    const stringArrayCallsWrapperCallRegExp: RegExp = new RegExp(
                        `const foo *= *f\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                        `const bar *= *f\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                        `const baz *= *f\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                        'function test *\\( *\\) *{.*' +
                            `const c *= *g\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                            `const d *= *g\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                            `const e *= *g\\(${stringArrayWrapperArgumentsRegExpString}\\);.*` +
                        '}'
                    );

                    let obfuscatedCode: string;
                    let areSuccessEvaluations: boolean;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');
                        const getObfuscatedCode = () => JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                                stringArray: true,
                                stringArrayEncoding: [
                                    StringArrayEncoding.Rc4
                                ],
                                stringArrayThreshold: 1,
                                stringArrayWrappersChainedCalls: true,
                                stringArrayWrappersCount: 1,
                                stringArrayWrappersParametersMaxCount: 5,
                                stringArrayWrappersType: StringArrayWrappersType.Function
                            }
                        ).getObfuscatedCode();

                        obfuscatedCode = getObfuscatedCode();
                        areSuccessEvaluations = checkCodeEvaluation(
                            getObfuscatedCode,
                            evaluationSamplesCount
                        ).areSuccessEvaluations;
                    });

                    it('Match #1: should add correct scope calls wrapper 1', () => {
                        assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp1);
                    });

                    it('Match #2: should add correct scope calls wrapper 2', () => {
                        assert.match(obfuscatedCode, stringArrayScopeCallsWrapperRegExp2);
                    });

                    it('Match #3: should add correct scope calls wrappers', () => {
                        assert.match(obfuscatedCode, stringArrayCallsWrapperCallRegExp);
                    });

                    it('should evaluate code without errors', () => {
                        assert.isTrue(areSuccessEvaluations);
                    });
                });
            });
        });
    });

    describe('Variant #2: none and base64 encoding', () => {
        describe('Variant #1: root scope', () => {
            describe('Variant #1: `1` scope calls wrapper for each encoding type', () => {
                const stringArrayWrappersRegExp: RegExp = new RegExp(
                    '(?<!const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                    // second one may be added or not depends on:
                    // if all literal values encoded with a single encoding or not
                    '(const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};(function .*)?){1,2}' +
                    '(?!const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                    'const foo *= *_0x([a-f0-9]){4,6}\\(0x0\\);.*' +
                    'const bar *= *_0x([a-f0-9]){4,6}\\(0x1\\);.*' +
                    'const baz *= *_0x([a-f0-9]){4,6}\\(0x2\\);.*'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.None,
                                StringArrayEncoding.Base64
                            ],
                            stringArrayWrappersCount: 1,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers for both `none` and `base64` string array wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayWrappersRegExp);
                });
            });

            describe('Variant #2: `2` scope calls wrappers for each encoding type', () => {
                const stringArrayWrappersRegExp: RegExp = new RegExp(
                    '(?<!const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                    // third one may be added or not depends on:
                    // if all literal values encoded with a single encoding or not
                    '(const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};(function .*)?){2,3}' +
                    '(?!const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};.*)' +
                    'const foo *= *_0x([a-f0-9]){4,6}\\(0x0\\);.*' +
                    'const bar *= *_0x([a-f0-9]){4,6}\\(0x1\\);.*' +
                    'const baz *= *_0x([a-f0-9]){4,6}\\(0x2\\);'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.None,
                                StringArrayEncoding.Base64
                            ],
                            stringArrayWrappersCount: 2,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers for both `none` and `base64` string array wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayWrappersRegExp);
                });
            });
        });

        describe('Variant #2: function scope', () => {
            describe('Variant #1: `1` scope calls wrapper for each encoding type', () => {
                const stringArrayWrappersRegExp: RegExp = new RegExp(
                    'function test *\\( *\\) *{' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        // this one may be added or not depends on:
                        // if all literal values encoded with a single encoding or not
                        '(?:const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};)?' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x3\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x4\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x5\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.None,
                                StringArrayEncoding.Base64
                            ],
                            stringArrayWrappersCount: 1,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers for both `none` and `base64` string array wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayWrappersRegExp);
                });
            });

            describe('Variant #2: `2` scope calls wrappers for each encoding type', () => {
                const stringArrayWrappersRegExp: RegExp = new RegExp(
                    'function test *\\( *\\) *{' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        // this one may be added or not depends on:
                        // if all literal values encoded with a single encoding or not
                        '(?:const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};)?' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x3\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x4\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(0x5\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-const.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.None,
                                StringArrayEncoding.Base64
                            ],
                            stringArrayWrappersCount: 2,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('should add scope calls wrappers for both `none` and `base64` string array wrappers', () => {
                    assert.match(obfuscatedCode, stringArrayWrappersRegExp);
                });
            });
        });
    });

    describe('Variant #3: none and rc4 encoding', () => {
        describe('Variant #1: correct evaluation of the scope calls wrappers', () => {
            const expectedEvaluationResult: string = 'aaabbbcccdddeee';
            let evaluationResult: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-eval.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayEncoding: [
                            StringArrayEncoding.None,
                            StringArrayEncoding.Rc4
                        ],
                        stringArrayWrappersCount: 5
                    }
                ).getObfuscatedCode();

                evaluationResult = eval(obfuscatedCode);
            });

            it('should correctly evaluate scope calls wrappers', () => {
                assert.equal(evaluationResult, expectedEvaluationResult);
            });
        });
    });

    describe('Variant #4: base64 and rc4 encoding', () => {
        describe('Variant #1: correct evaluation of the scope calls wrappers', () => {
            const expectedEvaluationResult: string = 'aaabbbcccdddeee';
            let evaluationResult: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/wrappers-count-eval.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayEncoding: [
                            StringArrayEncoding.Base64,
                            StringArrayEncoding.Rc4
                        ],
                        stringArrayWrappersCount: 5
                    }
                ).getObfuscatedCode();

                evaluationResult = eval(obfuscatedCode);
            });

            it('should correctly evaluate scope calls wrappers', () => {
                assert.equal(evaluationResult, expectedEvaluationResult);
            });
        });
    });
});
