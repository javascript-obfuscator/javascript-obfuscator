import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as sinon from 'sinon';

import { BabelPolyfill } from './polyfills/BabelPolyfill';

import { StdoutWriteMock } from "../test/mocks/StdoutWriteMock";

import { JavaScriptObfuscator } from "../src/JavaScriptObfuscator";

const assert: Chai.AssertStatic = require('chai').assert;

BabelPolyfill.append();

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

        describe('help output', () => {
            let callback: Sinon.SinonSpy,
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
