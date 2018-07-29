import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

describe('ClassDeclarationTransformer', () => {
    describe('transformation of `classDeclaration` node names', () => {
        describe('Variant #1: `classDeclaration` parent block scope is not a `ProgramNode`', () => {
            const classNameIdentifierRegExp: RegExp = /class *(_0x[a-f0-9]{4,6}) *\{/;
            const classCallIdentifierRegExp: RegExp = /new *(_0x[a-f0-9]{4,6}) *\( *\);/;

            let obfuscatedCode: string,
                classNameIdentifier: string,
                classCallIdentifier: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
                classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                classCallIdentifier = getRegExpMatch(obfuscatedCode, classCallIdentifierRegExp);
            });

            it('should transform class name', () => {
                assert.equal(classNameIdentifier, classCallIdentifier);
            });
        });

        describe('Variant #2: `classDeclaration` parent block scope is a `ProgramNode`', () => {
            describe('Variant #1: `renameGlobals` option is disabled', () => {
                const classNameIdentifierRegExp: RegExp = /class *Foo *\{/;
                const classCallIdentifierRegExp: RegExp = /new *Foo *\( *\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/parent-block-scope-is-program-node.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: shouldn\'t transform class name', () => {
                    assert.match(obfuscatedCode, classNameIdentifierRegExp);
                });

                it('match #2: shouldn\'t transform class name', () => {
                    assert.match(obfuscatedCode, classCallIdentifierRegExp);
                });
            });

            describe('Variant #2: `renameGlobals` option is enabled', () => {
                describe('Variant #1: Base', () => {
                    const classNameIdentifierRegExp: RegExp = /class *(_0x[a-f0-9]{4,6}) *\{/;
                    const classCallIdentifierRegExp: RegExp = /new *(_0x[a-f0-9]{4,6}) *\( *\);/;

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/parent-block-scope-is-program-node.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameGlobals: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('match #1: should transform class name', () => {
                        assert.match(obfuscatedCode, classNameIdentifierRegExp);
                    });

                    it('match #2: should transform class name', () => {
                        assert.match(obfuscatedCode, classCallIdentifierRegExp);
                    });
                });

                describe('Variant #2: Two classes. Transformation of identifier inside class method', () => {
                    const identifierRegExp1: RegExp = /const (?:_0x[a-f0-9]{4,6}) *= *0x1;/;
                    const identifierRegExp2: RegExp = /const (?:_0x[a-f0-9]{4,6}) *= *0x2;/;

                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/rename-globals-identifier-transformation.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                renameGlobals: true
                            }
                        ).getObfuscatedCode();
                    });

                    it('match #1: should transform identifier name inside class method', () => {
                        assert.match(obfuscatedCode, identifierRegExp1);
                    });

                    it('match #2: should transform identifier name inside class method', () => {
                        assert.match(obfuscatedCode, identifierRegExp2);
                    });
                });
            });
        });

        describe('Variant #3: already renamed identifiers shouldn\'t be renamed twice', () => {
            const classDeclarationRegExp: RegExp = /class *d *{/;
            const variableDeclarationsRegExp: RegExp = /let *e, *f, *g, *h;/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevent-renaming-of-renamed-identifiers.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                    }
                ).getObfuscatedCode();
            });

            it('Match #1: shouldn\'t rename twice class declaration name', () => {
                assert.match(obfuscatedCode, classDeclarationRegExp);
            });

            it('Match #2: should correctly rename variable declarations', () => {
                assert.match(obfuscatedCode, variableDeclarationsRegExp);
            });
        });

        describe('Variant #5: named export', () => {
            const namedExportRegExp: RegExp = /export class Foo *{}/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/named-export.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform identifiers in named export', () => {
                assert.match(obfuscatedCode, namedExportRegExp);
            });
        });

        describe('Variant #6: default export', () => {
            const classDeclarationRegExp: RegExp = /class _0x[a-f0-9]{4,6} *{}/;
            const defaultExportRegExp: RegExp = /export default _0x[a-f0-9]{4,6};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/default-export.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('Match #1: should transform identifiers in variable declaration', () => {
                assert.match(obfuscatedCode, classDeclarationRegExp);
            });

            it('Match #2: should transform identifiers in default export', () => {
                assert.match(obfuscatedCode, defaultExportRegExp);
            });
        });
    });
});
