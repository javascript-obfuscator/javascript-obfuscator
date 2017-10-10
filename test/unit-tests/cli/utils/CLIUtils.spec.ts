import { assert } from 'chai';

import { TInputOptions } from '../../../../src/types/options/TInputOptions';

import { CLIUtils } from '../../../../src/cli/utils/CLIUtils';

describe('CLIUtils', () => {
    describe('getOutputCodePath (inputPath: string): string', () => {
        let expectedInputPath: string = 'test/input/test-obfuscated.js',
            inputPath: string = 'test/input/test.js';

        it('should output path based on `inputPath`', () => {
            assert.equal(CLIUtils.getOutputCodePath(inputPath), expectedInputPath);
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
});
