import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('TemplateLiteralTransformer', () => {
    describe('variant #1: simple template literal', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/simple-input.js'),
            {
                ...NO_CUSTOM_NODES_PRESET,
                unicodeEscapeSequence: false
            }
        );

        it('should transform es6 template literal to es5', () => {
            assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *'abc\\x20' *\+ *foo;$/);
        });
    });

    describe('variant #1: simple template literal with expression only', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/expression-only.js'),
            {
                ...NO_CUSTOM_NODES_PRESET,
                unicodeEscapeSequence: false
            }
        );

        it('should transform es6 template literal to es5 and add empty literal node before expression node', () => {
            assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *'' *\+ *foo;$/);
        });
    });

    describe('variant #3: literal node inside expression', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/literal-inside-expression.js'),
            {
                ...NO_CUSTOM_NODES_PRESET,
                unicodeEscapeSequence: false
            }
        );

        it('should transform es6 template literal to es5', () => {
            assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *'abc';$/);
        });
    });

    describe('variant #4: multiple expressions', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/multiple-expressions.js'),
            {
                ...NO_CUSTOM_NODES_PRESET,
                unicodeEscapeSequence: false
            }
        );

        it('should transform es6 template literal to es5', () => {
            assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *0x1 *\+ *0x1 *\+ *'\\x20abc\\x20' *\+ *\(0x1 *\+ *0x1\);$/);
        });
    });
});
