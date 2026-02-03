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
import { ProApiClient } from '../../../src/pro-api/ProApiClient';
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
        before(async () => {
            mkdirp.sync(outputDirName);
        });

        describe('Variant #1: obfuscation of single file', () => {
            describe('--output` option is set', () => {
                describe('Variant #1: input file path is before options', () => {
                    let isFileExist: boolean;

                    before(async () => {
                        await JavaScriptObfuscatorCLI.obfuscate([
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

                    before(async () => {
                        await JavaScriptObfuscatorCLI.obfuscate([
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

            describe("`--output` option isn't set", () => {
                describe('Variant #1: default behaviour', () => {
                    let outputFixturesFilePath: string, isFileExist: boolean;

                    before(async () => {
                        outputFixturesFilePath = path.join(fixturesDirName, outputFileName);

                        await JavaScriptObfuscatorCLI.obfuscate(['node', 'javascript-obfuscator', fixtureFilePath]);

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
                    it(`should throw an error`, async () => {
                        try {
                            await await JavaScriptObfuscatorCLI.obfuscate([
                                'node',
                                'javascript-obfuscator',
                                path.join('wrong', 'file', 'path')
                            ]);
                            assert.fail('Expected error was not thrown');
                        } catch (error) {
                            assert.match((error as Error).message, expectedError);
                        }
                    });
                });

                describe("Variant #3: input file extension isn't `.js`", () => {
                    const expectedError: RegExp = /Given input path must be a valid/;
                    const outputFileName: string = 'sample-obfuscated.ts';
                    const outputFilePath: string = path.join(outputDirName, outputFileName);

                    before(async () => {
                        fs.writeFileSync(outputFilePath, 'data');
                    });

                    it(`should throw an error`, async () => {
                        try {
                            await await JavaScriptObfuscatorCLI.obfuscate(['node', 'javascript-obfuscator', outputFilePath]);
                            assert.fail('Expected error was not thrown');
                        } catch (error) {
                            assert.match((error as Error).message, expectedError);
                        }
                    });

                    after(() => {
                        fs.unlinkSync(outputFilePath);
                    });
                });
            });

            describe('--exclude option', () => {
                describe('Variant #1: --exclude option is pointed on different file', () => {
                    let isFileExist: boolean;

                    before(async () => {
                        await await JavaScriptObfuscatorCLI.obfuscate([
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
                    it('should throw an error', async () => {
                        try {
                            await await JavaScriptObfuscatorCLI.obfuscate([
                                'node',
                                'javascript-obfuscator',
                                fixtureFilePath,
                                '--output',
                                outputFilePath,
                                '--exclude',
                                path.join('**', 'sample.js')
                            ]);
                            assert.fail('Expected error was not thrown');
                        } catch (error) {
                            assert.match((error as Error).message, expectedError);
                        }
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

                before(async () => {
                    outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                    outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);
                    outputFixturesFilePath3 = path.join(directoryPath, outputFileName3);

                    await await JavaScriptObfuscatorCLI.obfuscate([
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

                before(async () => {
                    outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                    outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);

                    await JavaScriptObfuscatorCLI.obfuscate([
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

                before(async () => {
                    outputFixturesFilePath1 = path.join(outputDirectoryPath, outputFileName1);
                    outputFixturesFilePath2 = path.join(outputDirectoryPath, outputFileName2);
                    outputFixturesFilePath3 = path.join(outputDirectoryPath, outputFileName3);

                    await JavaScriptObfuscatorCLI.obfuscate([
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

                    before(async () => {
                        outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                        outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);
                        outputFixturesFilePath3 = path.join(directoryPath, outputFileName3);

                        await JavaScriptObfuscatorCLI.obfuscate([
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

                    before(async () => {
                        outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                        outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);
                        outputFixturesFilePath3 = path.join(directoryPath, outputFileName3);

                        await JavaScriptObfuscatorCLI.obfuscate([
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
        });

        describe('`--sourceMap` option is set', () => {
            const outputSourceMapPath: string = `${outputFilePath}.map`;

            describe('Variant #1: `--sourceMapMode` option value is `separate`', () => {
                describe('Variant #1: default behaviour', () => {
                    let isFileExist: boolean,
                        resolvedSources: string,
                        sourceCodeContent: string,
                        sourceMapObject: ISourceMap;

                    before(async () => {
                        await JavaScriptObfuscatorCLI.obfuscate([
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

                            await new Promise<void>((resolve) => {
                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                resolvedSources =
                                    typeof result.sourcesContent[0] === 'string' ? result.sourcesContent[0] : '';
                                resolve();
                            });
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

                    before(async () => {
                        await JavaScriptObfuscatorCLI.obfuscate([
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

                            await new Promise<void>((resolve) => {
                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                resolvedSources =
                                    typeof result.sourcesContent[0] === 'string' ? result.sourcesContent[0] : '';
                                resolve();
                            });
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

                    before(async () => {
                        await JavaScriptObfuscatorCLI.obfuscate([
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
                            const sourceMapContent: string = fs.readFileSync(outputSourceMapFilePath, {
                                encoding: 'utf8'
                            });

                            isFileExist = true;
                            sourceMapObject = JSON.parse(sourceMapContent);

                            await new Promise<void>((resolve) => {
                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                resolvedSources =
                                    typeof result.sourcesContent[0] === 'string' ? result.sourcesContent[0] : '';
                                resolve();
                            });
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

                        before(async () => {
                            await JavaScriptObfuscatorCLI.obfuscate([
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
                                const sourceMapContent: string = fs.readFileSync(outputSourceMapPath, {
                                    encoding: 'utf8'
                                });

                                isFileExist = true;
                                sourceMapObject = JSON.parse(sourceMapContent);

                                await new Promise<void>((resolve) => {
                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                    resolvedSources =
                                        typeof result.sourcesContent[0] === 'string' ? result.sourcesContent[0] : '';
                                    resolve();
                                });
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

                        before(async () => {
                            await JavaScriptObfuscatorCLI.obfuscate([
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
                                const sourceMapContent: string = fs.readFileSync(outputSourceMapPath, {
                                    encoding: 'utf8'
                                });

                                isFileExist = true;
                                sourceMapObject = JSON.parse(sourceMapContent);

                                await new Promise<void>((resolve) => {
                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                    resolvedSources =
                                        typeof result.sourcesContent[0] === 'string' ? result.sourcesContent[0] : '';
                                    resolve();
                                });
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

                    before(async () => {
                        await JavaScriptObfuscatorCLI.obfuscate([
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

                        await new Promise<void>((resolve) => {
                            resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                resolvedSources =
                                    typeof result.sourcesContent[0] === 'string' ? result.sourcesContent[0] : '';
                                resolve();
                            });
                        });
                    });

                    it("shouldn't create file with source map", () => {
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

                        before(async () => {
                            await JavaScriptObfuscatorCLI.obfuscate([
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

                            await new Promise<void>((resolve) => {
                                resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                    resolvedSources =
                                        typeof result.sourcesContent[0] === 'string' ? result.sourcesContent[0] : '';
                                    resolve();
                                });
                            });
                        });

                        it("shouldn't create file with source map", () => {
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

                        before(async () => {
                            await JavaScriptObfuscatorCLI.obfuscate([
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

                            await new Promise<void>((resolve) => {
                                resolveSources(sourceMapObject, fixtureFilePath, fs.readFile, (error, result) => {
                                    resolvedSources =
                                        typeof result.sourcesContent[0] === 'string' ? result.sourcesContent[0] : '';
                                    resolve();
                                });
                            });
                        });

                        it("shouldn't create file with source map", () => {
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
            let callback: sinon.SinonSpy<any, void>, stdoutWriteMock: StdoutWriteMock, stubExit: sinon.SinonStub;

            beforeEach(() => {
                stubExit = sinon.stub(process, 'exit');
                callback = sinon.spy(console, 'log');
                stdoutWriteMock = new StdoutWriteMock(process.stdout.write);
            });

            describe('`--help` option is set without any additional parameters', () => {
                let isConsoleLogCalled: boolean;

                beforeEach(async () => {
                    stdoutWriteMock.mute();

                    await JavaScriptObfuscatorCLI.obfuscate(['node', 'javascript-obfuscator', '--help']);

                    stdoutWriteMock.restore();
                    isConsoleLogCalled = callback.called;
                });

                it('should print `console.log` help', () => {
                    assert.equal(isConsoleLogCalled, true);
                });
            });

            describe('`--help` option is set before file path', () => {
                let isConsoleLogCalled: boolean;

                beforeEach(async () => {
                    stdoutWriteMock.mute();

                    await JavaScriptObfuscatorCLI.obfuscate(['node', 'javascript-obfuscator', '--help', fixtureFilePath]);

                    stdoutWriteMock.restore();
                    isConsoleLogCalled = callback.called;
                });

                it('should print `console.log` help', () => {
                    assert.equal(isConsoleLogCalled, true);
                });
            });

            describe('`--help` option is set after file path', () => {
                let isConsoleLogCalled: boolean;

                beforeEach(async () => {
                    stdoutWriteMock.mute();

                    await JavaScriptObfuscatorCLI.obfuscate(['node', 'javascript-obfuscator', fixtureFilePath, '--help']);

                    stdoutWriteMock.restore();
                    isConsoleLogCalled = callback.called;
                });

                it('should print `console.log` help', () => {
                    assert.equal(isConsoleLogCalled, true);
                });
            });

            describe('no arguments passed', () => {
                let isConsoleLogCalled: boolean;

                beforeEach(async () => {
                    stdoutWriteMock.mute();

                    await JavaScriptObfuscatorCLI.obfuscate(['node', 'javascript-obfuscator']);

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

                let isFileExist: boolean, sourceMapObject: any;

                before(async () => {
                    await JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        fixtureFilePath,
                        '--output',
                        outputFilePath,
                        '--config',
                        configFilePath
                    ]);

                    try {
                        const content: string = fs.readFileSync(outputSourceMapPath, { encoding: 'utf8' });

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

                before(async () => {
                    outputFixturesFilePath1 = path.join(directoryPath, outputFileName1);
                    outputFixturesFilePath2 = path.join(directoryPath, outputFileName2);

                    await JavaScriptObfuscatorCLI.obfuscate([
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

            before(async () => {
                await JavaScriptObfuscatorCLI.obfuscate([
                    'node',
                    'javascript-obfuscator',
                    fixtureFilePath,
                    '--output',
                    outputFilePath,
                    '--config',
                    configFilePath,
                    '--source-map',
                    'false'
                ]);

                try {
                    fs.readFileSync(outputSourceMapPath, { encoding: 'utf8' });

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

                before(async () => {
                    consoleLogSpy = sinon.spy(console, 'log');

                    await JavaScriptObfuscatorCLI.obfuscate([
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

                let consoleLogSpy: sinon.SinonSpy<any, void>, loggingMessageResult: string;

                before(async () => {
                    consoleLogSpy = sinon.spy(console, 'log');

                    try {
                        await JavaScriptObfuscatorCLI.obfuscate([
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

        describe('`--pro-api-token` option', () => {
            let fetchStub: sinon.SinonStub;
            let proApiFilePath: string;

            before(async () => {
                proApiFilePath = path.join(outputDirName, 'pro-api-test.js');
                fs.writeFileSync(proApiFilePath, 'const test = 1;');
            });

            afterEach(() => {
                if (fetchStub) {
                    fetchStub.restore();
                }
            });

            after(() => {
                if (fs.existsSync(proApiFilePath)) {
                    fs.unlinkSync(proApiFilePath);
                }
            });

            describe('Variant #1: Pro API token with vmObfuscation', () => {
                it('should use Pro API when --pro-api-token and --vm-obfuscation are provided', async () => {
                    const mockResponse = {
                        ok: true,
                        status: 200,
                        text: async () => JSON.stringify({ type: 'result', code: 'var obfuscated=1;', sourceMap: '' })
                    } as Response;

                    fetchStub = sinon.stub(global, 'fetch').resolves(mockResponse);

                    await JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        proApiFilePath,
                        '--output',
                        path.join(outputDirName, 'pro-api-output.js'),
                        '--pro-api-token',
                        'test-token-123',
                        '--vm-obfuscation',
                        'true'
                    ]);

                    // Wait for async operations
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    assert.isTrue(fetchStub.called, 'fetch should be called for Pro API');
                    const calledUrl = fetchStub.firstCall?.args[0];
                    assert.include(calledUrl, 'obfuscator.io/api/v1');
                });
            });

            describe('Variant #2: Pro API token with parseHtml', () => {
                it('should use Pro API when --pro-api-token and --parse-html are provided', async () => {
                    const mockResponse = {
                        ok: true,
                        status: 200,
                        text: async () => JSON.stringify({ type: 'result', code: 'var obfuscated=1;', sourceMap: '' })
                    } as Response;

                    fetchStub = sinon.stub(global, 'fetch').resolves(mockResponse);

                    await JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        proApiFilePath,
                        '--output',
                        path.join(outputDirName, 'pro-api-output2.js'),
                        '--pro-api-token',
                        'test-token-123',
                        '--parse-html',
                        'true'
                    ]);

                    // Wait for async operations
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    assert.isTrue(fetchStub.called, 'fetch should be called for Pro API');
                });
            });

            describe('Variant #3: Pro API token with version', () => {
                it('should pass version to Pro API URL when --pro-api-version is provided', async () => {
                    const mockResponse = {
                        ok: true,
                        status: 200,
                        text: async () => JSON.stringify({ type: 'result', code: 'var obfuscated=1;', sourceMap: '' })
                    } as Response;

                    fetchStub = sinon.stub(global, 'fetch').resolves(mockResponse);

                    await JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        proApiFilePath,
                        '--output',
                        path.join(outputDirName, 'pro-api-output3.js'),
                        '--pro-api-token',
                        'test-token-123',
                        '--pro-api-version',
                        '5.0.0-beta.20',
                        '--vm-obfuscation',
                        'true'
                    ]);

                    // Wait for async operations
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    assert.isTrue(fetchStub.called, 'fetch should be called for Pro API');
                    const calledUrl = fetchStub.firstCall?.args[0];
                    assert.include(calledUrl, 'version=5.0.0-beta.20');
                });
            });

            describe('Variant #4: Pro API token without Pro features uses local obfuscation', () => {
                it('should use local obfuscation when --pro-api-token is provided but no Pro features enabled', async () => {
                    fetchStub = sinon.stub(global, 'fetch');

                    const outputPath = path.join(outputDirName, 'local-output.js');

                    await JavaScriptObfuscatorCLI.obfuscate([
                        'node',
                        'javascript-obfuscator',
                        proApiFilePath,
                        '--output',
                        outputPath,
                        '--pro-api-token',
                        'test-token-123',
                        '--compact',
                        'true'
                    ]);

                    // Should NOT call fetch since no Pro features are enabled
                    assert.isFalse(fetchStub.called, 'fetch should not be called without Pro features');

                    // Should create output file using local obfuscation
                    assert.isTrue(fs.existsSync(outputPath), 'output file should exist');

                    fs.unlinkSync(outputPath);
                });
            });
        });

        describe('hasProFeatures static method', () => {
            it('should return true for vmObfuscation', () => {
                assert.isTrue(ProApiClient.hasProFeatures({ vmObfuscation: true }));
            });

            it('should return true for parseHtml', () => {
                assert.isTrue(ProApiClient.hasProFeatures({ parseHtml: true }));
            });

            it('should return false for no Pro features', () => {
                assert.isFalse(ProApiClient.hasProFeatures({ compact: true }));
            });
        });

        after(() => {
            rimraf.sync(outputDirName);
        });
    });
});
