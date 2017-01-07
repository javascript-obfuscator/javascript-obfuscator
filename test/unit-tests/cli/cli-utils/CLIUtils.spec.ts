import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

import { assert } from 'chai';

import { CLIUtils } from '../../../../src/cli/CLIUtils';

describe('CLIUtils', () => {
    const fileContent: string = 'test',
        tmpDir: string = 'test/tmp';

    before(() => {
        mkdirp.sync(tmpDir);
    });

    describe('getOutputCodePath (outputPath: string, inputPath: string): string', () => {
        let expectedInputPath: string = 'test/input/test-obfuscated.js',
            inputPath: string = 'test/input/test.js',
            outputPath: string = 'test/output/test.js';

        it('should return `outputPath` if this path is set', () => {
            assert.equal(CLIUtils.getOutputCodePath(outputPath, inputPath), outputPath);
        });

        it('should output path based on `inputPath` if `outputPath` is not set', () => {
            assert.equal(CLIUtils.getOutputCodePath('', inputPath), expectedInputPath);
        });
    });

    describe('getOutputSourceMapPath (outputCodePath: string): string', () => {
        let expectedOutputSourceMapPath: string = 'test/output/test.js.map',
            outputCodePath: string = 'test/output/test.js';

        it('should return output path for source map', () => {
            assert.equal(CLIUtils.getOutputSourceMapPath(outputCodePath), expectedOutputSourceMapPath);
        });
    });

    describe('getPackageConfig (): IPackageConfig', () => {
        it('should return `package.json` content for current CLI program as object', () => {
            assert.property(CLIUtils.getPackageConfig(), 'name');
            assert.property(CLIUtils.getPackageConfig(), 'version');
        });
    });

    describe('validateInputPath (inputPath: string): void', () => {
        let inputPath: string,
            tmpFileName: string;

        it('shouldn\'t throw an error if `inputPath` is a valid path', () => {
            tmpFileName = 'test.js';
            inputPath = `${tmpDir}/${tmpFileName}`;
            fs.writeFileSync(inputPath, fileContent);

            assert.doesNotThrow(() => CLIUtils.validateInputPath(inputPath), ReferenceError);

            fs.unlinkSync(inputPath);
        });

        it('should throw an error if `inputPath` is not a valid path', () => {
            tmpFileName = 'test.js';
            inputPath = `${tmpDir}/${tmpFileName}`;

            assert.throws(() => CLIUtils.validateInputPath(inputPath), ReferenceError);
        });

        it('should throw an error if `inputPath` is a file name has invalid extension', () => {
            tmpFileName = 'test.ts';
            inputPath = `${tmpDir}/${tmpFileName}`;
            fs.writeFileSync(inputPath, fileContent);

            assert.throws(() => CLIUtils.validateInputPath(inputPath), ReferenceError);

            fs.unlinkSync(inputPath);
        });
    });

    after(() => {
        fs.rmdirSync(tmpDir);
    });
});
