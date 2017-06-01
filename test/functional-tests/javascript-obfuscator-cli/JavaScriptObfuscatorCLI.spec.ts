import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as sinon from 'sinon';

import { assert } from 'chai';

import { StdoutWriteMock } from '../../mocks/StdoutWriteMock';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscator';

describe('JavaScriptObfuscatorCLI', function (): void {
    this.timeout(100000);

    const fixturesDirName: string = 'test/fixtures';
    const fixtureFileName: string = 'sample.js';
    const fixtureFilePath: string = `${fixturesDirName}/${fixtureFileName}`;
    const outputDirName: string = 'test/tmp';
    const outputFileName: string = 'sample-obfuscated.js';
    const outputFilePath: string = `${outputDirName}/${outputFileName}`;

    describe('run (): void', () => {
        before(() => {
            mkdirp.sync(outputDirName);
        });

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
                    '--selfDefending',
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
                            '--selfDefending',
                            '0',
                            '--sourceMap',
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
                        fs.unlinkSync(outputFilePath);
                        fs.unlinkSync(outputSourceMapPath);
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
                            '--selfDefending',
                            '0',
                            '--sourceMap',
                            'true',
                            '--sourceMapBaseUrl',
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
                            '--selfDefending',
                            '0',
                            '--sourceMap',
                            'true',
                            '--sourceMapFileName',
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
                        '--selfDefending',
                        '0',
                        '--sourceMap',
                        'true',
                        '--sourceMapMode',
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

        after(() => {
            fs.rmdirSync(outputDirName);
        });
    });
});
