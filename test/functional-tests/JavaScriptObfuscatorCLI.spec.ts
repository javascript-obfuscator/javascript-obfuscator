import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as sinon from 'sinon';

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

            afterEach(() => {
                fs.unlinkSync(outputFilePath);
                fs.unlinkSync(outputSourceMapPath);
            });
        });

        describe('help output', () => {
            let callback: sinon.SinonSpy;

            beforeEach(() => {
                callback = sinon.spy(console, 'log');
            });

            it('should print `console.log` help if `--help` option is set', () => {
                JavaScriptObfuscator.runCLI([
                    'node',
                    'javascript-obfuscator',
                    fixtureFilePath,
                    '--help'
                ]);

                assert.equal(callback.called, true);
            });

            it('should print `console.log` help if no options is passed', () => {
                JavaScriptObfuscator.runCLI([
                    'node',
                    'javascript-obfuscator'
                ]);

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
