import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('ScopeThroughIdentifiersTransformer FunctionDeclaration identifiers', () => {
    describe('Variant #1: function declaration is exist', () => {
        const functionNameIdentifierRegExp: RegExp = /function *(_0x[a-f0-9]{4,6}) *\(\) *\{/;
        const functionCallIdentifierRegExp: RegExp = /(_0x[a-f0-9]{4,6}) *\( *\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/function-call-with-declaration.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    renameGlobals: true,
                    identifierNamesCache: {
                        'foo': 'foo_from_cache'
                    }
                }
            ).getObfuscatedCode();
        });

        it('should skip transformation of function name', () => {
            assert.match(obfuscatedCode, functionNameIdentifierRegExp);
        });

        it('should skip transformation of function name', () => {
            assert.match(obfuscatedCode, functionCallIdentifierRegExp);
        });
    });

    describe('Variant #2: function declaration is missing', () => {
        describe('Variant #1: transformation of function call identifier node name based on identifier names cache', () => {
            const functionCallIdentifierRegExp: RegExp = /foo_from_cache *\( *\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/function-call-without-declaration.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true,
                        identifierNamesCache: {
                            'foo': 'foo_from_cache'
                        }
                    }
                ).getObfuscatedCode();
            });

            it('should transform function name', () => {
                assert.match(obfuscatedCode, functionCallIdentifierRegExp);
            });
        });

        describe('Variant #2: ignore transformation of function call identifier node name when no identifier names cache value is available', () => {
            const functionCallIdentifierRegExp: RegExp = /foo *\( *\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/function-call-without-declaration.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true,
                        identifierNamesCache: {}
                    }
                ).getObfuscatedCode();
            });

            it('should not transform function name', () => {
                assert.match(obfuscatedCode, functionCallIdentifierRegExp);
            });
        });
    });
});
