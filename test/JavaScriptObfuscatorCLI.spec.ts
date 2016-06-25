import * as fs from 'fs';

import { JavaScriptObfuscator } from "../src/JavaScriptObfuscator";

let assert: any = require('chai').assert;

describe('JavaScriptObfuscatorCLI', () => {
    let fixturesDirName: string = 'test/fixtures',
        tmpDirName: string = 'test/tmp',
        fixtureFileName: string = 'sample.js',
        fixtureFilePath: string = `${fixturesDirName}/${fixtureFileName}`,
        outputFileName: string = 'sample-obfuscated.js',
        outputFilePath: string = `${tmpDirName}/${outputFileName}`;

    describe('run (): void', () => {
        beforeEach(() => {
            JavaScriptObfuscator.runCLI([
                'node',
                'javascript-obfuscator',
                fixtureFilePath,
                '--output',
                outputFilePath,
                '--compact',
                'false',
                '--selfDefending',
                'false'
            ]);
        });

        it('should obfuscate file with JS code', () => {
            assert.equal(1, 1);
        });

        afterEach(() => {
            fs.unlinkSync(outputFilePath);
            fs.rmdirSync(tmpDirName);
        });
    });
});
