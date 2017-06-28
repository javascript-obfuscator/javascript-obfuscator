import { assert } from 'chai';

import { IObfuscationResult } from '../../../src/interfaces/IObfuscationResult';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscator';

import { NO_CUSTOM_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../helpers/getRegExpMatch';
import { readFileAsString } from '../../helpers/readFileAsString';

describe('JavaScriptObfuscator', () => {
    describe('obfuscate (sourceCode: string, customOptions?: IObfuscatorOptions): IObfuscationResult', () => {
        describe('correct source code', () => {
            let obfuscatedCode: string,
                sourceMap: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input-1.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
                sourceMap = obfuscationResult.getSourceMap();
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
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should return an empty obfuscated code', () => {
                assert.isNotOk(obfuscatedCode);
            });
        });

        describe('empty source code with comments', () => {
            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/comments-only.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
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
                    const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_CUSTOM_NODES_PRESET,
                            sourceMap: true
                        }
                    );

                    obfuscatedCode = obfuscationResult.getObfuscatedCode();
                    sourceMap = JSON.parse(obfuscationResult.getSourceMap()).mappings;
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
                    const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_CUSTOM_NODES_PRESET,
                            sourceMap: true,
                            sourceMapMode: 'inline'
                        }
                    );

                    obfuscatedCode = obfuscationResult.getObfuscatedCode();
                    sourceMap = JSON.parse(obfuscationResult.getSourceMap()).mappings;
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
                    const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            sourceMap: true
                        }
                    );

                    obfuscatedCode = obfuscationResult.getObfuscatedCode();

                    const sourceMapObject: any = JSON.parse(obfuscationResult.getSourceMap());

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
            const regExp: RegExp = /^var *test *= *0x\d+;$/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input-1.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should return correct obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('variable inside global scope', () => {
            const regExp: RegExp = /^\(function *\(\) *\{ *var *_0x[\w]+ *= *0x\d+; *\}(\(\)\)|\)\(\));?$/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/block-scope.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should return correct obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('latin literal variable value', () => {
            const stringArrayLatinRegExp: RegExp = /^var _0x(\w){4} *= *\['abc'\];/;
            const stringArrayCallRegExp: RegExp = /var *test *= *_0x(\w){4}\('0x0'\);$/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input-2.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
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
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
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

                        const obfuscationResult1: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                seed: seed
                            }
                        );
                        const obfuscationResult2: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                            code,
                            {
                                seed: seed
                            }
                        );

                        obfuscatedCode1 = obfuscationResult1.getObfuscatedCode();
                        obfuscatedCode2 = obfuscationResult2.getObfuscatedCode();

                        if (obfuscatedCode1 === obfuscatedCode2) {
                            equalsCount++;
                        }
                    }
                });

                it('should return same code every time with same `seed`', () => {
                    assert.equal(equalsCount, samples);
                });
            });

            describe('variant #1: different seed on each run', () => {
                const code: string = readFileAsString('./test/fixtures/sample.js');

                let obfuscatedCode1: string,
                    obfuscatedCode2: string;

                beforeEach(() => {
                    const obfuscationResult1: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            seed: 12345
                        }
                    );
                    const obfuscationResult2: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            seed: 12346
                        }
                    );

                    obfuscatedCode1 = obfuscationResult1.getObfuscatedCode();
                    obfuscatedCode2 = obfuscationResult2.getObfuscatedCode();
                });

                it('should return different obfuscated code with different `seed` option value', () => {
                    assert.notEqual(obfuscatedCode1, obfuscatedCode2);
                });
            });

            describe('variant #2: different seed on each run', () => {
                const code: string = readFileAsString('./test/fixtures/sample.js');

                let obfuscatedCode1: string,
                    obfuscatedCode2: string;

                beforeEach(() => {
                    const obfuscationResult1: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            seed: 0
                        }
                    );
                    const obfuscationResult2: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            seed: 0
                        }
                    );

                    obfuscatedCode1 = obfuscationResult1.getObfuscatedCode();
                    obfuscatedCode2 = obfuscationResult2.getObfuscatedCode();
                });

                it('should return different obfuscated code with different `seed` option value', () => {
                    assert.notEqual(obfuscatedCode1, obfuscatedCode2);
                });
            });

            describe('variant #3: same seed for different source code', () => {
                const code1: string = readFileAsString(__dirname + '/fixtures/simple-input-cyrillic.js');
                const code2: string = readFileAsString(__dirname + '/fixtures/simple-input-2.js');

                const regExp: RegExp = /var (_0x(\w){4}) *= *\['.*'\];/;

                let match1: string,
                    match2: string;

                beforeEach(() => {
                    const obfuscationResult1: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code1,
                        {
                            seed: 123
                        }
                    );
                    const obfuscationResult2: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                        code2,
                        {
                            seed: 123
                        }
                    );

                    const obfuscatedCode1: string = obfuscationResult1.getObfuscatedCode();
                    const obfuscatedCode2: string = obfuscationResult2.getObfuscatedCode();

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
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should keep new.target MetaProperty', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('mangle', () => {
            const regExp: RegExp = /var *a *= *0x1/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/mangle.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        mangle: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should mangle obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });
});
