import { assert } from 'chai';

import { TInputOptions } from '../../../../src/types/options/TInputOptions';

import { CLIUtils } from '../../../../src/cli/utils/CLIUtils';

describe('CLIUtils', () => {
    describe('getUserConfig', () => {
        describe('Variant #1: valid config file path', () => {
            describe('Variant #1: js file with config', () => {
                const configDirName: string = 'test/fixtures';
                const configFileName: string = 'config.js';
                const configFilePath: string = `../../../${configDirName}/${configFileName}`;
                const expectedResult: TInputOptions = {
                    compact: true,
                    exclude: ['**/foo.js'],
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

            describe('Variant #2: json file with config', () => {
                const configDirName: string = 'test/fixtures';
                const configFileName: string = 'config.json';
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
        });

        describe('Variant #2: invalid config file path', () => {
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
