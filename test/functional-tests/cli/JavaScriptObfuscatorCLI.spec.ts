import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as rimraf from 'rimraf';
import * as sinon from 'sinon';

import { assert } from 'chai';

import { StdoutWriteMock } from '../../mocks/StdoutWriteMock';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

describe('JavaScriptObfuscatorCLI', function (): void {
    this.timeout(100000);

    const fixturesDirName: string = 'test/fixtures';
    const fixtureFileName: string = 'sample.js';
    const fixtureFilePath: string = `${fixturesDirName}/${fixtureFileName}`;
    const outputDirName: string = 'test/tmp';
    const outputFileName: string = 'sample-obfuscated.js';
    const outputFilePath: string = `${outputDirName}/${outputFileName}`;
    const configDirName: string = 'test/fixtures';
    const configFileName: string = 'config.js';
    const configFilePath: string = `${configDirName}/${configFileName}`;


    describe('run (): void', () => {
        before(() => {
            mkdirp.sync(outputDirName);
        });

        describe('Variant #1: obfuscation of single file', () => {
            describe('`--output` option is set', () => {
                let isFileExist: boolean;

                before(() => {
                    JavaScriptObfuscator.runCLI([
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

            describe('`--output` option isn\'t set', () => {
                describe('variant #1: default behaviour', () => {
                    let outputFixturesFilePath: string,
                        isFileExist: boolean;

                    before(() => {
                        outputFixturesFilePath = `${fixturesDirName}/${outputFileName}`;

                        JavaScriptObfuscator.runCLI([
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

                describe('variant #2: invalid input file path', () => {
                    const expectedError: ReferenceErrorConstructor = ReferenceError;

                    let testFunc: () => void;

                    before(() => {
                        testFunc = () => JavaScriptObfuscator.runCLI([
                            'node',
                            'javascript-obfuscator',
                            'wrong/file/path'
                        ]);
                    });

                    it(`should throw an error`, () => {
                        assert.throws(testFunc, expectedError);
                    });
                });

                describe('variant #3: input file extension isn\'t `.js`', () => {
                    const expectedError: ReferenceErrorConstructor = ReferenceError;
                    const outputFileName: string = 'sample-obfuscated.ts';
                    const outputFilePath: string = `${outputDirName}/${outputFileName}`;

                    let testFunc: () => void;

                    before(() => {
                        fs.writeFileSync(outputFilePath, 'data');

                        testFunc = () => JavaScriptObfuscator.runCLI([
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
        });

        describe('Variant #2: obfuscation of directory', () => {
            const directoryPath: string = `${fixturesDirName}/directory-obfuscation`;
            const outputFileName1: string = 'foo-obfuscated.js';
            const outputFileName2: string = 'bar-obfuscated.js';
            const outputFileName3: string = 'baz-obfuscated.js';
            const readFileEncoding: string = 'utf8';
            const regExp1: RegExp = /^var *a1_0x(\w){4,6} *= *0x1;$/;
            const regExp2: RegExp = /^var *a0_0x(\w){4,6} *= *0x2;$/;

            let outputFixturesFilePath1: string,
                outputFixturesFilePath2: string,
                outputFixturesFilePath3: string,
                isFileExist1: boolean,
                isFileExist2: boolean,
                isFileExist3: boolean,
                fileContent1: string,
                fileContent2: string;

            before(() => {
                outputFixturesFilePath1 = `${directoryPath}/${outputFileName1}`;
                outputFixturesFilePath2 = `${directoryPath}/${outputFileName2}`;
                outputFixturesFilePath3 = `${directoryPath}/${outputFileName3}`;

                JavaScriptObfuscator.runCLI([
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

        describe('Variant #3: obfuscation of directory with `identifiersPrefix` option value', () => {
            const directoryPath: string = `${fixturesDirName}/directory-obfuscation`;
            const identifiersPrefix: string = 'foo';
            const outputFileName1: string = 'foo-obfuscated.js';
            const outputFileName2: string = 'bar-obfuscated.js';
            const readFileEncoding: string = 'utf8';
            const regExp1: RegExp = /^var *foo1_0x(\w){4,6} *= *0x1;$/;
            const regExp2: RegExp = /^var *foo0_0x(\w){4,6} *= *0x2;$/;

            let outputFixturesFilePath1: string,
                outputFixturesFilePath2: string,
                isFileExist1: boolean,
                isFileExist2: boolean,
                fileContent1: string,
                fileContent2: string;

            before(() => {
                outputFixturesFilePath1 = `${directoryPath}/${outputFileName1}`;
                outputFixturesFilePath2 = `${directoryPath}/${outputFileName2}`;

                JavaScriptObfuscator.runCLI([
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

        describe('Variant #4: obfuscation of directory with `output` option', () => {
            const directoryPath: string = `${fixturesDirName}/directory-obfuscation`;
            const outputDirectoryName: string = 'obfuscated';
            const outputDirectoryPath: string = `${directoryPath}/${outputDirectoryName}`;
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
                outputFixturesFilePath1 = `${outputDirectoryPath}/${directoryPath}/${outputFileName1}`;
                outputFixturesFilePath2 = `${outputDirectoryPath}/${directoryPath}/${outputFileName2}`;
                outputFixturesFilePath3 = `${outputDirectoryPath}/${directoryPath}/${outputFileName3}`;

                JavaScriptObfuscator.runCLI([
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
                `\`${fixturesDirName}/${outputDirectoryName}\` directory`,
                () => {
                    assert.equal(isFileExist1, true);
                }
            );

            it(
                `should create file \`${outputFileName2}\` with obfuscated code in ` +
                `\`${fixturesDirName}/${outputDirectoryName}\` directory`,
                () => {
                    assert.equal(isFileExist2, true);
                }
            );

            it(
                `shouldn't create file \`${outputFileName3}\` in ` +
                `\`${fixturesDirName}/${outputDirectoryName}\` directory`,
                () => {
                    assert.equal(isFileExist3, false);
                }
            );

            after(() => {
                rimraf.sync(outputDirectoryPath);
            });
        });

        describe('`--sourceMap` option is set', () => {
            const outputSourceMapPath: string = `${outputFilePath}.map`;

            describe('variant #1: `--sourceMapMode` option value is `separate`', () => {
                describe('variant #1: default behaviour', () => {
                    let isFileExist: boolean,
                        sourceMapObject: any;

                    before(() => {
                        JavaScriptObfuscator.runCLI([
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
                        rimraf.sync(outputFilePath);
                        rimraf.sync(outputSourceMapPath);
                    });
                });

                describe('variant #2: `sourceMapBaseUrl` option is set', () => {
                    let isFileExist: boolean,
                        sourceMapObject: any;

                    before(() => {
                        JavaScriptObfuscator.runCLI([
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

                describe('variant #3: `--sourceMapFileName` option is set', () => {
                    const sourceMapFileName: string = 'test';
                    const sourceMapFilePath: string = `${sourceMapFileName}.js.map`;
                    const outputSourceMapFilePath: string = `${outputDirName}/${sourceMapFilePath}`;

                    let isFileExist: boolean,
                        sourceMapObject: any;

                    before(() => {
                        JavaScriptObfuscator.runCLI([
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
                            const content: string = fs.readFileSync(outputSourceMapFilePath, { encoding: 'utf8' });

                            isFileExist = true;
                            sourceMapObject = JSON.parse(content);
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

                    it('source map from created file should contains property `sources`', () => {
                        assert.property(sourceMapObject, 'sources');
                    });

                    it('source map from created file should contains property `names`', () => {
                        assert.property(sourceMapObject, 'names');
                    });

                    after(() => {
                        fs.unlinkSync(outputFilePath);
                        fs.unlinkSync(outputSourceMapFilePath);
                    });
                });
            });

            describe('variant #2: `--sourceMapMode` option is `inline`', () => {
                let isFileExist: boolean;

                before(() => {
                    JavaScriptObfuscator.runCLI([
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
                });

                it('shouldn\'t create file with source map', () => {
                    assert.equal(isFileExist, false);
                });

                after(() => {
                    fs.unlinkSync(outputFilePath);
                });
            });
        });

        describe('help output', () => {
            let callback: sinon.SinonSpy,
                stdoutWriteMock: StdoutWriteMock;

            beforeEach(() => {
                callback = sinon.spy(console, 'log');
                stdoutWriteMock = new StdoutWriteMock(process.stdout.write);
            });

            describe('`--help` option is set', () => {
                let isConsoleLogCalled: boolean;

                beforeEach(() => {
                    stdoutWriteMock.mute();

                    JavaScriptObfuscator.runCLI([
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

                    JavaScriptObfuscator.runCLI([
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
                callback.restore();
            });
        });

        describe('`--config` option is set', () => {
            const outputSourceMapPath: string = `${outputFilePath}.map`;

            let isFileExist: boolean,
                sourceMapObject: any;

            before(() => {
                JavaScriptObfuscator.runCLI([
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

        describe('`--config` option is set but overridden by CLI option', () => {
            const outputSourceMapPath: string = `${outputFilePath}.map`;

            let isFileExist: boolean;

            before(() => {
                JavaScriptObfuscator.runCLI([
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

        after(() => {
            rimraf.sync(outputDirName);
        });
    });
});
