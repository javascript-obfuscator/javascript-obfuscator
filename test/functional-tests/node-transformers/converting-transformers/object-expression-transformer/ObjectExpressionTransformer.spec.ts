import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ObjectExpressionTransformer', () => {
    describe('default behaviour', () => {
        describe('Variant #1: `unicodeEscapeSequence` option is disabled\'', () => {
            const regExp: RegExp = /var *test *= *\{'foo':0x0\};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/property-with-identifier-value.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        unicodeEscapeSequence: false
                    }
                ).getObfuscatedCode();
            });

            it('should replace object expression node `key` property with identifier value by property with literal value', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: `unicodeEscapeSequence` option is enabled', () => {
            const regExp: RegExp = /var *test *= *\{'\\x66\\x6f\\x6f':0x0\};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/property-with-identifier-value.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        unicodeEscapeSequence: true
                    }
                ).getObfuscatedCode();
            });

            it('should replace object expression node `key` property with identifier value by property with encoded literal value', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });

    describe('shorthand ES6 object expression', () => {
        const regExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{'a': *_0x[a-f0-9]{4,6}\, *'b': *_0x[a-f0-9]{4,6}\};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/shorthand-object-expression.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should correct convert shorthand ES6 object expression to non-shorthand object expression', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('computed property name', () => {
        describe('Variant #1: computed property name with identifier', () => {
            const regExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{\[_0x[a-f0-9]{4,6}\]: *0x1\};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/computed-property-name-identifier.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should ignore computed property identifier', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: computed property name with literal', () => {
            describe('Variant #1: `unicodeEscapeSequence` option is disabled', () => {
                const regExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{\['foo'\]: *0x1\};/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/computed-property-name-literal.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            unicodeEscapeSequence: false
                        }
                    ).getObfuscatedCode();
                });

                it('should ignore computed property literal value', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #2: `unicodeEscapeSequence` option is enabled', () => {
                const regExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{\['\\x66\\x6f\\x6f'\]: *0x1\};/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/computed-property-name-literal.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            unicodeEscapeSequence: true
                        }
                    ).getObfuscatedCode();
                });

                it('should encode computed property literal value', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });
    });

    describe('object rest', () => {
        const objectRegExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{'foo': *0x1, *'bar': *0x2, *'baz': *0x3\};/;
        const objectRestRegExp: RegExp = /var *\{foo, *\.\.\.*_0x[a-f0-9]{4,6}\} *= *_0x[a-f0-9]{4,6};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-rest.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('Match #1: should transform object name', () => {
            assert.match(obfuscatedCode, objectRegExp);
        });

        it('Match #2: should transform object rest construction', () => {
            assert.match(obfuscatedCode, objectRestRegExp);
        });
    });

    describe('object spread', () => {
        const object1RegExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{'foo': *0x1\};/;
        const object2RegExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{'bar': *0x2\};/;
        const objectSpreadRegExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{\.\.\._0x[a-f0-9]{4,6}, *\.\.\._0x[a-f0-9]{4,6}\};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-spread.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('Match #1: should transform object name', () => {
            assert.match(obfuscatedCode, object1RegExp);
        });

        it('Match #2: should transform object name', () => {
            assert.match(obfuscatedCode, object2RegExp);
        });

        it('Match #3: should transform object spread construction', () => {
            assert.match(obfuscatedCode, objectSpreadRegExp);
        });
    });
});
