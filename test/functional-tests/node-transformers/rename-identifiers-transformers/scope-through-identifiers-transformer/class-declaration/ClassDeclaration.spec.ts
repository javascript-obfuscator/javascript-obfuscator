import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('ScopeThroughIdentifiersTransformer ClassDeclaration identifiers', () => {
    describe('Variant #1: class declaration is exist', () => {
        const classNameIdentifierRegExp: RegExp = /class *(_0x[a-f0-9]{4,6}) *\{/;
        const classCallIdentifierRegExp: RegExp = /new *(_0x[a-f0-9]{4,6}) *\( *\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/class-call-with-declaration.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    renameGlobals: true,
                    identifierNamesCache: {
                        globalIdentifiers: {
                            'Foo': 'Foo_from_cache'
                        },
                        propertyIdentifiers: {}
                    }
                }
            ).getObfuscatedCode();
        });

        it('should skip transformation of class name', () => {
            assert.match(obfuscatedCode, classNameIdentifierRegExp);
        });

        it('should skip transformation of class name', () => {
            assert.match(obfuscatedCode, classCallIdentifierRegExp);
        });
    });

    describe('Variant #2: class declaration is missing', () => {
        describe('Variant #1: transformation of class call identifier node name based on identifier names cache', () => {
            const classCallIdentifierRegExp: RegExp = /new *Foo_from_cache *\( *\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/class-call-without-declaration.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true,
                        identifierNamesCache: {
                            globalIdentifiers: {
                                'Foo': 'Foo_from_cache'
                            },
                            propertyIdentifiers: {}
                        }
                    }
                ).getObfuscatedCode();
            });

            it('should transform class name', () => {
                assert.match(obfuscatedCode, classCallIdentifierRegExp);
            });
        });

        describe('Variant #2: ignore transformation of class call identifier node name when no identifier names cache value is available', () => {
            const classCallIdentifierRegExp: RegExp = /new *Foo *\( *\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/class-call-without-declaration.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true,
                        identifierNamesCache: {
                            globalIdentifiers: {},
                            propertyIdentifiers: {}
                        }
                    }
                ).getObfuscatedCode();
            });

            it('should not transform class name', () => {
                assert.match(obfuscatedCode, classCallIdentifierRegExp);
            });
        });
    });
});
