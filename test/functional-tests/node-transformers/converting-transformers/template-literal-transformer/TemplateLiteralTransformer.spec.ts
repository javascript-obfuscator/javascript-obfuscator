import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('TemplateLiteralTransformer', () => {
    let obfuscatedCode: string;
    
    describe('Variant #1: simple template literal', () => {
        it('should transform es6 template literal to es5', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^var *test *= *'abc\\x20' *\+ *foo;$/);
        });
    });

    describe('Variant #2: multiline template literals', () => {
        it('Variant #1: should transform es6 multiline template literal to es5', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/multiline-template-literal.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^var *test *= *'foo\\x0abar';$/);
        });

        it('Variant #2: should transform es6 multiline template literal inside return statement', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/multiline-template-literal-return-statement-1.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /{ *return *'foo\\x0abar'; *}$/);
        });

        it('Variant #3: should transform es6 multiline template literal inside return statement', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/multiline-template-literal-return-statement-2.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /case *!!\[] *: *return *'foo\\x0abar'; *} *}$/);
        });

        it('Variant #4: should transform es6 multiline template literal inside binary expression inside return statement', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/multiline-template-literal-binary-expression-return-statement-1.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /{ *return *'foo\\x0abar' *\+ *0x1; *}$/);
        });

        it('Variant #5: should transform es6 multiline template literal inside binary expression inside return statement', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/multiline-template-literal-binary-expression-return-statement-2.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /case *!!\[] *: *return *'foo\\x0abar' *\+ *0x1; *} *}$/);
        });
    });

    describe('Variant #3: simple template literal with expression only', () => {
        it('should transform es6 template literal to es5 and add empty literal node before expression node', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/expression-only.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^var *test *= *'' *\+ *foo;$/);
        });
    });

    describe('Variant #4: literal node inside expression', () => {
        it('should transform es6 template literal to es5', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/literal-inside-expression.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^var *test *= *'abc';$/);
        });
    });

    describe('Variant #5: multiple expressions', () => {
        it('should transform es6 template literal to es5', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/multiple-expressions.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(
                obfuscatedCode,
                /^var *test *= *0x1 *\+ *0x1 *\+ *'\\x20abc\\x20' *\+ *\(0x1 *\+ *0x1\);$/
            );
        });
    });

    describe('Variant #6: tagged template literal', () => {
        it('shouldn\'t transform es6 tagged template literal to es5', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/tagged-template-literal.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(
                obfuscatedCode,
                /tag`foo *\${0x1 *\+ *0x1} *bar`;/
            );
        });
    });

    describe('Variant #7: template literal parentize', () => {
        it('should parentize transformed template literal node', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/template-literal-parentize.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    unicodeEscapeSequence: false
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^\[]\['map']\(\(\) *=> *'foo'\);$/);
        });
    });
});
