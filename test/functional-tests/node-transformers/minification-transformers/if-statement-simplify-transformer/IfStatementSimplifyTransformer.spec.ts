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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-only-no-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-only-no-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-only-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-only-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-and-alternate-no-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-and-alternate-no-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-and-alternate-consequent-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-and-alternate-consequent-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-and-alternate-alternate-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-and-alternate-alternate-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-and-alternate-return-single-statement.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
                        const code: string = readFileAsString(__dirname + '/fixtures/consequent-and-alternate-return-multiple-statements.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                minify: true
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
});
