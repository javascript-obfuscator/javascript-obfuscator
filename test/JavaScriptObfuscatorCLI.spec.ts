import * as fs from 'fs';

import { JavaScriptObfuscator } from "../src/JavaScriptObfuscator";

const assert: Chai.AssertStatic = require('chai').assert;

describe('JavaScriptObfuscatorCLI', () => {
    let fixturesDirName: string = 'test/fixtures',
        tmpDirName: string = 'test/tmp',
        fixtureFileName: string = 'sample.js',
        fixtureFilePath: string = `${fixturesDirName}/${fixtureFileName}`,
        outputFileName: string = 'sample-obfuscated.js',
        outputFixturesFilePath: string = `${fixturesDirName}/${outputFileName}`,
        outputFilePath: string = `${tmpDirName}/${outputFileName}`;

    describe('run (): void', () => {
        describe('--output option is set', () => {
            it('should creates file with obfuscated JS code in --output directory', () => {
                JavaScriptObfuscator.runCLI([
                    'node',
                    'javascript-obfuscator',
                    fixtureFilePath,
                    '--output',
                    outputFilePath
                ]);

                assert.equal(fs.existsSync(outputFilePath), true);
            });

            afterEach(() => {
                fs.unlinkSync(outputFilePath);
                fs.rmdirSync(tmpDirName);
            });
        });

        describe('—output option is not set', () => {
            it(`should creates file called \`${outputFileName}\` with obfuscated JS code in \`${fixturesDirName}\` directory`, () => {
                JavaScriptObfuscator.runCLI([
                    'node',
                    'javascript-obfuscator',
                    fixtureFilePath
                ]);

                assert.equal(fs.existsSync(outputFixturesFilePath), true);
            });

            afterEach(() => {
                fs.unlinkSync(outputFixturesFilePath);
            });
        });
    });
});
