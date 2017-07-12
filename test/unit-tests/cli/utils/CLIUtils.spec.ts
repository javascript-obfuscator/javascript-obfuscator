import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

import { assert } from 'chai';

import { CLIUtils } from '../../../../src/cli/utils/CLIUtils';

describe('CLIUtils', () => {
    const fileContent: string = 'test';
    const tmpDir: string = 'test/tmp';

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
        it('should return `package.json` `name` field for current CLI program as object', () => {
            assert.property(CLIUtils.getPackageConfig(), 'name');
        });

        it('should return `package.json` `version` field for current CLI program as object', () => {
            assert.property(CLIUtils.getPackageConfig(), 'version');
        });
    });

    describe('validateInputPath (inputPath: string): void', () => {
        describe('`inputPath` is a valid path', () => {
            const tmpFileName: string = 'test.js';
            const inputPath: string = `${tmpDir}/${tmpFileName}`;

            before(() => {
                fs.writeFileSync(inputPath, fileContent);
            });

            it('shouldn\'t throw an error if `inputPath` is a valid path', () => {
                assert.doesNotThrow(() => CLIUtils.validateInputPath(inputPath), ReferenceError);
            });

            after(() => {
                fs.unlinkSync(inputPath);
            });
        });

        describe('`inputPath` is not a valid path', () => {
            const tmpFileName: string = 'test.js';
            const inputPath: string = `${tmpDir}/${tmpFileName}`;

            it('should throw an error if `inputPath` is not a valid path', () => {
                assert.throws(() => CLIUtils.validateInputPath(inputPath), ReferenceError);
            });
        });

        describe('`inputPath` is a file name has invalid extension', () => {
            const tmpFileName: string = 'test.ts';
            const inputPath: string = `${tmpDir}/${tmpFileName}`;

            before(() => {
                fs.writeFileSync(inputPath, fileContent);
            });

            it('should throw an error if `inputPath` is a file name has invalid extension', () => {
                assert.throws(() => CLIUtils.validateInputPath(inputPath), ReferenceError);
            });

            after(() => {
                fs.unlinkSync(inputPath);
            });
        });
    });

    after(() => {
        fs.rmdirSync(tmpDir);
    });
});
