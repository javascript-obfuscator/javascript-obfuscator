import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('VariableDeclarationsMergeTransformer', () => {
    describe('base behaviour', () => {
        describe('Variant #1: single variable declaration', () => {
            const regExp: RegExp = new RegExp(
                'var foo *= *0x1;'
            );


            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/single-declaration.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        simplify: true
                    }
                ).getObfuscatedCode();
            });

            it('should keep single declaration', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: multiple variable declarations', () => {
            const regExp: RegExp = new RegExp(
                'var foo *= *0x1, *' +
                    'bar *= *0x2, *' +
                    'baz *= *0x3;'
            );


            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/multiple-declarations.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        simplify: true
                    }
                ).getObfuscatedCode();
            });

            it('should merge variable declarations', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #3: multiple variable declarations with multiple declarators', () => {
            const regExp: RegExp = new RegExp(
                'var foo *= *0x1, *' +
                    'bar *= *0x2, *' +
                    'baz *= *0x3, *' +
                    'bark *= *0x4;'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/multiple-declarations-with-multiple-declarators.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        simplify: true
                    }
                ).getObfuscatedCode();
            });

            it('should merge variable declarations', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #4: Splitted declarations with other statement', () => {
            const regExp: RegExp = new RegExp(
                'var foo *= *0x1, *' +
                    'bar *= *0x2; *' +
                'console\\[\'log\']\\(\'123\'\\); *' +
                'var baz *= *0x3, *' +
                    'bark *= *0x4;'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/splitted-declarations-with-other-statement.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        simplify: true
                    }
                ).getObfuscatedCode();
            });

            it('should merge variable declarations', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #5: multiple variable declarations without declarators', () => {
            const regExp: RegExp = new RegExp(
                'var foo, *' +
                    'bar, *' +
                    'baz;'
            );


            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/multiple-declarations-without-declarators.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        simplify: true
                    }
                ).getObfuscatedCode();
            });

            it('should merge variable declarations', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #6: declarations inside nested function expressions', () => {
            const regExp: RegExp = new RegExp(
                'var foo *= *function *\\(\\) *{ *}, *' +
                    'bar *= *function *\\(\\) *{ *' +
                        'var _0x([a-f0-9]){4,6} *= *function *\\(\\) *{ *}, *' +
                            '_0x([a-f0-9]){4,6} *= *function *\\(\\) *{ *' +
                                'var _0x([a-f0-9]){4,6} *= *0x1, *' +
                                    '_0x([a-f0-9]){4,6} *= *0x2; *' +
                            '}; *' +
                    '};'
            );


            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/declarations-inside-nested-function-expressions.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        simplify: true
                    }
                ).getObfuscatedCode();
            });

            it('should merge variable declarations', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });

    describe('object pattern as initializer', () => {
        const regExp: RegExp = new RegExp(
            'var foo *= *0x1, *' +
            '{bar} *= *{\'bar\': *0x2}, *' +
            'baz *= *0x3;'
        );

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-pattern-as-initializer.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    simplify: true
                }
            ).getObfuscatedCode();
        });

        it('should merge variable declarations with object pattern', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('variables kind', () => {
        const regExp: RegExp = new RegExp(
            'var foo *= *0x1, *' +
                'bar *= *0x2; *' +
            'let baz *= *0x3, *' +
                'bark *= *0x4;' +
            'const hawk *= *0x5, *' +
                'pork *= *0x6;'
        );

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/different-variables-kind.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    simplify: true
                }
            ).getObfuscatedCode();
        });

        it('should keep unmerged variable declarations with different variable kinds', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });
});
