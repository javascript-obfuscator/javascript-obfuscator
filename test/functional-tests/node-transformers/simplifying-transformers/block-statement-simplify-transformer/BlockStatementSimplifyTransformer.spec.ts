import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('BlockStatementSimplifyTransformer', () => {
    describe('Full `BlockStatement` simplify cases', () => {
        describe('No `ReturnStatement`', () => {
            describe('Variant #1: single statement', () => {
                const regExp: RegExp = new RegExp(
                    'function foo *\\(\\) *{ *' +
                        'bar\\(\\); *' +
                    '}'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/full-no-return-single-statement.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should not simplify block statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #2: multiple statements', () => {
                const regExp: RegExp = new RegExp(
                    'function foo *\\(\\) *{ *' +
                        'bar\\(\\), *baz\\(\\), *bark\\(\\); *' +
                    '}'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/full-no-return-multiple-statements.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should simplify block statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });

        describe('With `ReturnStatement`', () => {
            describe('Variant #1: single statement', () => {
                const regExp: RegExp = new RegExp(
                    'function foo *\\(\\) *{ *' +
                        'return bar\\(\\); *' +
                    '}'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/full-return-single-statement.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should not simplify block statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #2: multiple statements', () => {
                const regExp: RegExp = new RegExp(
                    'function foo *\\(\\) *{ *' +
                        'return bar\\(\\), *baz\\(\\), *bark\\(\\); *' +
                    '}'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/full-return-multiple-statements.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should simplify block statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });
    });

    describe('Partial `BlockStatement` simplify cases', () => {
        describe('No `ReturnStatement`', () => {
            describe('Variant #1: single statement', () => {
                const regExp: RegExp = new RegExp(
                    'function foo *\\(\\) *{ *' +
                        'var _0x([a-f0-9]){4,6} *= *baz\\(\\);' +
                    '}'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/partial-no-return-single-statement.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should not simplify block statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #2: multiple statements', () => {
                const regExp: RegExp = new RegExp(
                    'function foo *\\(\\) *{ *' +
                        'const _0x([a-f0-9]){4,6} *= *baz\\(\\); *' +
                        'bark\\(\\), *hawk\\(\\);' +
                    '}'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/partial-no-return-multiple-statements.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should simplify block statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });

        describe('With `ReturnStatement`', () => {
            describe('Variant #1: multiple statements', () => {
                const regExp: RegExp = new RegExp(
                    'function foo *\\(\\) *{ *' +
                        'const _0x([a-f0-9]){4,6} *= *baz\\(\\); *' +
                        'return bark\\(\\), *hawk\\(\\);' +
                    '}'
                );


                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/partial-return-multiple-statements.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            simplify: true
                        }
                    ).getObfuscatedCode();
                });

                it('should simplify block statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });
    });

    describe('Cases', () => {
        describe('Variable declarations merge transformer integration', () => {
            describe('Variant #1: three statements', () => {
                const regExp: RegExp = new RegExp(
                    'function foo *\\(\\) *{ *' +
                        'var _0x([a-f0-9]){4,6} *= *function *\\(\\) *{}, *' +
                            '_0x([a-f0-9]){4,6} *= *function *\\(\\) *{}, *' +
                            '_0x([a-f0-9]){4,6} *= *function *\\(\\) *{}; *' +
                    '}'
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

                it('should simplify block statement', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });
    });
});
