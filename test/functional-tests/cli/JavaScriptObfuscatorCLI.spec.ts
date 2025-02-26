import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as sinon from 'sinon';
import { resolveSources } from 'source-map-resolve';

import { assert } from 'chai';

import { ISourceMap } from '../../../src/interfaces/source-code/ISourceMap';

import { StdoutWriteMock } from '../../mocks/StdoutWriteMock';

import { JavaScriptObfuscatorCLI } from '../../../src/JavaScriptObfuscatorCLIFacade';
import { parseSourceMapFromObfuscatedCode } from '../../helpers/parseSourceMapFromObfuscatedCode';

describe('JavaScriptObfuscatorCLI', function (): void {
    this.timeout(100000);

    const expectedError: RegExp = /Given input path must be a valid/;

    const fixturesDirName: string = path.join('test', 'fixtures');
    const fixtureFileName: string = 'sample.js';
    const fixtureFilePath: string = path.join(fixturesDirName, fixtureFileName);
    const outputDirName: string = path.join('test', 'tmp');
    const outputFileName: string = 'sample-obfuscated.js';
    const outputFilePath: string = path.join(outputDirName, outputFileName);
    const configDirName: string = path.join('test', 'fixtures');
    const configFileName: string = 'config.js';
    const configFilePath: string = path.join(configDirName, configFileName);


    describe('run', () => {
        before(() => {
            mkdirp.sync(outputDirName);
        });

        describe('Variant #1: obfuscation of single file', () => {
            describe('--output` option is set', () => {
                describe('Variant #1: input file path is before options', () => {
                    let isFileExist: boolean;

                    before(() => {
                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            fixtureFilePath,
                            '--output',
                            outputFilePath,
                            '--compact',
                            'true',
                            '--self-defending',
                            '0'
                        ]);

                        isFileExist = fs.existsSync(outputFilePath);
                    });

                    it('should create file with obfuscated code in `--output` directory', () => {
                        assert.equal(isFileExist, true);
                    });

                    after(() => {
                        fs.unlinkSync(outputFilePath);
                    });
                });

                describe('Variant #2: input file path is after options', () => {
                    let isFileExist: boolean;

                    before(() => {
                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            '--output',
                            outputFilePath,
                            '--compact',
                            'true',
                            '--self-defending',
                            '0',
                            fixtureFilePath
                        ]);

                        isFileExist = fs.existsSync(outputFilePath);
                    });

                    it('should create file with obfuscated code in `--output` directory', () => {
                        assert.equal(isFileExist, true);
                    });

                    after(() => {
                        fs.unlinkSync(outputFilePath);
                    });
                });
            });

            describe('`--output` option isn\'t set', () => {
                describe('Variant #1: default behaviour', () => {
                    let outputFixturesFilePath: string,
                        isFileExist: boolean;

                    before(() => {
                        outputFixturesFilePath = path.join(fixturesDirName, outputFileName);

                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            fixtureFilePath
                        ]);

                        isFileExist = fs.existsSync(outputFixturesFilePath);
                    });

                    it(`should create file \`${outputFileName}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                        assert.equal(isFileExist, true);
                    });

                    after(() => {
                        fs.unlinkSync(outputFixturesFilePath);
                    });
                });

                describe('Variant #2: invalid input file path', () => {
                    let testFunc: () => void;

                    before(() => {
                        testFunc = () => JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            path.join('wrong', 'file', 'path')
                        ]);
                    });

                    it(`should throw an error`, () => {
                        assert.throws(testFunc, expectedError);
                    });
                });

                describe('Variant #3: input file extension isn\'t `.js`', () => {
                    const expectedError: RegExp = /Given input path must be a valid/;
                    const outputFileName: string = 'sample-obfuscated.ts';
                    const outputFilePath: string = path.join(outputDirName, outputFileName);

                    let testFunc: () => void;

                    before(() => {
                        fs.writeFileSync(outputFilePath, 'data');

                        testFunc = () => JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            outputFilePath
                        ]);
                    });

                    it(`should throw an error`, () => {
                        assert.throws(testFunc, expectedError);
                    });

                    after(() => {
                        fs.unlinkSync(outputFilePath);
                    });
                });
            });

            describe('--exclude option', () => {
                describe('Variant #1: --exclude option is pointed on different file', () => {
                    let isFileExist: boolean;

                    before(() => {
                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            fixtureFilePath,
                            '--output',
                            outputFilePath,
                            '--exclude',
                            path.join('**', 'foo.js')
                        ]);

                        isFileExist = fs.existsSync(outputFilePath);
                    });

                    it('should create file with obfuscated code in `--output` directory', () => {
                        assert.equal(isFileExist, true);
                    });
                });

                describe('Variant #2: --exclude option is pointed on input file', () => {
                    let testFunc: () => void;

                    before(() => {
                        testFunc = () => JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            fixtureFilePath,
                            '--output',
                            outputFilePath,
                            '--exclude',
                            path.join('**', 'sample.js')
                        ]);
                    });

                    it('should throw an error', () => {
                        assert.throws(testFunc, expectedError);
                    });

                    after(() => {
                        fs.unlinkSync(outputFilePath);
                    });
                });
            });
        });

        describe('Variant #2: obfuscation of directory', () => {
            describe(`Variant #1: default behaviour`, () => {
                const directoryPath: string = path.join(fixturesDirName, 'directory-obfuscation');
                const outputFileName1: string = 'foo-obfuscated.js';
                const outputFileName2: string = 'bar-obfuscated.js';
                const outputFileName3: string = 'baz-obfuscated.js';
                const readFileEncoding = 'utf8';
                const regExp1: RegExp = /^var a1_0x(\w){4,6} *= *0x1;$/;
                const regExp2: RegExp = /^var a0_0x(\w){4,6} *= *0x2;$/;

                let outputFixturesFilePath1: string,
                    outputFixturesFilePath2: string,
                    outputFixturesFilePath3: string,
                    isFileExist1: boolean,
                    isFileExist2: boolean,
                    isFileExist3: boolean,
                    fileContent1: string,
                    fileContent2: string;

                before(() => {
                    outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                    outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);
                    outputFixturesFilePath3 = path.join(directoryPath, outputFileName3);

                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        directoryPath,
                        '--rename-globals',
                        'true'
                    ]);

                    isFileExist1 = fs.existsSync(outputFixturesFilePath1);
                    isFileExist2 = fs.existsSync(outputFixturesFilePath2);
                    isFileExist3 = fs.existsSync(outputFixturesFilePath3);

                    fileContent1 = fs.readFileSync(outputFixturesFilePath1, readFileEncoding);
                    fileContent2 = fs.readFileSync(outputFixturesFilePath2, readFileEncoding);
                });

                it(`should create file \`${outputFileName1}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                    assert.equal(isFileExist1, true);
                });

                it(`should create file \`${outputFileName2}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                    assert.equal(isFileExist2, true);
                });

                it(`shouldn't create file \`${outputFileName3}\` in \`${fixturesDirName}\` directory`, () => {
                    assert.equal(isFileExist3, false);
                });

                it(`match #1: should create file with obfuscated code with prefixed identifier`, () => {
                    assert.match(fileContent1, regExp1);
                });

                it(`match #2: should create file with obfuscated code with prefixed identifier`, () => {
                    assert.match(fileContent2, regExp2);
                });

                after(() => {
                    rimraf.sync(outputFixturesFilePath1);
                    rimraf.sync(outputFixturesFilePath2);
                });
            });

            describe('Variant #2: obfuscation of directory with `identifiersPrefix` option value', () => {
                const directoryPath: string = path.join(fixturesDirName, 'directory-obfuscation');
                const identifiersPrefix: string = 'foo';
                const outputFileName1: string = 'foo-obfuscated.js';
                const outputFileName2: string = 'bar-obfuscated.js';
                const readFileEncoding = 'utf8';
                const regExp1: RegExp = /^var foo1_0x(\w){4,6} *= *0x1;$/;
                const regExp2: RegExp = /^var foo0_0x(\w){4,6} *= *0x2;$/;

                let outputFixturesFilePath1: string,
                    outputFixturesFilePath2: string,
                    isFileExist1: boolean,
                    isFileExist2: boolean,
                    fileContent1: string,
                    fileContent2: string;

                before(() => {
                    outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                    outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);

                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        directoryPath,
                        '--identifiers-prefix',
                        identifiersPrefix,
                        '--rename-globals',
                        'true'
                    ]);

                    isFileExist1 = fs.existsSync(outputFixturesFilePath1);
                    isFileExist2 = fs.existsSync(outputFixturesFilePath2);

                    fileContent1 = fs.readFileSync(outputFixturesFilePath1, readFileEncoding);
                    fileContent2 = fs.readFileSync(outputFixturesFilePath2, readFileEncoding);
                });

                it(`should create file \`${outputFileName1}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                    assert.equal(isFileExist1, true);
                });

                it(`should create file \`${outputFileName2}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                    assert.equal(isFileExist2, true);
                });

                it(`match #1: should create file with obfuscated code with prefixed identifier`, () => {
                    assert.match(fileContent1, regExp1);
                });

                it(`match #2: should create file with obfuscated code with prefixed identifier`, () => {
                    assert.match(fileContent2, regExp2);
                });

                after(() => {
                    rimraf.sync(outputFixturesFilePath1);
                    rimraf.sync(outputFixturesFilePath2);
                });
            });

            describe('Variant #3: obfuscation of directory with `output` option', () => {
                const directoryPath: string = path.join(fixturesDirName, 'directory-obfuscation');
                const outputDirectoryName: string = 'obfuscated';
                const outputDirectoryPath: string = path.join(directoryPath, outputDirectoryName);
                const outputFileName1: string = 'foo.js';
                const outputFileName2: string = 'bar.js';
                const outputFileName3: string = 'baz.js';

                let outputFixturesFilePath1: string,
                    outputFixturesFilePath2: string,
                    outputFixturesFilePath3: string,
                    isFileExist1: boolean,
                    isFileExist2: boolean,
                    isFileExist3: boolean;

                before(() => {
                    outputFixturesFilePath1 = path.join(outputDirectoryPath, outputFileName1);
                    outputFixturesFilePath2 = path.join(outputDirectoryPath, outputFileName2);
                    outputFixturesFilePath3 = path.join(outputDirectoryPath, outputFileName3);

                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        directoryPath,
                        '--output',
                        outputDirectoryPath
                    ]);

                    isFileExist1 = fs.existsSync(outputFixturesFilePath1);
                    isFileExist2 = fs.existsSync(outputFixturesFilePath2);
                    isFileExist3 = fs.existsSync(outputFixturesFilePath3);
                });

                it(
                    `should create file \`${outputFileName1}\` with obfuscated code in ` +
                    `\`${path.join(fixturesDirName, outputDirectoryName)}\` directory`,
                    () => {
                        assert.equal(isFileExist1, true);
                    }
                );

                it(
                    `should create file \`${outputFileName2}\` with obfuscated code in ` +
                    `\`${path.join(fixturesDirName, outputDirectoryName)}\` directory`,
                    () => {
                        assert.equal(isFileExist2, true);
                    }
                );

                it(
                    `shouldn't create file \`${outputFileName3}\` in ` +
                    `\`${path.join(fixturesDirName, outputDirectoryName)}\` directory`,
                    () => {
                        assert.equal(isFileExist3, false);
                    }
                );

                after(() => {
                    rimraf.sync(outputDirectoryPath);
                });
            });

            describe('Variant #4: --exclude option', () => {
                describe('Variant #1: --exclude option is pointed on different file', () => {
                    const directoryPath: string = path.join(fixturesDirName, 'directory-obfuscation');
                    const outputFileName1: string = 'foo-obfuscated.js';
                    const outputFileName2: string = 'bar-obfuscated.js';
                    const outputFileName3: string = 'baz-obfuscated.js';
                    const readFileEncoding = 'utf8';
                    const regExp1: RegExp = /^var a1_0x(\w){4,6} *= *0x1;$/;
                    const regExp2: RegExp = /^var a0_0x(\w){4,6} *= *0x2;$/;

                    let outputFixturesFilePath1: string,
                        outputFixturesFilePath2: string,
                        outputFixturesFilePath3: string,
                        isFileExist1: boolean,
                        isFileExist2: boolean,
                        isFileExist3: boolean,
                        fileContent1: string,
                        fileContent2: string;

                    before(() => {
                        outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                        outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);
                        outputFixturesFilePath3 = path.join(directoryPath, outputFileName3);

                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            directoryPath,
                            '--exclude',
                            path.join('**', 'bark.js'),
                            '--rename-globals',
                            'true'
                        ]);

                        isFileExist1 = fs.existsSync(outputFixturesFilePath1);
                        isFileExist2 = fs.existsSync(outputFixturesFilePath2);
                        isFileExist3 = fs.existsSync(outputFixturesFilePath3);

                        fileContent1 = fs.readFileSync(outputFixturesFilePath1, readFileEncoding);
                        fileContent2 = fs.readFileSync(outputFixturesFilePath2, readFileEncoding);
                    });

                    it(`should create file \`${outputFileName1}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                        assert.equal(isFileExist1, true);
                    });

                    it(`should create file \`${outputFileName2}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                        assert.equal(isFileExist2, true);
                    });

                    it(`shouldn't create file \`${outputFileName3}\` in \`${fixturesDirName}\` directory`, () => {
                        assert.equal(isFileExist3, false);
                    });

                    it(`match #1: should create file with obfuscated code with prefixed identifier`, () => {
                        assert.match(fileContent1, regExp1);
                    });

                    it(`match #2: should create file with obfuscated code with prefixed identifier`, () => {
                        assert.match(fileContent2, regExp2);
                    });

                    after(() => {
                        rimraf.sync(outputFixturesFilePath1);
                        rimraf.sync(outputFixturesFilePath2);
                    });
                });

                describe('Variant #2: --exclude option is pointed on file under obfuscating directory', () => {
                    const directoryPath: string = path.join(fixturesDirName, 'directory-obfuscation');
                    const outputFileName1: string = 'foo-obfuscated.js';
                    const outputFileName2: string = 'bar-obfuscated.js';
                    const outputFileName3: string = 'baz-obfuscated.js';
                    const readFileEncoding = 'utf8';
                    const regExp1: RegExp = /^var a0_0x(\w){4,6} *= *0x2;$/;

                    let outputFixturesFilePath1: string,
                        outputFixturesFilePath2: string,
                        outputFixturesFilePath3: string,
                        isFileExist1: boolean,
                        isFileExist2: boolean,
                        isFileExist3: boolean,
                        fileContent1: string;

                    before(() => {
                        outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                        outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);
                        outputFixturesFilePath3 = path.join(directoryPath, outputFileName3);

                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            directoryPath,
                            '--exclude',
                            path.join('**', 'foo.js'),
                            '--rename-globals',
                            'true'
                        ]);

                        isFileExist1 = fs.existsSync(outputFixturesFilePath1);
                        isFileExist2 = fs.existsSync(outputFixturesFilePath2);
                        isFileExist3 = fs.existsSync(outputFixturesFilePath3);

                        fileContent1 = fs.readFileSync(outputFixturesFilePath2, readFileEncoding);
                    });

                    it(`shouldn't create file \`${outputFileName1}\` in \`${fixturesDirName}\` directory`, () => {
                        assert.equal(isFileExist1, false);
                    });

                    it(`should create file \`${outputFileName2}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                        assert.equal(isFileExist2, true);
                    });

                    it(`shouldn't create file \`${outputFileName3}\` in \`${fixturesDirName}\` directory`, () => {
                        assert.equal(isFileExist3, false);
                    });

                    it(`match #1: should create file with obfuscated code with prefixed identifier`, () => {
                        assert.match(fileContent1, regExp1);
                    });

                    after(() => {
                        rimraf.sync(outputFixturesFilePath1);
                        rimraf.sync(outputFixturesFilePath2);
                    });
                });
            });

            describe('Variant #5: obfuscation of directory with `--dangerously_overwrite` option', () => {
                const directoryPath: string = path.join(fixturesDirName, 'directory-obfuscation');
                const outputFileName1: string = 'foo.js';
                const outputFileName2: string = 'bar.js';
                const outputFileName3: string = 'baz.js';
                const readFileEncoding = 'utf8';
                const regExp1: RegExp = /^var a1_0x(\w){4,6} *= *0x1;$/;
                const regExp2: RegExp = /^var a0_0x(\w){4,6} *= *0x2;$/;

                let outputFixturesFilePath1: string,
                    outputFixturesFilePath2: string,
                    outputFixturesFilePath3: string,
                    isFileExist1: boolean,
                    isFileExist2: boolean,
                    isFileExist3: boolean,
                    fileContent1: string,
                    fileContent2: string;

                before(() => {
                    outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                    outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);
                    outputFixturesFilePath3 = path.join(directoryPath, outputFileName3);

                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        directoryPath,
                        '--dangerously_overwrite',
                        'true',
                        '--rename-globals',
                        'true'
                    ]);

                    isFileExist1 = fs.existsSync(outputFixturesFilePath1);
                    isFileExist2 = fs.existsSync(outputFixturesFilePath2);
                    isFileExist3 = fs.existsSync(outputFixturesFilePath3);

                    fileContent1 = fs.readFileSync(outputFixturesFilePath1, readFileEncoding);
                    fileContent2 = fs.readFileSync(outputFixturesFilePath2, readFileEncoding);
                });

                it(`should overwrite file \`${outputFileName1}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                    assert.equal(isFileExist1, true);
                });

                it(`should overwrite file \`${outputFileName2}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                    assert.equal(isFileExist2, true);
                });

                it(`shouldn't create file \`${outputFileName3}\` in \`${fixturesDirName}\` directory`, () => {
                    assert.equal(isFileExist3, false);
                });

                it(`match #1: should overwrite file with obfuscated code with prefixed identifier`, () => {
                    assert.match(fileContent1, regExp1);
                });

                it(`match #2: should overwrite file with obfuscated code with prefixed identifier`, () => {
                    assert.match(fileContent2, regExp2);
                });

                after(() => {
                    rimraf.sync(outputFixturesFilePath1);
                    rimraf.sync(outputFixturesFilePath2);
                });
            });
        });

        describe('`--sourceMap` option is set', () => {
            const outputSourceMapPath: string = `${outputFilePath}.map`;

            describe('Variant #1: `--sourceMapMode` option value is `separate`', () => {
                describe('Variant #1: default behaviour', () => {
                    let isFileExist: boolean,
                        resolvedSources: string,
                        sourceCodeContent: string,
                        sourceMapObject: ISourceMap;

                    before((done) => {
                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            fixtureFilePath,
                            '--output',
                            outputFilePath,
                            '--compact',
                            'true',
                            '--self-defending',
                            '0',
                            '--source-map',
                            'true'
                        ]);

                        try {
                            sourceCodeContent = fs.readFileSync(fixtureFilePath, { encoding: 'utf8' });
                            const sourceMapContent: string = fs.readFileSync(outputSourceMapPath, { encoding: 'utf8' });

                            isFileExist = true;
                            sourceMapObject = JSON.parse(sourceMapContent);

                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                resolvedSources = typeof result.sourcesContent[0] === 'string'
                                    ? result.sourcesContent[0]
                                    : '';
                                done();
                            });
                        } catch (e) {
                            isFileExist = false;
                        }
                    });

                    it('should create file with source map in the same directory as output file', () => {
                        assert.equal(isFileExist, true);
                    });

                    it('source map from created file should contains property `version`', () => {
                        assert.property(sourceMapObject, 'version');
                    });

                    it('source map from created file should contains property `names`', () => {
                        assert.property(sourceMapObject, 'names');
                    });

                    it('should resolve correct sources from source map', () => {
                        assert.equal(resolvedSources, sourceCodeContent);
                    });

                    after(() => {
                        rimraf.sync(outputFilePath);
                        rimraf.sync(outputSourceMapPath);
                    });
                });

                describe('Variant #2: `sourceMapBaseUrl` option is set', () => {
                    let isFileExist: boolean,
                        resolvedSources: string,
                        sourceCodeContent: string,
                        sourceMapObject: ISourceMap;

                    before((done) => {
                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            fixtureFilePath,
                            '--output',
                            outputFilePath,
                            '--compact',
                            'true',
                            '--self-defending',
                            '0',
                            '--source-map',
                            'true',
                            '--source-map-base-url',
                            'http://localhost:9000/'
                        ]);

                        try {
                            sourceCodeContent = fs.readFileSync(fixtureFilePath, { encoding: 'utf8' });
                            const sourceMapContent: string = fs.readFileSync(outputSourceMapPath, { encoding: 'utf8' });

                            isFileExist = true;
                            sourceMapObject = JSON.parse(sourceMapContent);

                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                resolvedSources = typeof result.sourcesContent[0] === 'string'
                                    ? result.sourcesContent[0]
                                    : '';
                                done();
                            });
                        } catch (e) {
                            isFileExist = false;
                        }
                    });

                    it('should create file with source map in the same directory as output file', () => {
                        assert.equal(isFileExist, true);
                    });

                    it('source map from created file should contains property `version`', () => {
                        assert.property(sourceMapObject, 'version');
                    });

                    it('source map from created file should contains property `names`', () => {
                        assert.property(sourceMapObject, 'names');
                    });

                    it('should resolve correct sources from source map', () => {
                        assert.equal(resolvedSources, sourceCodeContent);
                    });

                    after(() => {
                        fs.unlinkSync(outputFilePath);
                        fs.unlinkSync(outputSourceMapPath);
                    });
                });

                describe('Variant #3: `--sourceMapFileName` option is set', () => {
                    const sourceMapFileName: string = 'test';
                    const sourceMapFilePath: string = `${sourceMapFileName}.js.map`;
                    const outputSourceMapFilePath: string = path.join(outputDirName, sourceMapFilePath);

                    let isFileExist: boolean,
                        resolvedSources: string,
                        sourceCodeContent: string,
                        sourceMapObject: ISourceMap;

                    before((done) => {
                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            fixtureFilePath,
                            '--output',
                            outputFilePath,
                            '--compact',
                            'true',
                            '--self-defending',
                            '0',
                            '--source-map',
                            'true',
                            '--source-map-file-name',
                            sourceMapFileName
                        ]);

                        try {
                            sourceCodeContent = fs.readFileSync(fixtureFilePath, { encoding: 'utf8' });
                            const sourceMapContent: string = fs.readFileSync(outputSourceMapFilePath, { encoding: 'utf8' });

                            isFileExist = true;
                            sourceMapObject = JSON.parse(sourceMapContent);

                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                resolvedSources = typeof result.sourcesContent[0] === 'string'
                                    ? result.sourcesContent[0]
                                    : '';
                                done();
                            });
                        } catch (e) {
                            isFileExist = false;
                        }
                    });

                    it('should create source map file with given name in the same directory as output file', () => {
                        assert.equal(isFileExist, true);
                    });

                    it('source map from created file should contains property `version`', () => {
                        assert.property(sourceMapObject, 'version');
                    });

                    it('source map from created file should contains property `names`', () => {
                        assert.property(sourceMapObject, 'names');
                    });

                    it('should resolve correct sources from source map', () => {
                        assert.equal(resolvedSources, sourceCodeContent);
                    });

                    after(() => {
                        fs.unlinkSync(outputFilePath);
                        fs.unlinkSync(outputSourceMapFilePath);
                    });
                });

                describe('Variant #4: `sourceMapSourcesMode` option is set', () => {
                    describe('Variant #1: `sourcesContent` value', () => {
                        const expectedSourceMapSourceName: string = 'sourceMap';

                        let isFileExist: boolean,
                            resolvedSources: string,
                            sourceCodeContent: string,
                            sourceMapObject: ISourceMap;

                        before((done) => {
                            JavaScriptObfuscatorCLI.obfuscate([
                                'node',
                                'javascript-obfuscator',
                                fixtureFilePath,
                                '--output',
                                outputFilePath,
                                '--compact',
                                'true',
                                '--self-defending',
                                '0',
                                '--source-map',
                                'true',
                                '--source-map-sources-mode',
                                'sources-content'
                            ]);

                            try {
                                sourceCodeContent = fs.readFileSync(fixtureFilePath, { encoding: 'utf8' });
                                const sourceMapContent: string = fs.readFileSync(outputSourceMapPath, { encoding: 'utf8' });

                                isFileExist = true;
                                sourceMapObject = JSON.parse(sourceMapContent);

                                resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                    resolvedSources = typeof result.sourcesContent[0] === 'string'
                                        ? result.sourcesContent[0]
                                        : '';
                                    done();
                                });
                            } catch (e) {
                                isFileExist = false;
                            }
                        });

                        it('should create file with source map in the same directory as output file', () => {
                            assert.equal(isFileExist, true);
                        });

                        it('source map from created file should contains property `sources`', () => {
                            assert.property(sourceMapObject, 'sources');
                        });

                        it('source map from created file should contains property `sourcesContent`', () => {
                            assert.property(sourceMapObject, 'sourcesContent');
                        });

                        it('source map source should has correct sources', () => {
                            assert.equal(sourceMapObject.sources[0], expectedSourceMapSourceName);
                        });

                        it('source map source should has correct sources content', () => {
                            assert.equal(sourceMapObject.sourcesContent[0], sourceCodeContent);
                        });

                        it('should resolve correct sources from source map', () => {
                            assert.equal(resolvedSources, sourceCodeContent);
                        });

                        after(() => {
                            rimraf.sync(outputFilePath);
                            rimraf.sync(outputSourceMapPath);
                        });
                    });

                    describe('Variant #2: `sources` value', () => {
                        const expectedSourceMapSourceName: string = path.basename(fixtureFileName);

                        let isFileExist: boolean,
                            resolvedSources: string,
                            sourceCodeContent: string,
                            sourceMapObject: ISourceMap;

                        before((done) => {
                            JavaScriptObfuscatorCLI.obfuscate([
                                'node',
                                'javascript-obfuscator',
                                fixtureFilePath,
                                '--output',
                                outputFilePath,
                                '--compact',
                                'true',
                                '--self-defending',
                                '0',
                                '--source-map',
                                'true',
                                '--source-map-sources-mode',
                                'sources'
                            ]);

                            try {
                                sourceCodeContent = fs.readFileSync(fixtureFilePath, { encoding: 'utf8' });
                                const sourceMapContent: string = fs.readFileSync(outputSourceMapPath, { encoding: 'utf8' });

                                isFileExist = true;
                                sourceMapObject = JSON.parse(sourceMapContent);

                                resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                    resolvedSources = typeof result.sourcesContent[0] === 'string'
                                        ? result.sourcesContent[0]
                                        : '';
                                    done();
                                });
                            } catch (e) {
                                isFileExist = false;
                            }
                        });

                        it('should create file with source map in the same directory as output file', () => {
                            assert.equal(isFileExist, true);
                        });

                        it('source map from created file should contains property `sources`', () => {
                            assert.property(sourceMapObject, 'sources');
                        });

                        it('source map from created file should not contains property `sourcesContent`', () => {
                            assert.notProperty(sourceMapObject, 'sourcesContent');
                        });

                        it('source map source should has correct sources', () => {
                            assert.equal(sourceMapObject.sources[0], expectedSourceMapSourceName);
                        });

                        it('should resolve correct sources from source map', () => {
                            assert.equal(resolvedSources, sourceCodeContent);
                        });

                        after(() => {
                            rimraf.sync(outputFilePath);
                            rimraf.sync(outputSourceMapPath);
                        });
                    });
                });
            });

            describe('Variant #2: `--sourceMapMode` option is `inline`', () => {
                describe('Variant #1: default behaviour', () => {
                    let isFileExist: boolean,
                        resolvedSources: string,
                        sourceCodeContent: string,
                        sourceMapObject: ISourceMap;

                    before((done) => {
                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            fixtureFilePath,
                            '--output',
                            outputFilePath,
                            '--compact',
                            'true',
                            '--self-defending',
                            '0',
                            '--source-map',
                            'true',
                            '--source-map-mode',
                            'inline'
                        ]);

                        isFileExist = fs.existsSync(outputSourceMapPath);

                        sourceCodeContent = fs.readFileSync(fixtureFilePath, { encoding: 'utf8' });
                        const obfuscatedCodeContent = fs.readFileSync(outputFilePath, { encoding: 'utf8' });

                        sourceMapObject = parseSourceMapFromObfuscatedCode(obfuscatedCodeContent);

                        resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                            resolvedSources = typeof result.sourcesContent[0] === 'string'
                                ? result.sourcesContent[0]
                                : '';
                            done();
                        });
                    });

                    it('shouldn\'t create file with source map', () => {
                        assert.equal(isFileExist, false);
                    });

                    it('should resolve correct sources from source map', () => {
                        assert.equal(resolvedSources, sourceCodeContent);
                    });

                    after(() => {
                        fs.unlinkSync(outputFilePath);
                    });
                });

                describe('Variant #2: `sourceMapSourcesMode` option is set', () => {
                    describe('Variant #1: `sourcesContent` value', () => {
                        const expectedSourceMapSourceName: string = 'sourceMap';

                        let isFileExist: boolean,
                            resolvedSources: string,
                            sourceCodeContent: string,
                            sourceMapObject: ISourceMap;

                        before((done) => {
                            JavaScriptObfuscatorCLI.obfuscate([
                                'node',
                                'javascript-obfuscator',
                                fixtureFilePath,
                                '--output',
                                outputFilePath,
                                '--compact',
                                'true',
                                '--self-defending',
                                '0',
                                '--source-map',
                                'true',
                                '--source-map-mode',
                                'inline',
                                '--source-map-sources-mode',
                                'sources-content'
                            ]);

                            isFileExist = fs.existsSync(outputSourceMapPath);

                            sourceCodeContent = fs.readFileSync(fixtureFilePath, { encoding: 'utf8' });
                            const obfuscatedCodeContent = fs.readFileSync(outputFilePath, { encoding: 'utf8' });
                            sourceMapObject = parseSourceMapFromObfuscatedCode(obfuscatedCodeContent);

                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                resolvedSources = typeof result.sourcesContent[0] === 'string'
                                    ? result.sourcesContent[0]
                                    : '';
                                done();
                            });
                        });

                        it('shouldn\'t create file with source map', () => {
                            assert.equal(isFileExist, false);
                        });

                        it('source map from created file should contains property `sources`', () => {
                            assert.property(sourceMapObject, 'sources');
                        });

                        it('source map from created file should contains property `sourcesContent`', () => {
                            assert.property(sourceMapObject, 'sourcesContent');
                        });

                        it('source map source should has correct sources', () => {
                            assert.equal(sourceMapObject.sources[0], expectedSourceMapSourceName);
                        });

                        it('source map source should has correct sources content', () => {
                            assert.equal(sourceMapObject.sourcesContent[0], sourceCodeContent);
                        });

                        it('should resolve correct sources from source map', () => {
                            assert.equal(resolvedSources, sourceCodeContent);
                        });

                        after(() => {
                            fs.unlinkSync(outputFilePath);
                        });
                    });

                    describe('Variant #2: `sources` value', () => {
                        const expectedSourceMapSourceName: string = path.basename(fixtureFileName);

                        let isFileExist: boolean,
                            resolvedSources: string,
                            sourceCodeContent: string,
                            sourceMapObject: ISourceMap;

                        before((done) => {
                            JavaScriptObfuscatorCLI.obfuscate([
                                'node',
                                'javascript-obfuscator',
                                fixtureFilePath,
                                '--output',
                                outputFilePath,
                                '--compact',
                                'true',
                                '--self-defending',
                                '0',
                                '--source-map',
                                'true',
                                '--source-map-mode',
                                'inline',
                                '--source-map-sources-mode',
                                'sources'
                            ]);

                            isFileExist = fs.existsSync(outputSourceMapPath);

                            sourceCodeContent = fs.readFileSync(fixtureFilePath, { encoding: 'utf8' });
                            const obfuscatedCodeContent = fs.readFileSync(outputFilePath, { encoding: 'utf8' });
                            sourceMapObject = parseSourceMapFromObfuscatedCode(obfuscatedCodeContent);

                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                resolvedSources = typeof result.sourcesContent[0] === 'string'
                                    ? result.sourcesContent[0]
                                    : '';
                                done();
                            });
                        });

                        it('shouldn\'t create file with source map', () => {
                            assert.equal(isFileExist, false);
                        });

                        it('source map from created file should contains property `sources`', () => {
                            assert.property(sourceMapObject, 'sources');
                        });

                        it('source map from created file should contains property `sourcesContent`', () => {
                            assert.notProperty(sourceMapObject, 'sourcesContent');
                        });

                        it('source map source should has correct sources', () => {
                            assert.equal(sourceMapObject.sources[0], expectedSourceMapSourceName);
                        });

                        it('should resolve correct sources from source map', () => {
                            assert.equal(resolvedSources, sourceCodeContent);
                        });

                        after(() => {
                            fs.unlinkSync(outputFilePath);
                        });
                    });
                });
            });
        });

        describe('help output', () => {
            let callback: sinon.SinonSpy<any, void>,
                stdoutWriteMock: StdoutWriteMock,
                stubExit: sinon.SinonStub;

            beforeEach(() => {
                stubExit = sinon.stub(process, 'exit');
                callback = sinon.spy(console, 'log');
                stdoutWriteMock = new StdoutWriteMock(process.stdout.write);
            });

            describe('`--help` option is set without any additional parameters', () => {
                let isConsoleLogCalled: boolean;

                beforeEach(() => {
                    stdoutWriteMock.mute();

                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        '--help'
                    ]);

                    stdoutWriteMock.restore();
                    isConsoleLogCalled = callback.called;
                });

                it('should print `console.log` help', () => {
                    assert.equal(isConsoleLogCalled, true);
                });
            });

            describe('`--help` option is set before file path', () => {
                let isConsoleLogCalled: boolean;

                beforeEach(() => {
                    stdoutWriteMock.mute();

                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        '--help',
                        fixtureFilePath
                    ]);

                    stdoutWriteMock.restore();
                    isConsoleLogCalled = callback.called;
                });

                it('should print `console.log` help', () => {
                    assert.equal(isConsoleLogCalled, true);
                });
            });

            describe('`--help` option is set after file path', () => {
                let isConsoleLogCalled: boolean;

                beforeEach(() => {
                    stdoutWriteMock.mute();

                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        fixtureFilePath,
                        '--help'
                    ]);

                    stdoutWriteMock.restore();
                    isConsoleLogCalled = callback.called;
                });

                it('should print `console.log` help', () => {
                    assert.equal(isConsoleLogCalled, true);
                });
            });

            describe('no arguments passed', () => {
                let isConsoleLogCalled: boolean;

                beforeEach(() => {
                    stdoutWriteMock.mute();

                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator'
                    ]);

                    stdoutWriteMock.restore();
                    isConsoleLogCalled = callback.called;
                });

                it('should print `console.log` help', () => {
                    assert.equal(isConsoleLogCalled, true);
                });
            });

            afterEach(() => {
                stubExit.restore();
                callback.restore();
            });
        });

        describe('`--config` option is set', () => {
            describe('Base options', () => {
                const outputSourceMapPath: string = `${outputFilePath}.map`;

                let isFileExist: boolean,
                    sourceMapObject: any;

                before(() => {
                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        fixtureFilePath,
                        '--output',
                        outputFilePath,
                        '--config',
                        configFilePath
                    ]);

                    try {
                        const content: string = fs.readFileSync(outputSourceMapPath, {encoding: 'utf8'});

                        isFileExist = true;
                        sourceMapObject = JSON.parse(content);
                    } catch (e) {
                        isFileExist = false;
                    }
                });

                it('should create file with source map in the same directory as output file', () => {
                    assert.equal(isFileExist, true);
                });

                it('source map from created file should contains property `version`', () => {
                    assert.property(sourceMapObject, 'version');
                });

                it('source map from created file should contains property `sources`', () => {
                    assert.property(sourceMapObject, 'sources');
                });

                it('source map from created file should contains property `names`', () => {
                    assert.property(sourceMapObject, 'names');
                });

                after(() => {
                    fs.unlinkSync(outputFilePath);
                    fs.unlinkSync(outputSourceMapPath);
                });
            });

            describe('`--exclude` option', () => {
                const directoryPath: string = path.join(fixturesDirName, 'directory-obfuscation');
                const outputFileName1: string = 'foo-obfuscated.js';
                const outputFileName2: string = 'bar-obfuscated.js';

                let outputFixturesFilePath1: string,
                    outputFixturesFilePath2: string,
                    isFileExist1: boolean,
                    isFileExist2: boolean;

                before(() => {
                    outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                    outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);

                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        directoryPath,
                        '--config',
                        configFilePath
                    ]);

                    isFileExist1 = fs.existsSync(outputFixturesFilePath1);
                    isFileExist2 = fs.existsSync(outputFixturesFilePath2);
                });

                it(`shouldn't create file \`${outputFileName1}\` in \`${fixturesDirName}\` directory`, () => {
                    assert.equal(isFileExist1, false);
                });

                it(`should create file \`${outputFileName2}\` with obfuscated code in \`${fixturesDirName}\` directory`, () => {
                    assert.equal(isFileExist2, true);
                });

                after(() => {
                    rimraf.sync(outputFixturesFilePath1);
                    rimraf.sync(outputFixturesFilePath2);
                });
            });
        });

        describe('`--config` option is set but overridden by CLI option', () => {
            const outputSourceMapPath: string = `${outputFilePath}.map`;

            let isFileExist: boolean;

            before(() => {
                JavaScriptObfuscatorCLI.obfuscate([
                    'node',
                    'javascript-obfuscator',
                    fixtureFilePath,
                    '--output',
                    outputFilePath,
                    '--config',
                    configFilePath,
                    '--source-map',
                    'false',
                ]);

                try {
                    fs.readFileSync(outputSourceMapPath, {encoding: 'utf8'});

                    isFileExist = true;
                } catch (e) {
                    isFileExist = false;
                }
            });

            it('should create file without source map in the same directory as output file', () => {
                assert.equal(isFileExist, false);
            });

            after(() => {
                fs.unlinkSync(outputFilePath);
            });
        });

        describe('Logging', () => {
            describe('Obfuscating file message', () => {
                const directoryPath: string = path.join(fixturesDirName, 'directory-obfuscation');

                const inputFileName1: string = 'foo.js';
                const inputFileName2: string = 'bar.js';
                const inputFilePath1: string = path.join(directoryPath, inputFileName1);
                const inputFilePath2: string = path.join(directoryPath, inputFileName2);

                const outputFileName1: string = 'foo-obfuscated.js';
                const outputFileName2: string = 'bar-obfuscated.js';
                const outputFilePath1: string = path.join(directoryPath, outputFileName1);
                const outputFilePath2: string = path.join(directoryPath, outputFileName2);

                const expectedLoggingMessage1: string = `[javascript-obfuscator-cli] Obfuscating file: ${inputFilePath1}...`;
                const expectedLoggingMessage2: string = `[javascript-obfuscator-cli] Obfuscating file: ${inputFilePath2}...`;

                let consoleLogSpy: sinon.SinonSpy<any, void>,
                    loggingMessageResult1: string,
                    loggingMessageResult2: string;

                before(() => {
                    consoleLogSpy = sinon.spy(console, 'log');

                    JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        directoryPath,
                        '--rename-globals',
                        'true'
                    ]);

                    loggingMessageResult1 = consoleLogSpy.getCall(1).args[0];
                    loggingMessageResult2 = consoleLogSpy.getCall(0).args[0];
                });

                it('Variant #1: should log file name to the console', () => {
                    assert.include(loggingMessageResult1, expectedLoggingMessage1);
                });

                it('Variant #2: should log file name to the console', () => {
                    assert.include(loggingMessageResult2, expectedLoggingMessage2);
                });

                after(() => {
                    rimraf.sync(outputFilePath1);
                    rimraf.sync(outputFilePath2);
                    consoleLogSpy.restore();
                });
            });

            describe('Error message', () => {
                const directoryPath: string = path.join(fixturesDirName, 'directory-obfuscation-error');

                const inputFileName: string = 'foo.js';
                const inputFilePath: string = path.join(directoryPath, inputFileName);

                const expectedLoggingMessage1: string = `[javascript-obfuscator-cli] Error in file: ${inputFilePath}...`;

                let consoleLogSpy: sinon.SinonSpy<any, void>,
                    loggingMessageResult: string

                before(() => {
                    consoleLogSpy = sinon.spy(console, 'log');

                    try {
                        JavaScriptObfuscatorCLI.obfuscate([
                            'node',
                            'javascript-obfuscator',
                            directoryPath,
                            '--rename-globals',
                            'true'
                        ]);
                    } catch {}

                    loggingMessageResult = consoleLogSpy.getCall(1).args[0];
                });

                it('Should log file name to the console', () => {
                    assert.include(loggingMessageResult, expectedLoggingMessage1);
                });

                after(() => {
                    consoleLogSpy.restore();
                });
            });
        });

        after(() => {
            rimraf.sync(outputDirName);
        });
    });
});
