import { assert } from 'chai';

import { TDictionary } from '../../../src/types/TDictionary';
import { TInputOptions } from '../../../src/types/options/TInputOptions';
import { TOptionsPreset } from '../../../src/types/options/TOptionsPreset';
import { TTypeFromEnum } from '../../../src/types/utils/TTypeFromEnum';

import { IObfuscationResult } from '../../../src/interfaces/source-code/IObfuscationResult';

import { SourceMapMode } from '../../../src/enums/source-map/SourceMapMode';
import { StringArrayEncoding } from '../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayIndexesType } from '../../../src/enums/node-transformers/string-array-transformers/StringArrayIndexesType';
import { StringArrayWrappersType } from '../../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

import { HIGH_OBFUSCATION_PRESET } from '../../../src/options/presets/HighObfuscation';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { OptionsPreset } from '../../../src/enums/options/presets/OptionsPreset';

import { buildLargeCode } from '../../helpers/buildLargeCode';
import { getRegExpMatch } from '../../helpers/getRegExpMatch';
import { readFileAsString } from '../../helpers/readFileAsString';

describe('JavaScriptObfuscator', () => {
    describe('obfuscate', () => {
        describe('correct source code', () => {
            let obfuscatedCode: string,
                sourceMap: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input-1.js');
                const obfuscatedCodeObject: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
                sourceMap = obfuscatedCodeObject.getSourceMap();
            });

            it('should return correct obfuscated code', () => {
                assert.isOk(obfuscatedCode);
            });

            it('should return empty source map', () => {
                assert.isNotOk(sourceMap);
            });
        });

        describe('Empty or invalid source code', () => {
            describe('empty source code', () => {
                let obfuscatedCode: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/empty-input.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                    ).getObfuscatedCode();
                });

                it('should return an empty obfuscated code', () => {
                    assert.isNotOk(obfuscatedCode);
                });
            });

            describe('empty source code with comments', () => {
                let obfuscatedCode: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/comments-only.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            controlFlowFlattening: true,
                            deadCodeInjection: true
                        }
                    ).getObfuscatedCode();
                });

                it('should return an empty obfuscated code', () => {
                    assert.isNotOk(obfuscatedCode);
                });
            });

            describe('invalid source code type', () => {
                let obfuscatedCode: string;

                beforeEach(() => {
                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        1 as unknown as string
                    ).getObfuscatedCode();
                });

                it('should return an empty obfuscated code', () => {
                    assert.isNotOk(obfuscatedCode);
                });
            });
        });

        describe('`sourceMap` option is `true`', () => {
            describe('`sourceMapMode` is `separate`', () => {
                let obfuscatedCode: string,
                    sourceMap: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/simple-input-1.js');
                    const obfuscatedCodeObject: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            sourceMap: true
                        }
                    );

                    obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
                    sourceMap = JSON.parse(obfuscatedCodeObject.getSourceMap()).mappings;
                });

                it('should return correct obfuscated code', () => {
                    assert.isOk(obfuscatedCode);
                });

                it('should return correct source map', () => {
                    assert.isOk(sourceMap);
                });
            });

            describe('`sourceMapMode` is `inline`', () => {
                const regExp: RegExp = /sourceMappingURL=data:application\/json;base64/;

                let obfuscatedCode: string,
                    sourceMap: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/simple-input-1.js');
                    const obfuscatedCodeObject: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            sourceMap: true,
                            sourceMapMode: SourceMapMode.Inline
                        }
                    );

                    obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
                    sourceMap = JSON.parse(obfuscatedCodeObject.getSourceMap()).mappings;
                });

                it('should return correct obfuscated code', () => {
                    assert.isOk(obfuscatedCode);
                });

                it('should return obfuscated code with inline source map as Base64 string', () => {
                    assert.match(obfuscatedCode, regExp);
                });

                it('should return correct source map', () => {
                    assert.isOk(sourceMap);
                });
            });

            describe('empty source code', () => {
                let obfuscatedCode: string,
                    sourceMapNames: string[],
                    sourceMapSources: string[],
                    sourceMapMappings: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/empty-input.js');
                    const obfuscatedCodeObject: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            sourceMap: true
                        }
                    );

                    obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();

                    const sourceMapObject: any = JSON.parse(obfuscatedCodeObject.getSourceMap());

                    sourceMapNames = sourceMapObject.names;
                    sourceMapSources = sourceMapObject.sources;
                    sourceMapMappings = sourceMapObject.mappings;
                });

                it('should return empty obfuscated code', () => {
                    assert.isNotOk(obfuscatedCode);
                });

                it('should return empty source map property `names`', () => {
                    assert.deepEqual(sourceMapNames, []);
                });

                it('should return empty source map property `sources`', () => {
                    assert.deepEqual(sourceMapSources, []);
                });

                it('should return empty source map property `mappings`', () => {
                    assert.isNotOk(sourceMapMappings);
                });
            });
        });

        describe('variable inside global scope', () => {
            describe('Variant #1: without `renameGlobals` option', () => {
                const regExp: RegExp = /^var test *= *0x\d+;$/;

                let obfuscatedCode: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/simple-input-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET
                        }
                    ).getObfuscatedCode();
                });

                it('should return correct obfuscated code', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #2: with `renameGlobals` option', () => {
                const regExp: RegExp = /^var _0x(\w){4,6} *= *0x\d+;$/;

                let obfuscatedCode: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/simple-input-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameGlobals: true
                        }
                    ).getObfuscatedCode();
                });

                it('should return correct obfuscated code', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #3: with `renameGlobals` and `identifiersPrefix` options', () => {
                const regExp: RegExp = /^var foo_0x(\w){4,6} *= *0x\d+;$/;

                let obfuscatedCode: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/simple-input-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameGlobals: true,
                            identifiersPrefix: 'foo'
                        }
                    ).getObfuscatedCode();
                });

                it('should return correct obfuscated code', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });

            describe('Variant #4: with `stringArray`, `renameGlobals` and `identifiersPrefix` options', () => {
                const stringArrayRegExp: RegExp = /^var foo_0x(\w){4} *= *\['abc'\];/;
                const stringArrayCallRegExp: RegExp = /var foo_0x(\w){4,6} *= *foo_0x(\w){4}\(0x0\);$/;

                let obfuscatedCode: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/simple-input-2.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameGlobals: true,
                            identifiersPrefix: 'foo',
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should return correct obfuscated code', () => {
                    assert.match(obfuscatedCode, stringArrayRegExp);
                });

                it('match #2: should return correct obfuscated code', () => {
                    assert.match(obfuscatedCode, stringArrayCallRegExp);
                });
            });
        });

        describe('variable inside block scope', () => {
            const regExp: RegExp = /^\(function *\(\) *\{ *var _0x[\w]+ *= *0x\d+; *\}(\(\)\)|\)\(\));?$/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/block-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should return correct obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('variables inside global and block scopes', () => {
            describe('Variant #1: with `renameGlobals` and `identifiersPrefix` options', () => {
                const variableDeclaration1: RegExp = /var foo_0x(\w){4,6} *= *0x1;/;
                const variableDeclaration2: RegExp = /var foo_0x(\w){4,6} *= *0x2;/;
                const variableDeclaration3: RegExp = /var _0x(\w){4,6} *= *foo_0x(\w){4,6} *\+ *foo_0x(\w){4,6}/;
                const functionDeclaration: RegExp = /var foo_0x(\w){4,6} *= *function/;

                let obfuscatedCode: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/identifiers-prefix.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            renameGlobals: true,
                            identifiersPrefix: 'foo'
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should return correct obfuscated code', () => {
                    assert.match(obfuscatedCode, variableDeclaration1);
                });

                it('match #2: should return correct obfuscated code', () => {
                    assert.match(obfuscatedCode, variableDeclaration2);
                });

                it('match #3: should return correct obfuscated code', () => {
                    assert.match(obfuscatedCode, variableDeclaration3);
                });

                it('match #4: should return correct obfuscated code', () => {
                    assert.match(obfuscatedCode, functionDeclaration);
                });
            });
        });

        describe('latin literal variable value', () => {
            const stringArrayLatinRegExp: RegExp = /^var _0x(\w){4} *= *\['abc'\];/;
            const stringArrayCallRegExp: RegExp = /var test *= *_0x(\w){4}\(0x0\);$/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should return correct obfuscated code', () => {
                assert.match(obfuscatedCode, stringArrayLatinRegExp);
            });

            it('match #2: should return correct obfuscated code', () => {
                assert.match(obfuscatedCode, stringArrayCallRegExp);
            });
        });

        describe('cyrillic literal variable value', () => {
            const stringArrayCyrillicRegExp: RegExp = /^var _0x(\w){4} *= *\['абц'\];/;
            const stringArrayCallRegExp: RegExp = /var test *= *_0x(\w){4}\(0x0\);$/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input-cyrillic.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should return correct obfuscated code', () => {
                assert.match(obfuscatedCode, stringArrayCyrillicRegExp);
            });

            it('match #2: should return correct obfuscated code', () => {
                assert.match(obfuscatedCode, stringArrayCallRegExp);
            });
        });

        describe('seed', function () {
            this.timeout(60000);

            describe('same seed on each run', () => {
                const code: string = readFileAsString('./test/fixtures/sample.js');
                const samples: number = 100;

                let obfuscatedCode1: string,
                    obfuscatedCode2: string,
                    seed: number = 12345,
                    equalsCount: number = 0;

                beforeEach(() => {
                    for (let i: number = 0; i < samples; i++) {
                        if (i % 20 === 0) {
                            seed++;
                        }

                        obfuscatedCode1 = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                seed: seed
                            }
                        ).getObfuscatedCode();
                        obfuscatedCode2 = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                seed: seed
                            }
                        ).getObfuscatedCode();

                        if (obfuscatedCode1 === obfuscatedCode2) {
                            equalsCount++;
                        }
                    }
                });

                it('should return same code every time with same `seed`', () => {
                    assert.equal(equalsCount, samples);
                });
            });

            describe('Variant #1: different seed on each run', () => {
                const code: string = readFileAsString('./test/fixtures/sample.js');

                let obfuscatedCode1: string,
                    obfuscatedCode2: string;

                beforeEach(() => {
                    obfuscatedCode1 = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            seed: 12345
                        }
                    ).getObfuscatedCode();
                    obfuscatedCode2 = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            seed: 12346
                        }
                    ).getObfuscatedCode();
                });

                it('should return different obfuscated code with different `seed` option value', () => {
                    assert.notEqual(obfuscatedCode1, obfuscatedCode2);
                });
            });

            describe('Variant #2: different seed on each run', () => {
                const code: string = readFileAsString('./test/fixtures/sample.js');

                let obfuscatedCode1: string,
                    obfuscatedCode2: string;

                beforeEach(() => {
                    obfuscatedCode1 = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            seed: 0
                        }
                    ).getObfuscatedCode();
                    obfuscatedCode2 = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            seed: 0
                        }
                    ).getObfuscatedCode();
                });

                it('should return different obfuscated code with different `seed` option value', () => {
                    assert.notEqual(obfuscatedCode1, obfuscatedCode2);
                });
            });

            describe('Variant #3: same seed for different source code', () => {
                const code1: string = readFileAsString(__dirname + '/fixtures/simple-input-cyrillic.js');
                const code2: string = readFileAsString(__dirname + '/fixtures/simple-input-2.js');

                const regExp: RegExp = /var (_0x(\w){4}) *= *\['.*'\];/;

                let match1: string,
                    match2: string;

                beforeEach(() => {
                    const obfuscatedCode1: string = JavaScriptObfuscator.obfuscate(
                        code1,
                        {
                            seed: 123,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                    const obfuscatedCode2: string = JavaScriptObfuscator.obfuscate(
                        code2,
                        {
                            seed: 123,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    match1 = getRegExpMatch(obfuscatedCode1, regExp);
                    match2 = getRegExpMatch(obfuscatedCode2, regExp);
                });

                it('should return different String Array names for different source code with same seed', () => {
                    assert.notEqual(match1, match2);
                });
            });
        });

        /**
         * https://github.com/estools/escodegen/pull/408
         */
        describe('`ObjectPattern` with single `RestElement`', () => {
            const regExp: RegExp = /const {\.\.\.foo} *= *{};/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/object-pattern-single-rest-element.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should not break on `ObjectPattern` with single `RestElement`', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        /**
         * https://github.com/estools/escodegen/pull/415
         */
        describe('Precedence of `SequenceExpression` in computed property', () => {
            const regExp: RegExp = /class Foo *{ *\[\(bar, *baz\)]\(\) *{ *} * *}/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/precedence-of-sequence-expression-in-computed-property.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should generate a valid js code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('new.target MetaProperty', () => {
            const regExp: RegExp = /new\.target *=== *Foo/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/new-target.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should keep new.target MetaProperty', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('import.meta support', () => {
            const regExp: RegExp = /console\['log']\(import\.meta\['url']\);/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/import-meta.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should support `import.meta`', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        /**
         * https://github.com/javascript-obfuscator/javascript-obfuscator/issues/710
         */
        describe('export * as', () => {
            const regExp: RegExp = /export *\* *as foo from *'bar';/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/export-all-named-support.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should support `export * as` syntax', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        /**
         * https://github.com/estools/escodegen/pull/407
         */
        describe('valid exponentiation operator precedence', () => {
            const regExp: RegExp = /var foo *= *\( *0x1 *- *0x2 *\) *\*\* *0x2;/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/exponentiation-operator-precedence.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should support exponentiation operator', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('BigInt support', () => {
            const regExp: RegExp = /return 0x20000000000001n *\+ *0xan *\+ *0xan;/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/bigint-support.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should support BigInt', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Optional chaining support', () => {
            const regExp: RegExp = new RegExp(
                'const _0x(\\w){4,6} *= *{ *' +
                    '\'bar\': *\\(\\) *=> *{} *' +
                '}; *' +
                '_0x(\\w){4,6}\\?\\.\\[\'bar\']\\?\\.\\(\\);'
            );

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/optional-chaining-support.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should support optional chaining', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Nullish coalescing support', () => {
            const regExp: RegExp = /\(foo *\?\? *bar\) *&& *baz;/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/nullish-coalescing-support.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should support nullish coalescing operator', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Numeric separators support', () => {
            const regExp: RegExp = /const foo *= *0x64;/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/numeric-separators-support.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should support numeric separators', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Top-level await support', () => {
            const regExp: RegExp = /await 0x1;/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/top-level-await-support.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET
                    }
                ).getObfuscatedCode();
            });

            it('should support top-level await', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('mangled identifier names generator', () => {
            const regExp: RegExp = /var c *= *0x1/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/mangle.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should mangle obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('mangled shuffled identifier names generator', () => {
            const regExp: RegExp = /var [a-zA-Z] *= *0x1/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/mangle.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator
                    }
                ).getObfuscatedCode();
            });

            it('should mangle obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('dictionary identifier names generator', () => {
            const regExp1: RegExp = /var [abc] *= *0x1; *var [abc] *= *0x2; *var [abc] *= *0x3;/;
            const regExp2: RegExp = /var [ABC] *= *0x4; *var [ABC] *= *0x5; *var [ABC] *= *0x6;/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/dictionary-identifiers.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                        identifiersDictionary: ['a', 'b', 'c']
                    }
                ).getObfuscatedCode();
            });

            it('Match #1: should generate identifier based on the dictionary', () => {
                assert.match(obfuscatedCode, regExp1);
            });

            it('Match #2: should generate identifier based on the dictionary', () => {
                assert.match(obfuscatedCode, regExp2);
            });
        });

        describe('parse module', () => {
            describe('Variant #1: import', () => {
                const importRegExp: RegExp = /import *{foo} *from *'.\/foo';/;
                const variableDeclarationRegExp: RegExp = /var test *= *0x1/;

                let obfuscatedCode: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/parse-module-1.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(code).getObfuscatedCode();
                });

                it('Match #!: should correctly obfuscate a import', () => {
                    assert.match(obfuscatedCode, importRegExp);
                });

                it('Match #2: should correctly obfuscate a module', () => {
                    assert.match(obfuscatedCode, variableDeclarationRegExp);
                });
            });

            describe('Variant #2: export', () => {
                const regExp: RegExp = /export *const foo *= *0x1;/;

                let obfuscatedCode: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/parse-module-2.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(code).getObfuscatedCode();
                });

                it('should correctly obfuscate a module', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });

        describe('3.5k variables', function () {
            this.timeout(200000);

            const expectedValue: number = 3500;

            let result: number;

            beforeEach(() => {
                const code: string = buildLargeCode(expectedValue);

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        compact: true,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        disableConsoleOutput: false,
                        numbersToExpressions: true,
                        simplify: true,
                        renameProperties: true,
                        rotateStringArray: true,
                        stringArray: true,
                        stringArrayEncoding: [
                            StringArrayEncoding.Base64,
                            StringArrayEncoding.Rc4
                        ],
                        stringArrayIndexesType: [
                            StringArrayIndexesType.HexadecimalNumber,
                            StringArrayIndexesType.HexadecimalNumericString
                        ],
                        stringArrayIndexShift: true,
                        stringArrayWrappersChainedCalls: true,
                        stringArrayWrappersCount: 10,
                        stringArrayWrappersParametersMaxCount: 5,
                        stringArrayWrappersType: StringArrayWrappersType.Function,
                        stringArrayThreshold: 1,
                        transformObjectKeys: true,
                        unicodeEscapeSequence: false
                    }
                ).getObfuscatedCode();

                result = eval(obfuscatedCode);
            });

            it('should correctly obfuscate 3.5k variables', () => {
                assert.equal(result, expectedValue);
            });
        });

        describe('Eval `Hello World`', function () {
            this.timeout(20000);

            const samplesCount: number = 100;
            const expectedEvaluationResult: string = 'Hello World';
            let isEvaluationSuccessful: boolean = true;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/eval-hello-world.js');

                for (let i = 0; i < samplesCount; i++) {
                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            compact: false,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 1,
                            deadCodeInjection: true,
                            deadCodeInjectionThreshold: 1,
                            disableConsoleOutput: true,
                            identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                            renameProperties: true,
                            simplify: false,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayWrappersChainedCalls: true,
                            stringArrayWrappersCount: 1,
                            stringArrayWrappersType: StringArrayWrappersType.Variable
                        }
                    ).getObfuscatedCode();

                    const evaluationResult: string = eval(obfuscatedCode);

                    if (evaluationResult !== expectedEvaluationResult) {
                        isEvaluationSuccessful = false;
                        break;
                    }
                }
            });

            it('should correctly evaluate obfuscated code', () => {
                assert.equal(isEvaluationSuccessful, true);
            });
        });

        describe('Identifier names collision between base code and appended string array nodes', function () {
            this.timeout(10000);

            const samplesCount: number = 30;

            let areCollisionsExists: boolean = false;
            let obfuscateFunc: (identifierNamesGenerator: TTypeFromEnum<typeof IdentifierNamesGenerator>) => string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/custom-nodes-identifier-names-collision.js');

                obfuscateFunc = (identifierNamesGenerator: TTypeFromEnum<typeof IdentifierNamesGenerator>) => {
                    const obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            identifierNamesGenerator,
                            compact: false,
                            renameGlobals: true,
                            identifiersDictionary: ['foo', 'bar', 'baz', 'bark', 'hawk', 'foozmos', 'cow', 'chikago'],
                            stringArray: true
                        }
                    ).getObfuscatedCode();

                    return obfuscatedCode;
                };


                [
                    IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
                    IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                ].forEach((identifierNamesGenerator: TTypeFromEnum<typeof IdentifierNamesGenerator>) => {
                    for (let i = 0; i < samplesCount; i++) {
                        try {
                            eval(obfuscateFunc(identifierNamesGenerator));
                        } catch {
                            areCollisionsExists = true;
                            break;
                        }
                    }
                });
            });

            it('It does not create identifier names collision', () => {
                assert.equal(areCollisionsExists, false);
            });
        });

        describe('Prevailing kind of variables', () => {
            const baseParams: TInputOptions = {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 1,
                debugProtection: true,
                debugProtectionInterval: true,
                disableConsoleOutput: false,
                rotateStringArray: true,
                selfDefending: true,
                stringArray: true,
                stringArrayThreshold: 1,
                transformObjectKeys: true,
                unicodeEscapeSequence: false
            };

            describe('`var` kind', function () {
                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-var.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            ...baseParams,
                            stringArrayEncoding: [StringArrayEncoding.Rc4]
                        }
                    ).getObfuscatedCode();
                });

                it('does not break on run', () => {
                    assert.doesNotThrow(() => eval(obfuscatedCode));
                });
            });

            describe('`const` kind', function () {
                describe('Variant #1: StringArrayEncoding: rc4', () => {
                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-const.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                ...baseParams,
                                stringArrayEncoding: [StringArrayEncoding.Rc4]
                            }
                        ).getObfuscatedCode();

                    });

                    it('does not break on run', () => {
                        assert.doesNotThrow(() => eval(obfuscatedCode));
                    });
                });

                describe('Variant #2: StringArrayEncoding: base64', () => {
                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-const.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                ...baseParams,
                                stringArrayEncoding: [StringArrayEncoding.Rc4]
                            }
                        ).getObfuscatedCode();
                    });

                    it('does not break on run', () => {
                        assert.doesNotThrow(() => eval(obfuscatedCode));
                    });
                });
            });

            describe('`let` kind', function () {
                describe('Variant #1: StringArrayEncoding: rc4', () => {
                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-let.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                ...baseParams,
                                stringArrayEncoding: [StringArrayEncoding.Rc4]
                            }
                        ).getObfuscatedCode();

                    });

                    it('does not break on run', () => {
                        assert.doesNotThrow(() => eval(obfuscatedCode));
                    });
                });

                describe('Variant #2: StringArrayEncoding: base64', () => {
                    let obfuscatedCode: string;

                    before(() => {
                        const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-let.js');

                        obfuscatedCode = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                ...NO_ADDITIONAL_NODES_PRESET,
                                ...baseParams,
                                stringArrayEncoding: [StringArrayEncoding.Base64]
                            }
                        ).getObfuscatedCode();

                    });

                    it('does not break on run', () => {
                        assert.doesNotThrow(() => eval(obfuscatedCode));
                    });
                });
            });
        });
    });

    describe('obfuscateMultiple', () => {
        describe('multiple source codes', () => {
            const regExp1: RegExp = /var a0_0x(\w){4,6} *= *0x1;/;
            const regExp2: RegExp = /var a1_0x(\w){4,6} *= *'abc';/;

            let obfuscatedCode1: string;
            let obfuscatedCode2: string;

            beforeEach(() => {
                const sourceCode1: string = readFileAsString(__dirname + '/fixtures/simple-input-1.js');
                const sourceCode2: string = readFileAsString(__dirname + '/fixtures/simple-input-2.js');
                const obfuscationResultsObject = JavaScriptObfuscator.obfuscateMultiple(
                    {
                        sourceCode1,
                        sourceCode2
                    },
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                );

                obfuscatedCode1 = obfuscationResultsObject.sourceCode1.getObfuscatedCode();
                obfuscatedCode2 = obfuscationResultsObject.sourceCode2.getObfuscatedCode();
            });

            it('Match #1: should return correct obfuscated code', () => {
                assert.match(obfuscatedCode1, regExp1);
            });

            it('Match #2: should return correct obfuscated code', () => {
                assert.match(obfuscatedCode2, regExp2);
            });
        });

        describe('invalid source codes object', () => {
            let testFunc: () => TDictionary<IObfuscationResult>;

            beforeEach(() => {
                testFunc = () => JavaScriptObfuscator.obfuscateMultiple(
                    'foo' as any,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                );
            });

            it('Should throw an error if source codes object is not a plain object', () => {
                assert.throw(testFunc, Error);
            });
        });
    });

    describe('getOptionsByPreset', () => {
        describe('Variant #1: base behaviour', () => {
            const optionsPresetName: TOptionsPreset = OptionsPreset.HighObfuscation;

            let options: TInputOptions;

            before(() => {
                options = JavaScriptObfuscator.getOptionsByPreset(optionsPresetName);
            });

            it('Should return options for passed options preset name', () => {
                assert.deepEqual(options, HIGH_OBFUSCATION_PRESET);
            });
        });

        describe('Variant #2: unknown options preset name', () => {
            const optionsPresetName: TOptionsPreset = 'foobar' as TOptionsPreset;

            let testFunc: () => TInputOptions;

            before(() => {
                testFunc = () => JavaScriptObfuscator.getOptionsByPreset(optionsPresetName);
            });

            it('Should throws an error when unknown option preset is passed', () => {
                assert.throws(testFunc, 'Options for preset name `foobar` are not found');
            });
        });
    });
});
