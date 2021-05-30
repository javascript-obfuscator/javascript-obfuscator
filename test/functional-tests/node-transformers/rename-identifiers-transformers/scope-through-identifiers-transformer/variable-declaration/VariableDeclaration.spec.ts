import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('ScopeThroughIdentifiersTransformer VariableDeclaration identifiers', () => {
    describe('Variant #1: variable declaration is exist', () => {
        const variableIdentifierRegExp: RegExp = /var *(_0x[a-f0-9]{4,6}) *= *0x1/;
        const variableReferenceIdentifierRegExp: RegExp = /(_0x[a-f0-9]{4,6});/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/variable-reference-with-declaration.js');

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

        it('should skip transformation of variable declaration name', () => {
            assert.match(obfuscatedCode, variableIdentifierRegExp);
        });

        it('should skip transformation of variable reference name', () => {
            assert.match(obfuscatedCode, variableReferenceIdentifierRegExp);
        });
    });

    describe('Variant #2: variable declaration is missing', () => {
        describe('Variant #1: global variable reference scope', () => {
            describe('Variant #1: identifier names cache value is exists', () => {
                const variableReferenceIdentifierRegExp: RegExp = /foo_from_cache;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-reference-without-declaration-global-scope.js');

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

                it('should transform variable reference name', () => {
                    assert.match(obfuscatedCode, variableReferenceIdentifierRegExp);
                });
            });

            describe('Variant #2: ignore transformation of variable reference identifier node name when no identifier names cache value is available', () => {
                const variableReferenceIdentifierRegExp: RegExp = /foo;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-reference-without-declaration-global-scope.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameGlobals: true,
                            identifierNamesCache: {}
                        }
                    ).getObfuscatedCode();
                });

                it('should not transform variable reference name', () => {
                    assert.match(obfuscatedCode, variableReferenceIdentifierRegExp);
                });
            });

            describe('Variant #3: ignore transformation of variable reference identifier node name when this name is reserved', () => {
                const variableReferenceIdentifierRegExp: RegExp = /foo;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-reference-without-declaration-global-scope.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameGlobals: true,
                            identifierNamesCache: {
                                'foo': 'foo_from_cache'
                            },
                            reservedNames: ['^foo$']
                        }
                    ).getObfuscatedCode();
                });

                it('should not transform variable reference name', () => {
                    assert.match(obfuscatedCode, variableReferenceIdentifierRegExp);
                });
            });
        });

        describe('Variant #2: local variable reference scope', () => {
            describe('Variant #1: identifier names cache value is exists', () => {
                const variableReferenceIdentifierRegExp: RegExp = /foo_from_cache;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-reference-without-declaration-local-scope.js');

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

                it('should transform variable reference name', () => {
                    assert.match(obfuscatedCode, variableReferenceIdentifierRegExp);
                });
            });

            describe('Variant #2: ignore transformation of variable reference identifier node name when no identifier names cache value is available', () => {
                const variableReferenceIdentifierRegExp: RegExp = /foo;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-reference-without-declaration-local-scope.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameGlobals: true,
                            identifierNamesCache: {}
                        }
                    ).getObfuscatedCode();
                });

                it('should not transform variable reference name', () => {
                    assert.match(obfuscatedCode, variableReferenceIdentifierRegExp);
                });
            });

            describe('Variant #3 ignore transformation of variable reference identifier node name when this name is reserved', () => {
                const variableReferenceIdentifierRegExp: RegExp = /foo;/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/variable-reference-without-declaration-local-scope.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameGlobals: true,
                            identifierNamesCache: {
                                'foo': 'foo_from_cache'
                            },
                            reservedNames: ['^foo$']
                        }
                    ).getObfuscatedCode();
                });

                it('should not transform variable reference name', () => {
                    assert.match(obfuscatedCode, variableReferenceIdentifierRegExp);
                });
            });
        });
    });
});
