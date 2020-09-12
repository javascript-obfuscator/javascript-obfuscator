import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { StringArrayEncoding } from '../../../../../src/enums/StringArrayEncoding';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';
import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { swapLettersCase } from '../../../../helpers/swapLettersCase';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayTransformer', function () {
    this.timeout(120000);

    describe('Variant #1: default behaviour', () => {
        const stringArrayRegExp: RegExp = /^var _0x([a-f0-9]){4} *= *\['test'\];/;
        const stringArrayCallRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('match #1: should replace literal node value with value from string array', () => {
            assert.match(obfuscatedCode, stringArrayRegExp);
        });

        it('match #2: should replace literal node value with value from string array', () => {
            assert.match(obfuscatedCode, stringArrayCallRegExp);
        });
    });

    describe('Variant #2: `stringArray` option is disabled', () => {
        const regExp: RegExp = /^var test *= *'test';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t replace literal node value with value from string array', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #3: `stringArrayWrappersCount` option is enabled', () => {
        describe('Variant #1: root scope', () => {
            describe('Variant #1: option value value is lower then count `literal` nodes in the scope', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                        'return _0x([a-f0-9]){4,6};' +
                    '};' +
                    'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                    'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                    'const foo *= *_0x([a-f0-9]){4,6}\\(\'0x0\'\\);' +
                    'const bar *= *_0x([a-f0-9]){4,6}\\(\'0x1\'\\);' +
                    'const baz *= *_0x([a-f0-9]){4,6}\\(\'0x2\'\\);'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-const.js');

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
                        'return _0x([a-f0-9]){4,6};' +
                    '};' +
                    'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                    'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                    'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                    'const foo *= *_0x([a-f0-9]){4,6}\\(\'0x0\'\\);' +
                    'const bar *= *_0x([a-f0-9]){4,6}\\(\'0x1\'\\);' +
                    'const baz *= *_0x([a-f0-9]){4,6}\\(\'0x2\'\\);'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-const.js');

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
        });

        describe('Variant #2: function scope', () => {
            describe('Variant #1: option value is lower then count `literal` nodes in the scope', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'function test *\\( *\\) *{' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x3\'\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x4\'\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x5\'\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-const.js');

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
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x3\'\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x4\'\\);' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x5\'\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-const.js');

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
        });

        describe('Variant #3: prohibited scopes', () => {
            describe('Variant #1: if statement scope', () => {
                const stringArrayCallRegExp: RegExp = new RegExp(
                    'var c *= *b;' +
                    'if *\\(!!\\[]\\) *{' +
                        'var foo *= *c\\(\'0x0\'\\);' +
                    '}'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-prohibited-scope-1.js');

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
                    'var c *= *b;' +
                    '\\[]\\[c\\(\'0x0\'\\)]\\(\\(\\) *=> *c\\(\'0x1\'\\)\\);'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-prohibited-scope-2.js');

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
                    'return _0x([a-f0-9]){4,6};' +
                '};' +
                'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                'var _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                'var foo *= *_0x([a-f0-9]){4,6}\\(\'0x0\'\\);' +
                'var bar *= *_0x([a-f0-9]){4,6}\\(\'0x1\'\\);' +
                'var baz *= *_0x([a-f0-9]){4,6}\\(\'0x2\'\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-var.js');

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
                const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-eval.js');

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
                        'const q *= *b;' +
                        'const foo *= *q\\(\'0x0\'\\);' +
                        'function test\\(c, *d\\) *{' +
                            'const r *= *q;' +
                            'const e *= *r\\(\'0x1\'\\);' +
                            'const f *= *r\\(\'0x2\'\\);' +
                            'function g\\(h, *i\\) *{' +
                                'const s *= *r;' +
                                'const j *= *s\\(\'0x3\'\\);' +
                                'const k *= *s\\(\'0x4\'\\);' +
                                'function l\\(m, *n *\\) *{' +
                                    'const t *= *s;' +
                                    'const o *= *t\\(\'0x3\'\\);' +
                                    'const p *= *t\\(\'0x4\'\\);' +
                                    'return o *\\+ *p;' +
                                '}' +
                                'return j *\\+ *k;' +
                            '}' +
                            'return e *\\+ *f *\\+ *g\\(\\);' +
                        '}'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-chained-calls-1.js');

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
                            const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-chained-calls-1.js');

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
                            const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-chained-calls-1.js');

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
                            const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-chained-calls-2.js');

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
                            const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-chained-calls-2.js');

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
    });

    describe('Variant #4: string contains non-latin and non-digit characters and `unicodeEscapeSequence` is disabled', () => {
        let testFunc: () => void;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/error-when-non-latin.js');

            testFunc = () => JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );
        });

        it('should\'t throw an error', () => {
            assert.doesNotThrow(testFunc);
        });
    });

    describe('Variant #5: same literal node values', () => {
        const stringArrayRegExp: RegExp = /^var _0x([a-f0-9]){4} *= *\['test'\];/;
        const stringArrayCallRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/same-literal-values.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('match #1: should create only one item in string array for same literal node values', () => {
            assert.match(obfuscatedCode, stringArrayRegExp);
        });

        it('match #2: should create only one item in string array for same literal node values', () => {
            assert.match(obfuscatedCode, stringArrayCallRegExp);
        });
    });

    describe('Variant #6: `unicodeEscapeSequence` option is enabled', () => {
        const regExp: RegExp = /^var test *= *'\\x74\\x65\\x73\\x74';$/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: true

                }
            ).getObfuscatedCode();
        });

        it('should replace literal node value with unicode escape sequence', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #7: `unicodeEscapeSequence` and `stringArray` options are enabled', () => {
        const stringArrayRegExp: RegExp = /^var _0x([a-f0-9]){4} *= *\['\\x74\\x65\\x73\\x74'\];/;
        const stringArrayCallRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('\\x30\\x78\\x30'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    unicodeEscapeSequence: true
                }
            ).getObfuscatedCode();
        });

        it('match #1: should replace literal node value with unicode escape sequence from string array', () => {
            assert.match(obfuscatedCode, stringArrayRegExp);
        });

        it('match #2: should replace literal node value with unicode escape sequence from string array', () => {
            assert.match(obfuscatedCode, stringArrayCallRegExp);
        });
    });

    describe('Variant #8: short literal node value', () => {
        const regExp: RegExp = /var test *= *'te';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/short-literal-value.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t replace short literal node value with value from string array', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #9: base64 encoding', () => {
        const stringArrayRegExp: RegExp = new RegExp(`^var _0x([a-f0-9]){4} *= *\\['${swapLettersCase('dGVzdA==')}'];`);
        const stringArrayCallRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayEncoding: [StringArrayEncoding.Base64],
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('match #1: should replace literal node value with value from string array encoded using base64', () => {
            assert.match(obfuscatedCode, stringArrayRegExp);
        });

        it('match #2: should replace literal node value with value from string array encoded using base64', () => {
            assert.match(obfuscatedCode, stringArrayCallRegExp);
        });
    });

    describe('Variant #10: rc4 encoding', () => {
        describe('Variant #1: single string literal', () => {
            const regExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0', *'.{4}'\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayEncoding: [StringArrayEncoding.Rc4],
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should replace literal node value with value from string array encoded using rc4', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: multiple string literals', () => {
            const variableRegExp1: RegExp = /var test *= *_0x(?:[a-f0-9]){4}\('0x0', *'(.{4})'\);/;
            const variableRegExp2: RegExp = /var test *= *_0x(?:[a-f0-9]){4}\('0x1', *'(.{4})'\);/;

            let encodedLiteralValue1: string;
            let encodedLiteralValue2: string;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/same-literal-values.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        seed: 1, // set seed to prevent rare case when all encoded values are the same
                        stringArray: true,
                        stringArrayEncoding: [StringArrayEncoding.Rc4],
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();

                encodedLiteralValue1 = getRegExpMatch(obfuscatedCode, variableRegExp1);
                encodedLiteralValue2 = getRegExpMatch(obfuscatedCode, variableRegExp2);
            });

            it('Match #1: should replace literal node value with value from string array encoded using rc4', () => {
                assert.match(obfuscatedCode, variableRegExp1);
            });

            it('Match #2: should replace literal node value with value from string array encoded using rc4', () => {
                assert.match(obfuscatedCode, variableRegExp2);
            });

            it('Should encode same values as two different encoded string array items', () => {
                assert.notEqual(encodedLiteralValue1, encodedLiteralValue2);
            });
        });
    });

    describe('Variant #11: none and base64 encoding', () => {
        describe('Variant #1: string array values', () => {
            const samplesCount: number = 300;
            const expectedMatchesChance: number = 0.5;
            const expectedMatchesDelta: number = 0.15;

            const noneEncodingRegExp: RegExp = /^var _0x([a-f0-9]){4} *= *\['test'\];/;
            const base64EncodingRegExp: RegExp = /^var _0x([a-f0-9]){4} *= *\['DgvZDa=='\];/;

            let noneEncodingMatchesCount: number = 0;
            let base64EncodingMatchesCount: number = 0;
            let obfuscatedCode: string;

            let noneEncodingMatchesChance: number;
            let base64EncodingMatchesChance: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                for (let i = 0; i < samplesCount; i++) {
                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.None,
                                StringArrayEncoding.Base64
                            ],
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    if (obfuscatedCode.match(noneEncodingRegExp)) {
                        noneEncodingMatchesCount = noneEncodingMatchesCount + 1;
                    }

                    if (obfuscatedCode.match(base64EncodingRegExp)) {
                        base64EncodingMatchesCount = base64EncodingMatchesCount + 1;
                    }

                    noneEncodingMatchesChance = noneEncodingMatchesCount / samplesCount;
                    base64EncodingMatchesChance = base64EncodingMatchesCount / samplesCount;
                }
            });

            it('should add literal node value to the string array without encoding', () => {
                assert.closeTo(noneEncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });

            it('should add literal node value to the string array encoded using base64', () => {
                assert.closeTo(base64EncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });
        });

        describe('Variant #2: `stringArrayWrappersCount` option is enabled', () => {
            describe('Variant #1: root scope', () => {
                describe('Variant #1: `1` scope calls wrapper for each encoding type', () => {
                    const stringArrayWrappersRegExp: RegExp = new RegExp(
                            'return _0x([a-f0-9]){4,6};' +
                        '};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        // this one may be added or not depends on:
                        // if all literal values encoded with a single encoding or not
                        '(?:const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};)?' +
                        'const foo *= *_0x([a-f0-9]){4,6}\\(\'0x0\'\\);' +
                        'const bar *= *_0x([a-f0-9]){4,6}\\(\'0x1\'\\);' +
                        'const baz *= *_0x([a-f0-9]){4,6}\\(\'0x2\'\\);'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-const.js');

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
                            'return _0x([a-f0-9]){4,6};' +
                        '};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};' +
                        // this one may be added or not depends on:
                        // if all literal values encoded with a single encoding or not
                        '(?:const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4};)?' +
                        'const foo *= *_0x([a-f0-9]){4,6}\\(\'0x0\'\\);' +
                        'const bar *= *_0x([a-f0-9]){4,6}\\(\'0x1\'\\);' +
                        'const baz *= *_0x([a-f0-9]){4,6}\\(\'0x2\'\\);'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-const.js');

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
                            'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x3\'\\);' +
                            'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x4\'\\);' +
                            'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x5\'\\);' +
                        '}'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-const.js');

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
                            'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x3\'\\);' +
                            'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x4\'\\);' +
                            'const _0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\\(\'0x5\'\\);' +
                        '}'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-const.js');

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
    });

    describe('Variant #12: none and rc4 encoding', () => {
        describe('Variant #1: string array calls wrapper call', () => {
            const samplesCount: number = 300;
            const expectedMatchesChance: number = 0.5;
            const expectedMatchesDelta: number = 0.15;

            const noneEncodingRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0'\);/;
            const rc4EncodingRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0', *'.{4}'\);/;

            let noneEncodingMatchesCount: number = 0;
            let rc4EncodingMatchesCount: number = 0;
            let obfuscatedCode: string;

            let noneEncodingMatchesChance: number;
            let rc4EncodingMatchesChance: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                for (let i = 0; i < samplesCount; i++) {
                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.None,
                                StringArrayEncoding.Rc4
                            ],
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    if (obfuscatedCode.match(noneEncodingRegExp)) {
                        noneEncodingMatchesCount = noneEncodingMatchesCount + 1;
                    }

                    if (obfuscatedCode.match(rc4EncodingRegExp)) {
                        rc4EncodingMatchesCount = rc4EncodingMatchesCount + 1;
                    }

                    noneEncodingMatchesChance = noneEncodingMatchesCount / samplesCount;
                    rc4EncodingMatchesChance = rc4EncodingMatchesCount / samplesCount;
                }
            });

            it('should replace literal node value with value from string array without encoding', () => {
                assert.closeTo(noneEncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });

            it('should replace literal node value with value from string array encoded using rc4', () => {
                assert.closeTo(rc4EncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });
        });

        describe('Variant #2: `stringArrayWrappersCount` option is enabled', () => {
            describe('Variant #1: correct evaluation of the scope calls wrappers', () => {
                const expectedEvaluationResult: string = 'aaabbbcccdddeee';
                let evaluationResult: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-eval.js');

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
    });

    describe('Variant #13: base64 and rc4 encoding', () => {
        describe('Variant #1: single string literal', () => {
            const samplesCount: number = 300;
            const expectedMatchesChance: number = 0.5;
            const expectedMatchesDelta: number = 0.15;

            const base64EncodingRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0'\);/;
            const rc4EncodingRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0', *'.{4}'\);/;

            let base64EncodingMatchesCount: number = 0;
            let rc4EncodingMatchesCount: number = 0;
            let obfuscatedCode: string;

            let base64EncodingMatchesChance: number;
            let rc4EncodingMatchesChance: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                for (let i = 0; i < samplesCount; i++) {
                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.Base64,
                                StringArrayEncoding.Rc4
                            ],
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    if (obfuscatedCode.match(base64EncodingRegExp)) {
                        base64EncodingMatchesCount = base64EncodingMatchesCount + 1;
                    }

                    if (obfuscatedCode.match(rc4EncodingRegExp)) {
                        rc4EncodingMatchesCount = rc4EncodingMatchesCount + 1;
                    }

                    base64EncodingMatchesChance = base64EncodingMatchesCount / samplesCount;
                    rc4EncodingMatchesChance = rc4EncodingMatchesCount / samplesCount;
                }
            });

            it('should replace literal node value with value from string array encoded using base64', () => {
                assert.closeTo(base64EncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });

            it('should replace literal node value with value from string array encoded using rc4', () => {
                assert.closeTo(rc4EncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });
        });

        describe('Variant #2: `stringArrayWrappersCount` option is enabled', () => {
            describe('Variant #1: correct evaluation of the scope calls wrappers', () => {
                const expectedEvaluationResult: string = 'aaabbbcccdddeee';
                let evaluationResult: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/string-array-wrappers-count-eval.js');

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

    describe('Variant #14: `stringArrayThreshold` option value', () => {
        const samples: number = 1000;
        const stringArrayThreshold: number = 0.5;
        const delta: number = 0.1;

        const regExp1: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0'\);/g;
        const regExp2: RegExp = /var test *= *'test';/g;

        let stringArrayProbability: number,
            noStringArrayProbability: number;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                `${code}\n`.repeat(samples),
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: stringArrayThreshold
                }
            ).getObfuscatedCode();

            const stringArrayMatchesLength: number = obfuscatedCode
                .match(regExp1)!
                .length;
            const noStringArrayMatchesLength: number = obfuscatedCode
                .match(regExp2)!
                .length;

            stringArrayProbability = stringArrayMatchesLength / samples;
            noStringArrayProbability = noStringArrayMatchesLength / samples;
        });

        it('Variant #1: should replace literal node value with value from string array with `stringArrayThreshold` chance', () => {
            assert.closeTo(stringArrayProbability, stringArrayThreshold, delta);
        });

        it('Variant #2: shouldn\'t replace literal node value with value from string array with `(1 - stringArrayThreshold)` chance', () => {
            assert.closeTo(noStringArrayProbability, stringArrayThreshold, delta);
        });
    });

    describe('Variant #15: string array calls wrapper name', () => {
        const regExp: RegExp = /console\[b\('0x0'\)]\('a'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/string-array-calls-wrapper-name.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                }
            ).getObfuscatedCode();
        });

        it('match #1: should keep identifier with string array calls wrapper name untouched after obfuscation', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #16: `reservedStrings` option is enabled', () => {
        describe('Variant #1: base `reservedStrings` values', () => {
            describe('Variant #1: single reserved string value', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
                const stringLiteralRegExp2: RegExp = /const bar *= *_0x([a-f0-9]){4}\('0x0'\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            reservedStrings: ['foo']
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should transform non-reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });

            describe('Variant #2: two reserved string values', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
                const stringLiteralRegExp2: RegExp = /const bar *= *'bar';/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            reservedStrings: ['foo', 'bar']
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });
        });

        describe('Variant #2: RegExp `reservedStrings` values', () => {
            describe('Variant #1: single reserved string value', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *_0x([a-f0-9]){4}\('0x0'\);/;
                const stringLiteralRegExp2: RegExp = /const bar *= *'bar';/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            reservedStrings: ['ar$']
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should transform non-reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });

            describe('Variant #2: two reserved string values', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
                const stringLiteralRegExp2: RegExp = /const bar *= *'bar';/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            reservedStrings: ['^fo', '.ar']
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });
        });

        describe('Variant #3: `unicodeEscapeSequence` option is enabled', () => {
            const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
            const stringLiteralRegExp2: RegExp = /const bar *= *'\\x62\\x61\\x72';/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        reservedStrings: ['foo'],
                        unicodeEscapeSequence: true
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should ignore reserved strings', () => {
                assert.match(obfuscatedCode, stringLiteralRegExp1);
            });

            it('match #2: should transform non-reserved strings', () => {
                assert.match(obfuscatedCode, stringLiteralRegExp2);
            });
        });

        describe('Variant #4: correct escape of special characters', () => {
            const stringLiteralRegExp: RegExp = /var baz *= *'Cannot find module \\'' *\+ *foo *\+ *'\\x27';/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        reservedStrings: ['a']
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should ignore reserved strings', () => {
                assert.match(obfuscatedCode, stringLiteralRegExp);
            });
        });
    });

    describe('Variant #17: object expression key literal', () => {
        describe('Variant #1: base key literal', () => {
            const stringArrayRegExp: RegExp = /^var _0x([a-f0-9]){4} *= *\['bar'];/;
            const objectExpressionRegExp: RegExp = /var test *= *{'foo' *: *_0x([a-f0-9]){4}\('0x0'\)};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/object-expression-key-literal.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should not add object expression key literal to the string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });

            it('match #2: should keep object expression key literal', () => {
                assert.match(obfuscatedCode, objectExpressionRegExp);
            });
        });

        describe('Variant #2: computed key literal', () => {
            const stringArrayRegExp: RegExp = /^var _0x([a-f0-9]){4} *= *\['foo', *'bar'];/;
            const objectExpressionRegExp: RegExp = /var test *= *{\[_0x([a-f0-9]){4}\('0x0'\)] *: *_0x([a-f0-9]){4}\('0x1'\)};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/object-expression-computed-key-literal.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should add object expression computed key literal to the string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });

            it('match #2: should replace object expression computed key literal on call to the string array', () => {
                assert.match(obfuscatedCode, objectExpressionRegExp);
            });
        });
    });

    describe('Variant #18: import declaration source literal', () => {
        const importDeclarationRegExp: RegExp = /import *{ *bar *} *from *'foo';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/import-declaration-source.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('Should not add `ImportDeclaration` source literal to the string array', () => {
            assert.match(obfuscatedCode, importDeclarationRegExp);
        });
    });

    describe('Variant #19: export all declaration source literal', () => {
        const exportAllDeclarationRegExp: RegExp = /export *\* *from *'foo';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/export-all-declaration-source.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('Should not add `ExportAllDeclaration` source literal to the string array', () => {
            assert.match(obfuscatedCode, exportAllDeclarationRegExp);
        });
    });

    describe('Variant #20: export named declaration source literal', () => {
        const exportNamedDeclarationRegExp: RegExp = /export *{ *bar *} *from *'foo';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/export-named-declaration-source.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('Should not add `ExportNamedDeclaration` source literal to the string array', () => {
            assert.match(obfuscatedCode, exportNamedDeclarationRegExp);
        });
    });
});
