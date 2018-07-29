import { assert } from 'chai';

import { IObfuscatedCode } from '../../../src/interfaces/source-code/IObfuscatedCode';

import { SourceMapMode } from '../../../src/enums/source-map/SourceMapMode';
import { StringArrayEncoding } from '../../../src/enums/StringArrayEncoding';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

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
                const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
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

        describe('`sourceMap` option is `true`', () => {
            describe('`sourceMapMode` is `separate`', () => {
                let obfuscatedCode: string,
                    sourceMap: string;

                beforeEach(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/simple-input-1.js');
                    const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
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
                    const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
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
                    const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
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
                const regExp: RegExp = /^var *test *= *0x\d+;$/;

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
                const regExp: RegExp = /^var *_0x(\w){4,6} *= *0x\d+;$/;

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
                const regExp: RegExp = /^var *foo_0x(\w){4,6} *= *0x\d+;$/;

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
                const stringArrayCallRegExp: RegExp = /var *foo_0x(\w){4,6} *= *foo_0x(\w){4}\('0x0'\);$/;

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
            const regExp: RegExp = /^\(function *\(\) *\{ *var *_0x[\w]+ *= *0x\d+; *\}(\(\)\)|\)\(\));?$/;

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
            const stringArrayCallRegExp: RegExp = /var *test *= *_0x(\w){4}\('0x0'\);$/;

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
            const stringArrayCallRegExp: RegExp = /var *test *= *_0x(\w){4}\('0x0'\);$/;

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

        describe('mangled identifier names generator', () => {
            const regExp: RegExp = /var *c *= *0x1/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/mangle.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                    }
                ).getObfuscatedCode();
            });

            it('should mangle obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('parse module', () => {
            describe('Variant #1: import', () => {
                const importRegExp: RegExp = /import *{foo} *from *'.\/foo';/;
                const variableDeclarationRegExp: RegExp = /var *test *= *0x1/;

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
                const regExp: RegExp = /export *const *foo *= *0x1;/;

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
                        rotateStringArray: true,
                        stringArray: true,
                        stringArrayEncoding: StringArrayEncoding.Rc4,
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
    });
});
