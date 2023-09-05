import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../../../../../../src/enums/ObfuscationTarget';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('ScopeIdentifiersTransformer ClassDeclaration identifiers', () => {
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
                describe('Variant #1: base', () => {
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

                describe('Variant #2: target `browser', () => {
                    describe('Variant #1: correct class name references in global scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class A *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\(A\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return A;/;

                        let obfuscatedCode: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-global-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    target: ObfuscationTarget.Browser
                                }
                            ).getObfuscatedCode();
                        });

                        it('match #1: shouldn\'t transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: shouldn\'t transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: shouldn\'t transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });
                    });

                    describe('Variant #2: correct class name references in function scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class (_0x[a-f0-9]{4,6}) *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return (_0x[a-f0-9]{4,6});/;

                        let obfuscatedCode: string;
                        let classNameIdentifier: string;
                        let outerClassNameReferenceIdentifierName: string;
                        let innerClassNameReferenceIdentifierName: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-function-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    target: ObfuscationTarget.Browser
                                }
                            ).getObfuscatedCode();

                            classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                            outerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, outerClassNameReferenceRegExp);
                            innerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #1: should transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: should transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: should transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #4: should generate same identifier names for class name and outer class name reference', () => {
                            assert.equal(classNameIdentifier, outerClassNameReferenceIdentifierName);
                        });

                        it('match #5: should generate same identifier names for class name and inner class name reference', () => {
                            assert.equal(classNameIdentifier, innerClassNameReferenceIdentifierName);
                        });
                    });
                });

                describe('Variant #3: target `node', () => {
                    describe('Variant #1: correct class name references in global scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class A *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\(A\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return A;/;

                        let obfuscatedCode: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-global-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    target: ObfuscationTarget.Node
                                }
                            ).getObfuscatedCode();
                        });

                        it('match #1: shouldn\'t transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: shouldn\'t transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: shouldn\'t transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });
                    });

                    describe('Variant #2: correct class name references in function scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class (_0x[a-f0-9]{4,6}) *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return (_0x[a-f0-9]{4,6});/;

                        let obfuscatedCode: string;
                        let classNameIdentifier: string;
                        let outerClassNameReferenceIdentifierName: string;
                        let innerClassNameReferenceIdentifierName: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-function-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    target: ObfuscationTarget.Node
                                }
                            ).getObfuscatedCode();

                            classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                            outerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, outerClassNameReferenceRegExp);
                            innerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #1: should transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: should transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: should transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #4: should generate same identifier names for class name and outer class name reference', () => {
                            assert.equal(classNameIdentifier, outerClassNameReferenceIdentifierName);
                        });

                        it('match #5: should generate same identifier names for class name and inner class name reference', () => {
                            assert.equal(classNameIdentifier, innerClassNameReferenceIdentifierName);
                        });
                    });
                });

                describe('Variant #3: target `service-worker', () => {
                    describe('Variant #1: correct class name references in global scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class A *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\(A\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return A;/;

                        let obfuscatedCode: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-global-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    target: ObfuscationTarget.ServiceWorker
                                }
                            ).getObfuscatedCode();
                        });

                        it('match #1: shouldn\'t transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: shouldn\'t transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: shouldn\'t transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });
                    });

                    describe('Variant #2: correct class name references in function scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class (_0x[a-f0-9]{4,6}) *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return (_0x[a-f0-9]{4,6});/;

                        let obfuscatedCode: string;
                        let classNameIdentifier: string;
                        let outerClassNameReferenceIdentifierName: string;
                        let innerClassNameReferenceIdentifierName: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-function-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    target: ObfuscationTarget.ServiceWorker
                                }
                            ).getObfuscatedCode();

                            classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                            outerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, outerClassNameReferenceRegExp);
                            innerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #1: should transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: should transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: should transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #4: should generate same identifier names for class name and outer class name reference', () => {
                            assert.equal(classNameIdentifier, outerClassNameReferenceIdentifierName);
                        });

                        it('match #5: should generate same identifier names for class name and inner class name reference', () => {
                            assert.equal(classNameIdentifier, innerClassNameReferenceIdentifierName);
                        });
                    });
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

                describe('Variant #3: target: `browser', () => {
                    describe('Variant #1: correct class name references in global scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class (_0x[a-f0-9]{4,6}) *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return (_0x[a-f0-9]{4,6});/;

                        let obfuscatedCode: string;
                        let classNameIdentifier: string;
                        let outerClassNameReferenceIdentifierName: string;
                        let innerClassNameReferenceIdentifierName: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-global-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    renameGlobals: true,
                                    target: ObfuscationTarget.Browser
                                }
                            ).getObfuscatedCode();

                            classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                            outerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, outerClassNameReferenceRegExp);
                            innerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #1: should transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: should transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: should transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #4: should generate same identifier names for class name and outer class name reference', () => {
                            assert.equal(classNameIdentifier, outerClassNameReferenceIdentifierName);
                        });

                        it('match #5: should generate same identifier names for class name and inner class name reference', () => {
                            assert.equal(classNameIdentifier, innerClassNameReferenceIdentifierName);
                        });
                    });

                    describe('Variant #2: correct class name references in function scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class (_0x[a-f0-9]{4,6}) *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return (_0x[a-f0-9]{4,6});/;

                        let obfuscatedCode: string;
                        let classNameIdentifier: string;
                        let outerClassNameReferenceIdentifierName: string;
                        let innerClassNameReferenceIdentifierName: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-function-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    renameGlobals: true,
                                    target: ObfuscationTarget.Browser
                                }
                            ).getObfuscatedCode();

                            classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                            outerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, outerClassNameReferenceRegExp);
                            innerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #1: should transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: should transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: should transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #4: should generate same identifier names for class name and outer class name reference', () => {
                            assert.equal(classNameIdentifier, outerClassNameReferenceIdentifierName);
                        });

                        it('match #5: should generate same identifier names for class name and inner class name reference', () => {
                            assert.equal(classNameIdentifier, innerClassNameReferenceIdentifierName);
                        });
                    });
                });

                describe('Variant #3: target: `node', () => {
                    describe('Variant #1: correct class name references in global scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class (_0x[a-f0-9]{4,6}) *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return (_0x[a-f0-9]{4,6});/;

                        let obfuscatedCode: string;
                        let classNameIdentifier: string;
                        let outerClassNameReferenceIdentifierName: string;
                        let innerClassNameReferenceIdentifierName: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-global-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    renameGlobals: true,
                                    target: ObfuscationTarget.Node
                                }
                            ).getObfuscatedCode();

                            classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                            outerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, outerClassNameReferenceRegExp);
                            innerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #1: should transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: should transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: should transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #4: should generate same identifier names for class name and outer class name reference', () => {
                            assert.equal(classNameIdentifier, outerClassNameReferenceIdentifierName);
                        });

                        it('match #5: should generate same identifier names for class name and inner class name reference', () => {
                            assert.equal(classNameIdentifier, innerClassNameReferenceIdentifierName);
                        });
                    });

                    describe('Variant #2: correct class name references in function scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class (_0x[a-f0-9]{4,6}) *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return (_0x[a-f0-9]{4,6});/;

                        let obfuscatedCode: string;
                        let classNameIdentifier: string;
                        let outerClassNameReferenceIdentifierName: string;
                        let innerClassNameReferenceIdentifierName: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-function-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    renameGlobals: true,
                                    target: ObfuscationTarget.Node
                                }
                            ).getObfuscatedCode();

                            classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                            outerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, outerClassNameReferenceRegExp);
                            innerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #1: should transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: should transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: should transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #4: should generate same identifier names for class name and outer class name reference', () => {
                            assert.equal(classNameIdentifier, outerClassNameReferenceIdentifierName);
                        });

                        it('match #5: should generate same identifier names for class name and inner class name reference', () => {
                            assert.equal(classNameIdentifier, innerClassNameReferenceIdentifierName);
                        });
                    });
                });

                describe('Variant #4: target: `service-worker', () => {
                    describe('Variant #1: correct class name references in global scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class (_0x[a-f0-9]{4,6}) *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return (_0x[a-f0-9]{4,6});/;

                        let obfuscatedCode: string;
                        let classNameIdentifier: string;
                        let outerClassNameReferenceIdentifierName: string;
                        let innerClassNameReferenceIdentifierName: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-global-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    renameGlobals: true,
                                    target: ObfuscationTarget.ServiceWorker
                                }
                            ).getObfuscatedCode();

                            classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                            outerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, outerClassNameReferenceRegExp);
                            innerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #1: should transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: should transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: should transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #4: should generate same identifier names for class name and outer class name reference', () => {
                            assert.equal(classNameIdentifier, outerClassNameReferenceIdentifierName);
                        });

                        it('match #5: should generate same identifier names for class name and inner class name reference', () => {
                            assert.equal(classNameIdentifier, innerClassNameReferenceIdentifierName);
                        });
                    });

                    describe('Variant #2: correct class name references in function scope', () => {
                        const classNameIdentifierRegExp: RegExp = /class (_0x[a-f0-9]{4,6}) *\{/;
                        const outerClassNameReferenceRegExp: RegExp = /console\['log']\((_0x[a-f0-9]{4,6})\);/;
                        const innerClassNameReferenceRegExp: RegExp = /return (_0x[a-f0-9]{4,6});/;

                        let obfuscatedCode: string;
                        let classNameIdentifier: string;
                        let outerClassNameReferenceIdentifierName: string;
                        let innerClassNameReferenceIdentifierName: string;

                        before(() => {
                            const code: string = readFileAsString(__dirname + '/fixtures/class-name-references-function-scope.js');

                            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                code,
                                {
                                    ...NO_ADDITIONAL_NODES_PRESET,
                                    renameGlobals: true,
                                    target: ObfuscationTarget.ServiceWorker
                                }
                            ).getObfuscatedCode();

                            classNameIdentifier = getRegExpMatch(obfuscatedCode, classNameIdentifierRegExp);
                            outerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, outerClassNameReferenceRegExp);
                            innerClassNameReferenceIdentifierName = getRegExpMatch(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #1: should transform class name', () => {
                            assert.match(obfuscatedCode, classNameIdentifierRegExp);
                        });

                        it('match #2: should transform class name reference outside of class', () => {
                            assert.match(obfuscatedCode, outerClassNameReferenceRegExp);
                        });

                        it('match #3: should transform class name reference inside class', () => {
                            assert.match(obfuscatedCode, innerClassNameReferenceRegExp);
                        });

                        it('match #4: should generate same identifier names for class name and outer class name reference', () => {
                            assert.equal(classNameIdentifier, outerClassNameReferenceIdentifierName);
                        });

                        it('match #5: should generate same identifier names for class name and inner class name reference', () => {
                            assert.equal(classNameIdentifier, innerClassNameReferenceIdentifierName);
                        });
                    });
                });
            });
        });

        describe('Variant #3: preserved identifier names shouldn\'t be used as identifier names', () => {
            const classDeclarationRegExp: RegExp = /class *e *{/;
            const variableDeclarationsRegExp: RegExp = /let f, *g, *h, *i;/;
            const classReferenceRegExp: RegExp = /new e\(\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevent-using-of-preserved-identifiers.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                    }
                ).getObfuscatedCode();
            });

            it('Match #1: shouldn\'t use preserved identifier name as class declaration name', () => {
                assert.match(obfuscatedCode, classDeclarationRegExp);
            });

            it('Match #2: shouldn\'t use preserved identifier name as variable declarations', () => {
                assert.match(obfuscatedCode, variableDeclarationsRegExp);
            });

            it('Match #3: shouldn\'t use preserved identifier name as class reference identifier', () => {
                assert.match(obfuscatedCode, classReferenceRegExp);
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

        describe('Variant #7: default export inline', () => {
            const defaultExportRegExp: RegExp = /export default class *{}/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/default-export-inline.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('Match #1: should produce correct code', () => {
                assert.match(obfuscatedCode, defaultExportRegExp);
            });
        });

        describe('Variant #8: super class expression parenthesis', () => {
            const defaultExportRegExp: RegExp = /class Baz extends *\(Foo *\|| *Bar\) *{}/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/super-class-expression-parenthesis.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('Match #1: should keep super class expression parenthesis', () => {
                assert.match(obfuscatedCode, defaultExportRegExp);
            });
        });
    });
});
