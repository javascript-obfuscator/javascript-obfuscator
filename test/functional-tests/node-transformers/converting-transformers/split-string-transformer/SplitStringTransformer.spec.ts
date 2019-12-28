import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('SplitStringTransformer', () => {
    let obfuscatedCode: string;
    
    describe('Variant #1: simple string literal', () => {
        it('should transform string literal to binary expression', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    splitStrings: true,
                    splitStringsChunkLength: 2
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^var *test *= *'ab' *\+ *'cd' *\+ *'ef' *\+ *'g';$/);
        });
    });

    describe('Variant #2: `splitStrings` option is disabled', () => {
        it('should keep original string literal', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    splitStrings: false,
                    splitStringsChunkLength: 10
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^var *test *= *'abcdefg';$/);
        });
    });

    describe('Variant #3: `splitStringsChunkLength` value larger than string size', () => {
        it('should keep original string literal', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    splitStrings: true,
                    splitStringsChunkLength: 10
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^var *test *= *'abcdefg';$/);
        });
    });

    describe('Variant #4: `splitStringsChunkLength` value is `0`', () => {
        it('should throw an validation error ', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            const testFunc = () => JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    splitStrings: true,
                    splitStringsChunkLength: 0
                }
            );

            assert.throws(testFunc, /validation failed/i);
        });
    });

    describe('Variant #5: strings concatenation', () => {
        it('should transform string literals to binary expressions', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/strings-concatenation.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    splitStrings: true,
                    splitStringsChunkLength: 2
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^var *test *= *'ab' *\+ *'cd' *\+ *\( *'ef' *\+ *'g' *\);$/);
        });
    });

    describe('Variant #6: object key string literal', () => {
        it('should keep original string literal', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-key-string-literal.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    splitStrings: true,
                    splitStringsChunkLength: 2
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^var *test *= *{'abcdefg' *: *0x1};$/);
        });
    });

    describe('Variant #7: object computed key string literal', () => {
        it('should transform string literal to binary expression', () => {
            const code: string = readFileAsString(__dirname + '/fixtures/object-computed-key-string-literal.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    splitStrings: true,
                    splitStringsChunkLength: 2
                }
            ).getObfuscatedCode();

            assert.match(obfuscatedCode,  /^var *test *= *{\['ab' *\+ *'cd' *\+ *'ef' *\+ *'g'] *: *0x1};$/);
        });
    });
});
