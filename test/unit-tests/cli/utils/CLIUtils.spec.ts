import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

import { assert } from 'chai';

import { TInputOptions } from '../../../../src/types/options/TInputOptions';

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

    describe('getUserConfig (configPath: string): Object', () => {
        describe('variant #1: valid config file path', () => {
            const configDirName: string = 'test/fixtures';
            const configFileName: string = 'config.js';
            const configFilePath: string = `../../../${configDirName}/${configFileName}`;
            const expectedResult: TInputOptions = {
                compact: true,
                selfDefending: false,
                sourceMap: true
            };

            let result: Object;

            before(() => {
                result = CLIUtils.getUserConfig(configFilePath);
            });

            it('should return object with user configuration', () => {
                assert.deepEqual(result, expectedResult);
            });
        });

        describe('variant #2: invalid config file path', () => {
            const configDirName: string = 'test/fixtures';
            const configFileName: string = 'configs.js';
            const configFilePath: string = `../../../${configDirName}/${configFileName}`;

            let testFunc: () => void;

            before(() => {
                testFunc = () => CLIUtils.getUserConfig(configFilePath);
            });

            it('should throw an error if `configFilePath` is not a valid path', () => {
                assert.throws(testFunc, ReferenceError);
            });
        });
    });

    describe('validateInputPath (inputPath: string): void', () => {
        describe('`inputPath` is a valid path', () => {
            const tmpFileName: string = 'test.js';
            const inputPath: string = `${tmpDir}/${tmpFileName}`;

            let testFunc: () => void;

            before(() => {
                fs.writeFileSync(inputPath, fileContent);
                testFunc = () => CLIUtils.validateInputPath(inputPath);
            });

            it('shouldn\'t throw an error if `inputPath` is a valid path', () => {
                assert.doesNotThrow(testFunc, ReferenceError);
            });

            after(() => {
                fs.unlinkSync(inputPath);
            });
        });

        describe('`inputPath` is not a valid path', () => {
            const tmpFileName: string = 'test.js';
            const inputPath: string = `${tmpDir}/${tmpFileName}`;

            let testFunc: () => void;

            before(() => {
                testFunc = () => CLIUtils.validateInputPath(inputPath);
            });

            it('should throw an error if `inputPath` is not a valid path', () => {
                assert.throws(testFunc, ReferenceError);
            });
        });

        describe('`inputPath` is a file name has invalid extension', () => {
            const tmpFileName: string = 'test.ts';
            const inputPath: string = `${tmpDir}/${tmpFileName}`;

            let testFunc: () => void;

            before(() => {
                fs.writeFileSync(inputPath, fileContent);
                testFunc = () => CLIUtils.validateInputPath(inputPath);
            });

            it('should throw an error if `inputPath` is a file name has invalid extension', () => {
                assert.throws(testFunc, ReferenceError);
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
