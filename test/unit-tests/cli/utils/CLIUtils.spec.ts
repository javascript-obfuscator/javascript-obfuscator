import { assert } from 'chai';

import { TInputOptions } from '../../../../src/types/options/TInputOptions';

import { StringArrayEncoding } from '../../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';

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

            describe('Variant #2: cjs file with config', () => {
                const configDirName: string = 'test/fixtures';
                const configFileName: string = 'config.cjs';
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

            describe('Variant #3: json file with config', () => {
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

        describe('Variant #2: invalid config file extension', () => {
            const configDirName: string = 'test/fixtures';
            const configFileName: string = 'configs.config';
            const configFilePath: string = `../../../${configDirName}/${configFileName}`;

            let testFunc: () => void;

            before(() => {
                testFunc = () => CLIUtils.getUserConfig(configFilePath);
            });

            it('should throw an error if `configFilePath` is not a valid path', () => {
                assert.throws(testFunc, /Given config path must be a valid/);
            });
        });

        describe('Variant #3: invalid config file path', () => {
            const configDirName: string = 'test/fixtures';
            const configFileName: string = 'configs.js';
            const configFilePath: string = `../../../${configDirName}/${configFileName}`;

            let testFunc: () => void;

            before(() => {
                testFunc = () => CLIUtils.getUserConfig(configFilePath);
            });

            it('should throw an error if `configFilePath` is not a valid path', () => {
                assert.throws(testFunc, /Cannot open config file/);
            });
        });
    });

    describe('stringifyOptionAvailableValues', () => {
        describe('Variant #1: should stringify option available values', () => {
            const expectedResult: string = 'none, base64, rc4';

            let result: Object;

            before(() => {
                result = CLIUtils.stringifyOptionAvailableValues(StringArrayEncoding);
            });

            it('should return option available values as string', () => {
                assert.deepEqual(result, expectedResult);
            });
        });
    });
});
