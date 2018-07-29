import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ObjectExpressionKeysTransformer', () => {
    const variableMatch: string = '_0x([a-f0-9]){4,6}';

    describe('transformation of object keys', () => {
        describe('Variant #1: simple', () => {
            const match: string = `` +
                `var *${variableMatch} *= *{};` +
                `${variableMatch}\\['foo'] *= *'bar';` +
                `${variableMatch}\\['baz'] *= *'bark';` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #2: nested objects #1', () => {
            const match: string = `` +
                `var *${variableMatch} *= *{};` +
                `${variableMatch}\\['foo'] *= *'bar';` +
                `${variableMatch}\\['inner'] *= *{};` +
                `${variableMatch}\\['inner']\\['inner1'] *= *{};` +
                `${variableMatch}\\['inner']\\['inner1']\\['baz'] *= *'bark';` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/nested-objects-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #3: nested objects #2', () => {
            const match: string = `` +
                `var *${variableMatch} *= *{};` +
                `${variableMatch}\\['foo'] *= *'bar';` +
                `${variableMatch}\\['inner'] *= *{};` +
                `${variableMatch}\\['ball'] *= *'door';` +
                `${variableMatch}\\['inner']\\['baz'] *= *'bark';` +
                `${variableMatch}\\['inner']\\['inner1'] *= *{};` +
                `${variableMatch}\\['inner']\\['cow'] *= *'bear';` +
                `${variableMatch}\\['inner']\\['inner1']\\['hawk'] *= *'geek';` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/nested-objects-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #4: correct integration with control flow flattening object', () => {
            const match: string = `` +
                `var *${variableMatch} *= *{};` +
                `${variableMatch}\\['\\w{5}'] *= *function *\\(${variableMatch}, *${variableMatch}\\) *{` +
                    `return *${variableMatch} *\\+ *${variableMatch};` +
                `};` +
                `var *${variableMatch} *= *${variableMatch}\\['\\w{5}']\\(0x1, *0x2\\);` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/integration-with-control-flow-flattening.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #5: variable declaration without initialization', () => {
            const match: string = `` +
                `var *${variableMatch};` +
                `${variableMatch} *= *{};` +
                `${variableMatch}\\['foo'] *= *'bar';` +
                `${variableMatch}\\['baz'] *= *'bark';` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/variable-declaration-without-initialization.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });
    });

    describe('member expression as host of object expression', () => {
        describe('Variant #1: simple', () => {
            const match: string = `` +
                `this\\['state'] *= *{};` +
                `this\\['state']\\['foo'] *= *'bar';` +
                `this\\['state']\\['baz'] *= *'bark';` +
                ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/member-expression-host-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #2: long members chain', () => {
            const match: string = `` +
                `this\\['state']\\['foo'] *= *{};` +
                `this\\['state']\\['foo']\\['foo'] *= *'bar';` +
                `this\\['state']\\['foo']\\['baz'] *= *'bark';` +
                ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/member-expression-host-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });
    });

    describe('correct placement of expression statements', () => {
        describe('Variant #1: if statement', () => {
            const match: string = `` +
                `if *\\(!!\\[]\\) *{` +
                    `var *${variableMatch} *= *{};` +
                    `${variableMatch}\\['foo'] *= *'bar';` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/placement-inside-if-statement.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #2: try statement', () => {
            const match: string = `` +
                `try *{` +
                    `var *${variableMatch} *= *{};` +
                    `${variableMatch}\\['foo'] *= *'bar';` +
                `} *catch *\\(${variableMatch}\\) *{` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/placement-inside-try-statement.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #3: catch clause statement', () => {
            const match: string = `` +
                `try *{` +
                `} *catch *\\(${variableMatch}\\) *{` +
                    `var *${variableMatch} *= *{};` +
                    `${variableMatch}\\['foo'] *= *'bar';` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/placement-inside-catch-clause.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should correctly transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #4: switch catch statement', () => {
            const match: string = `` +
                `switch *\\(!!\\[]\\) *{` +
                    `case *!!\\[]:` +
                        `var *${variableMatch} *= *{};` +
                        `${variableMatch}\\['foo'] *= *'bar';` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/placement-inside-switch-case.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }
                ).getObfuscatedCode();
            });

            it('should transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #5: variable declarator with object call', () => {
            describe('Variant #1', () => {
                const match: string = `` +
                    `const *${variableMatch} *= *{}; *` +
                    `${variableMatch}\\['foo'] *= *'foo'; *` +
                    `const *${variableMatch} *= *${variableMatch}\\['foo'];` +
                ``;
                const regExp: RegExp = new RegExp(match);

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-declarator-with-object-call-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            transformObjectKeys: true
                        }
                    ).getObfuscatedCode();
                });

                it('should correctly transform object keys', () => {
                    assert.match(obfuscatedCode,  regExp);
                });
            });

            describe('Variant #2', () => {
                const match: string = `` +
                    `const *${variableMatch} *= *0x1, *` +
                        `${variableMatch} *= *{}; *` +
                    `${variableMatch}\\['foo'] *= *'foo'; *` +
                    `const *${variableMatch} *= *${variableMatch}\\['foo'];` +
                ``;
                const regExp: RegExp = new RegExp(match);

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-declarator-with-object-call-2.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            transformObjectKeys: true
                        }
                    ).getObfuscatedCode();
                });

                it('should correctly transform object keys', () => {
                    assert.match(obfuscatedCode,  regExp);
                });
            });

            describe('Variant #3: two objects', () => {
                const match: string = `` +
                    `const *${variableMatch} *= *{}, *` +
                        `${variableMatch} *= *{'bar': *'bar'}, *` +
                        `${variableMatch} *= *${variableMatch}\\['bar']; *` +
                    `${variableMatch}\\['foo'] *= *'foo';` +
                ``;
                const regExp: RegExp = new RegExp(match);

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-declarator-with-object-call-3.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            transformObjectKeys: true
                        }
                    ).getObfuscatedCode();
                });

                it('should correctly transform first object keys and ignore second object keys', () => {
                    assert.match(obfuscatedCode,  regExp);
                });
            });
        });
    });

    describe('Ignore transformation', () => {
        describe('Variant #1: disabled option', () => {
            const match: string = `` +
                `var *${variableMatch} *= *{` +
                    `'foo': *'bar',` +
                    `'baz': *'bark'` +
                `}` +
            ``;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #2: empty object expression', () => {
            const match: string = `var *${variableMatch} *= *{};`;
            const regExp: RegExp = new RegExp(match);

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/empty-object-expression.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform object keys', () => {
                assert.match(obfuscatedCode,  regExp);
            });
        });

        describe('Variant #3: variable declarator object call inside other variable declarator', () => {
            describe('Variant #1', () => {
                const match: string = `` +
                    `const *${variableMatch} *= *{'foo': *'foo'}, *` +
                        `${variableMatch} *= *${variableMatch}\\['foo'];` +
                ``;
                const regExp: RegExp = new RegExp(match);

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-declarator-with-object-call-ignore-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            transformObjectKeys: true
                        }
                    ).getObfuscatedCode();
                });

                it('shouldn\'t transform object keys', () => {
                    assert.match(obfuscatedCode,  regExp);
                });
            });

            describe('Variant #2', () => {
                const match: string = `` +
                    `const *${variableMatch} *= *{'foo': *'foo'}, *` +
                        `${variableMatch} *= *\\[${variableMatch}\\['foo']];` +
                ``;
                const regExp: RegExp = new RegExp(match);

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-declarator-with-object-call-ignore-2.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            transformObjectKeys: true
                        }
                    ).getObfuscatedCode();
                });

                it('shouldn\'t transform object keys', () => {
                    assert.match(obfuscatedCode,  regExp);
                });
            });
        });
    });
});
