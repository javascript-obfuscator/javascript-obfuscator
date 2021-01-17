import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('IfStatementSimplifyTransformer', () => {
    describe('Full `IfStatement` simplify cases', () => {
        describe('Consequent only', () => {
            describe('No `ReturnStatement`', () => {
                describe('Variant #1: single statement', () => {
                    const regExp: RegExp = new RegExp(
                        '!!\\[] *&& *bar\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-only-no-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        '!!\\[] *&& *\\(bar\\(\\) *, *baz\\(\\) *, *bark\\(\\)\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-only-no-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });

            describe('With `ReturnStatement`', () => {
                describe('Variant #1: single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'return *bar\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-only-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'return *bar\\(\\) *, *baz\\(\\) *, *bark\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-only-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });
        });

        describe('Consequent and alternate', () => {
            describe('No `ReturnStatement`', () => {
                describe('Variant #1: single statement', () => {
                    const regExp: RegExp = new RegExp(
                        '!!\\[] *' +
                            '\\? *bar\\(\\) *' +
                            ': *baz\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-and-alternate-no-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        '!!\\[] *' +
                            '\\? *\\(bar\\(\\) *, *baz\\(\\) *, *bark\\(\\)\\) *' +
                            ': *\\(hawk\\(\\) *, *pork\\(\\) *, *eagle\\(\\)\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-and-alternate-no-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });

            describe('With consequent `ReturnStatement`', () => {
                describe('Variant #1: single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'return *bar\\(\\); *' +
                        'else *' +
                            'baz\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-and-alternate-consequent-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'return *bar\\(\\) *, *baz\\(\\) *, *bark\\(\\); *' +
                        'else *' +
                            'hawk\\(\\) *, *pork\\(\\) *, *eagle\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-and-alternate-consequent-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });

            describe('With alternate `ReturnStatement`', () => {
                describe('Variant #1: single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'bar\\(\\); *' +
                        'else *' +
                            'return *baz\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-and-alternate-alternate-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'bar\\(\\) *, *baz\\(\\) *, *bark\\(\\); *' +
                        'else *' +
                            'return *hawk\\(\\) *, *pork\\(\\) *, *eagle\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-and-alternate-alternate-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });

            describe('With consequent and alternate `ReturnStatement`', () => {
                describe('Variant #1: single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'return *!!\\[] *' +
                            '\\? *bar\\(\\) *' +
                            ': *baz\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-and-alternate-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        'return *!!\\[] *' +
                            '\\? *\\(bar\\(\\) *, *baz\\(\\) *, *bark\\(\\)\\) *' +
                            ': *\\(hawk\\(\\) *, *pork\\(\\) *, *eagle\\(\\)\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/full-consequent-and-alternate-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });
        });
    });

    describe('Partial `IfStatement` simplify cases', () => {
        describe('Consequent only', () => {
            describe('No `ReturnStatement`', () => {
                describe('Variant #1: single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'var _0x([a-f0-9]){4,6} *= *baz\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-only-no-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should not simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'const _0x([a-f0-9]){4,6} *= *baz\\(\\); *' +
                            'bark\\(\\), *hawk\\(\\);' +
                        '}'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-only-no-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });

            describe('With `ReturnStatement`', () => {
                describe('Variant #1: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'const _0x([a-f0-9]){4,6} *= *baz\\(\\); *' +
                            'return bark\\(\\), *hawk\\(\\);' +
                        '}'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-only-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });
        });

        describe('Consequent and alternate', () => {
            describe('No `ReturnStatement`', () => {
                describe('Variant #1: single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'var *_0x([a-f0-9]){4,6} *= *baz\\(\\); *' +
                        'else *' +
                            'var *_0x([a-f0-9]){4,6} *= *hawk\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-and-alternate-no-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should not simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'const *_0x([a-f0-9]){4,6} *= *baz\\(\\), *' +
                                '_0x([a-f0-9]){4,6} *= *hawk\\(\\); *' +
                            'eagle\\(\\), *pork\\(\\);' +
                        '} *else *{ *' +
                            'const *_0x([a-f0-9]){4,6} *= *cow\\(\\); *' +
                            'lion\\(\\), *pig\\(\\);' +
                        '}'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-and-alternate-no-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #3: mixed statements #1', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'var *_0x([a-f0-9]){4,6} *= *baz\\(\\); *' +
                        'else *{ *' +
                            'const *_0x([a-f0-9]){4,6} *= *hawk\\(\\); *' +
                            'eagle\\(\\), *dog\\(\\);' +
                        '}'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-and-alternate-no-return-mixed-statements-1.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #4: mixed statements #2', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'const *_0x([a-f0-9]){4,6} *= *baz\\(\\), *' +
                                '_0x([a-f0-9]){4,6} *= *hawk\\(\\); *' +
                            'eagle\\(\\), *pork\\(\\);' +
                        '} *else *' +
                            'var *_0x([a-f0-9]){4,6} *= *cow\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-and-alternate-no-return-mixed-statements-2.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });

            describe('With consequent `ReturnStatement`', () => {
                describe('Variant #1: single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'return *bar\\(\\); *' +
                        'else *' +
                            'var *_0x([a-f0-9]){4,6} *= *bark\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-and-alternate-consequent-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'const *_0x([a-f0-9]){4,6} *= *baz\\(\\), *' +
                                '_0x([a-f0-9]){4,6} *= *hawk\\(\\); *' +
                            'return *eagle\\(\\), *cat\\(\\);' +
                        '} *else *{ *' +
                            'const *_0x([a-f0-9]){4,6} *= *pig\\(\\); *' +
                            'lion\\(\\), *dog\\(\\);' +
                        '}'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-and-alternate-consequent-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });

            describe('With alternate `ReturnStatement`', () => {
                describe('Variant #1: single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *' +
                            'var *_0x([a-f0-9]){4,6} *= *baz\\(\\); *' +
                        'else *' +
                            'return *bark\\(\\);'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-and-alternate-alternate-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'const *_0x([a-f0-9]){4,6} *= *baz\\(\\); *' +
                            'bark\\(\\), *hawk\\(\\);' +
                        '} *else *{ *' +
                            'const *_0x([a-f0-9]){4,6} *= *pork\\(\\), *' +
                                '_0x([a-f0-9]){4,6} *= *dog\\(\\); *' +
                            'return *pig\\(\\), *lion\\(\\);' +
                        '}'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-and-alternate-alternate-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });

            describe('With consequent and alternate `ReturnStatement`', () => {
                describe('Variant #1: multiple statements', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'const *_0x([a-f0-9]){4,6} *= *baz\\(\\), *' +
                                '_0x([a-f0-9]){4,6} *= *eagle\\(\\); *' +
                            'return *hawk\\(\\), *lion\\(\\);' +
                        '} *else *{ *' +
                            'const *_0x([a-f0-9]){4,6} *= *dog\\(\\), *' +
                                '_0x([a-f0-9]){4,6} *= *hamster\\(\\); *' +
                            'return *parrot\\(\\), *bull\\(\\);' +
                        '}'
                    );


                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/partial-consequent-and-alternate-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });
        });
    });

    describe('Cases', () => {
        describe('Variable declarations merge transformer integration', () => {
            describe('Variant #1: three statements', () => {
                const regExp: RegExp = new RegExp(
                    'if *\\(!!\\[]\\) *' +
                        'var _0x([a-f0-9]){4,6} *= *function *\\(\\) *{}, *' +
                            '_0x([a-f0-9]){4,6} *= *function *\\(\\) *{}, *' +
                            '_0x([a-f0-9]){4,6} *= *function *\\(\\) *{};'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-declarations-merge-transformer-integration-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should simplify if statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });

        describe('Prohibited single statement', () => {
            describe('Variant #1: `IfStatement` as prohibited single statement', () => {
                const regExp: RegExp = new RegExp(
                    'if *\\(!!\\[]\\) *{ *' +
                        'if *\\(!\\[]\\) *' +
                            'var _0x([a-f0-9]){4,6} *= *baz\\(\\); *' +
                    '} *else *' +
                        'var _0x([a-f0-9]){4,6} *= *hawk\\(\\);'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/if-statement-as-prohibited-single-statement.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should not simplify if statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #2: Nodes with single statement `body` property', () => {
                describe('Variant #1: Single line `ForStatement` as prohibited single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'for *\\( *' +
                                'let _0x([a-f0-9]){4,6} *= *0x0; *' +
                                '_0x([a-f0-9]){4,6} *< *0x1; *' +
                                '_0x([a-f0-9]){4,6}\\+\\+ *' +
                            '\\) *' +
                                'console\\[\'log\']\\(_0x([a-f0-9]){4,6}\\); *' +
                        '} *else *' +
                            'var _0x([a-f0-9]){4,6} *= *hawk\\(\\);'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/single-line-for-statement-as-prohibited-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should not simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #2: Single line `ForOfStatement` as prohibited single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'for *\\(const _0x([a-f0-9]){4,6} of *\\[\\]\\) *' +
                                'console\\[\'log\']\\(_0x([a-f0-9]){4,6}\\); *' +
                        '} *else *' +
                            'var _0x([a-f0-9]){4,6} *= *hawk\\(\\);'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/single-line-for-of-statement-as-prohibited-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should not simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #3: Single line `ForInStatement` as prohibited single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'for *\\(const _0x([a-f0-9]){4,6} in *\\{\\}\\) *' +
                                'console\\[\'log\']\\(_0x([a-f0-9]){4,6}\\); *' +
                        '} *else *' +
                            'var _0x([a-f0-9]){4,6} *= *hawk\\(\\);'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/single-line-for-in-statement-as-prohibited-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should not simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #4: Single line `WhileStatement` as prohibited single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'while *\\(!!\\[]\\) *' +
                                'console\\[\'log\']\\(0x1\\); *' +
                        '} *else *' +
                            'var _0x([a-f0-9]){4,6} *= *hawk\\(\\);'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/single-line-while-statement-as-prohibited-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should not simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #5: Single line `DoWhileStatement` as prohibited single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            'do *' +
                                'console\\[\'log\']\\(0x1\\); *' +
                            'while *\\(!!\\[]\\); *' +
                        '} *else *' +
                            'var _0x([a-f0-9]){4,6} *= *hawk\\(\\);'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/single-line-do-while-statement-as-prohibited-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should not simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });

                describe('Variant #6: Single line `LabeledStatement` as prohibited single statement', () => {
                    const regExp: RegExp = new RegExp(
                        'if *\\(!!\\[]\\) *{ *' +
                            '_0x([a-f0-9]){4,6}: *' +
                                'console\\[\'log\']\\(0x1\\); *' +
                        '} *else *' +
                            'var _0x([a-f0-9]){4,6} *= *hawk\\(\\);'
                    );

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/single-line-labeled-statement-as-prohibited-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                simplify: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('should not simplify if statement', () => {
                        assert.match(obfuscatedCode, regExp);
                    });
                });
            });

            describe('Variant #3: `FunctionDeclaration` as prohibited single statement', () => {
                const regExp: RegExp = new RegExp(
                    'if *\\(!!\\[]\\) *{ *' +
                        'function _0x([a-f0-9]){4,6} *\\(\\) *{} *' +
                    '} *else *{ *' +
                        'function _0x([a-f0-9]){4,6} *\\(\\) *{} *' +
                    '}'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/function-declaration-as-prohibited-single-statement.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should not simplify if statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #4: `let` `VariableDeclaration` as prohibited single statement', () => {
                const regExp: RegExp = new RegExp(
                    'if *\\(!!\\[]\\) *{ *' +
                        'let foo *= *0x1; *' +
                    '}'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/let-variable-declaration-as-prohibited-single-statement.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should not simplify if statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #5: `const` `VariableDeclaration` as prohibited single statement', () => {
                const regExp: RegExp = new RegExp(
                    'if *\\(!!\\[]\\) *{ *' +
                        'const foo *= *0x1; *' +
                    '}'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/const-variable-declaration-as-prohibited-single-statement.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should not simplify if statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });
    });
});
