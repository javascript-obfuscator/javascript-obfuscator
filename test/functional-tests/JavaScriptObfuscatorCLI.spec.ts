import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as sinon from 'sinon';

import { StdoutWriteMock } from "../mocks/StdoutWriteMock";

import { JavaScriptObfuscator } from "../../src/JavaScriptObfuscator";

const assert: Chai.AssertStatic = require('chai').assert;

describe('JavaScriptObfuscatorCLI', function (): void {
    let fixturesDirName: string = 'test/fixtures',
        fixtureFileName: string = 'sample.js',
        fixtureFilePath: string = `${fixturesDirName}/${fixtureFileName}`,
        outputDirName: string = 'test/tmp',
        outputFileName: string = 'sample-obfuscated.js',
        outputFilePath: string = `${outputDirName}/${outputFileName}`;

    this.timeout(5000);

    describe('run (): void', () => {
        before(() => {
            mkdirp.sync(outputDirName);
        });

        describe('--output option is set', () => {
            it('should creates file with obfuscated JS code in --output directory', () => {
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

                assert.equal(fs.existsSync(outputFilePath), true);
            });

            afterEach(() => {
                fs.unlinkSync(outputFilePath);
            });
        });

        describe('--output option is not set', () => {
            it(`should creates file called \`${outputFileName}\` with obfuscated JS code in \`${fixturesDirName}\` directory`, () => {
                let outputFixturesFilePath: string = `${fixturesDirName}/${outputFileName}`;

                JavaScriptObfuscator.runCLI([
                    'node',
                    'javascript-obfuscator',
                    fixtureFilePath
                ]);

                assert.equal(fs.existsSync(outputFixturesFilePath), true);

                fs.unlinkSync(outputFixturesFilePath);
            });

            it(`should throw an error if input path is not a valid file path`, () => {
                assert.throws(() => JavaScriptObfuscator.runCLI([
                    'node',
                    'javascript-obfuscator',
                    'wrong/file/path'
                ]), ReferenceError);
            });

            it(`should throw an error if input file extension is not a .js extension`, () => {
                let outputWrongExtensionFileName: string = 'sample-obfuscated.ts',
                    outputWrongExtensionFilePath: string = `${outputDirName}/${outputWrongExtensionFileName}`;

                fs.writeFileSync(outputWrongExtensionFilePath, 'data');

                assert.throws(() => JavaScriptObfuscator.runCLI([
                    'node',
                    'javascript-obfuscator',
                    outputWrongExtensionFilePath
                ]), ReferenceError);

                fs.unlinkSync(outputWrongExtensionFilePath);
            });
        });

        describe('--sourceMap option is set', () => {
            let outputSourceMapPath: string = `${outputFilePath}.map`;

            describe('--sourceMapMode option is `separate`', () => {
                it('should creates file with source map in the same directory as output file', () => {
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

                    assert.equal(fs.existsSync(outputSourceMapPath), true);

                    const content: string = fs.readFileSync(outputSourceMapPath, { encoding: 'utf8' }),
                        sourceMap: any = JSON.parse(content);

                    assert.property(sourceMap, 'version');
                    assert.property(sourceMap, 'sources');
                    assert.property(sourceMap, 'names');
                });

                it('should creates file with source map in the same directory as output file if `sourceMapBaseUrl` is set', () => {
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

                    assert.equal(fs.existsSync(outputSourceMapPath), true);

                    const content: string = fs.readFileSync(outputSourceMapPath, { encoding: 'utf8' }),
                        sourceMap: any = JSON.parse(content);

                    assert.property(sourceMap, 'version');
                    assert.property(sourceMap, 'sources');
                    assert.property(sourceMap, 'names');
                });

                afterEach(() => {
                    fs.unlinkSync(outputSourceMapPath);
                });
            });

            describe('--sourceMapFileName option is set', () => {
                let sourceMapFileName: string = 'test',
                    sourceMapFilePath: string = `${sourceMapFileName}.js.map`,
                    outputSourceMapFilePath: string = `${outputDirName}/${sourceMapFilePath}`;

                it('should creates source map file with given name in the same directory as output file', () => {
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

                    assert.equal(fs.existsSync(outputSourceMapFilePath), true);

                    const content: string = fs.readFileSync(outputSourceMapFilePath, { encoding: 'utf8' }),
                        sourceMap: any = JSON.parse(content);

                    assert.property(sourceMap, 'version');
                    assert.property(sourceMap, 'sources');
                    assert.property(sourceMap, 'names');
                });

                afterEach(() => {
                    fs.unlinkSync(outputSourceMapFilePath);
                });
            });

            describe('--sourceMapMode option is `inline`', () => {
                it('shouldn\'t create file with source map if `sourceMapMode` is `inline`', () => {
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

                    assert.equal(fs.existsSync(outputSourceMapPath), false);
                });
            });

            afterEach(() => {
                fs.unlinkSync(outputFilePath);
            });
        });

        describe('help output', () => {
            let callback: sinon.SinonSpy,
                stdoutWriteMock: StdoutWriteMock;

            beforeEach(() => {
                callback = sinon.spy(console, 'log');
                stdoutWriteMock = new StdoutWriteMock(process.stdout.write);
            });

            it('should print `console.log` help if `--help` option is set', () => {
                stdoutWriteMock.mute();

                JavaScriptObfuscator.runCLI([
                    'node',
                    'javascript-obfuscator',
                    fixtureFilePath,
                    '--help'
                ]);

                stdoutWriteMock.restore();

                assert.equal(callback.called, true);
            });

            it('should print `console.log` help if no options is passed', () => {
                stdoutWriteMock.mute();

                JavaScriptObfuscator.runCLI([
                    'node',
                    'javascript-obfuscator'
                ]);

                stdoutWriteMock.restore();

                assert.equal(callback.called, true);
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
