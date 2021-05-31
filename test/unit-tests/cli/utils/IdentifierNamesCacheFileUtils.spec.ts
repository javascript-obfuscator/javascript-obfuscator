import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as rimraf from 'rimraf';

import { assert } from 'chai';

import { TIdentifierNamesCache } from '../../../../src/types/TIdentifierNamesCache';

import { IdentifierNamesCacheFileUtils } from '../../../../src/cli/utils/IdentifierNamesCacheFileUtils';

describe('IdentifierNamesCacheFileUtils', () => {
    const expectedFilePathError: RegExp = /Given identifier names cache path must be/;
    const expectedFileContentError: RegExp = /Identifier names cache file must contains/;
    const expectedIdentifierNamesCache: TIdentifierNamesCache = {
        globalIdentifiers: {
            foo: '_0x123456'
        },
        propertyIdentifiers: {
            bar: '_0x654321'
        }
    };
    const fileContent: string = JSON.stringify(expectedIdentifierNamesCache);
    const tmpDirectoryPath: string = path.join('test', 'tmp');

    before(() => {
        mkdirp.sync(tmpDirectoryPath);
    });

    describe('readFile', () => {
        describe('Variant #1: input path is a file path', () => {
            describe('Variant #1: `identifierNamesCachePath` is a valid cache path', () => {
                describe('Variant #1: valid `json` as identifier names cache file content', () => {
                    const tmpFileName: string = 'cache.json';
                    const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);

                    let identifierNamesCache: TIdentifierNamesCache | null;

                    before(() => {
                        fs.writeFileSync(inputPath, fileContent);
                        identifierNamesCache = new IdentifierNamesCacheFileUtils(inputPath).readFile();
                    });

                    it('should return valid identifier names cache', () => {
                        assert.deepEqual(identifierNamesCache, expectedIdentifierNamesCache);
                    });

                    after(() => {
                        fs.unlinkSync(inputPath);
                    });
                });

                describe('Variant #2: invalid `json` as identifier names cache file content', () => {
                    const tmpFileName: string = 'cache.json';
                    const fileContent: string = '{globalIdentifiers: }';
                    const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);

                    let testFunc: () => TIdentifierNamesCache | null;

                    before(() => {
                        fs.writeFileSync(inputPath, fileContent);
                        testFunc = () => new IdentifierNamesCacheFileUtils(inputPath).readFile();
                    });

                    it('should throw an error', () => {
                        assert.throws(testFunc, expectedFileContentError);
                    });

                    after(() => {
                        fs.unlinkSync(inputPath);
                    });
                });

                describe('Variant #3: some string as identifier names cache file content', () => {
                    const tmpFileName: string = 'cache.json';
                    const fileContent: string = 'cache string';
                    const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);

                    let testFunc: () => TIdentifierNamesCache | null;

                    before(() => {
                        fs.writeFileSync(inputPath, fileContent);
                        testFunc = () => new IdentifierNamesCacheFileUtils(inputPath).readFile();
                    });

                    it('should throw an error', () => {
                        assert.throws(testFunc, expectedFileContentError);
                    });

                    after(() => {
                        fs.unlinkSync(inputPath);
                    });
                });
            });

            describe('Variant #2: `identifierNamesCachePath` is a valid path with invalid extension', () => {
                const tmpFileName: string = 'cache.js';
                const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);

                let testFunc: () => void;

                before(() => {
                    fs.writeFileSync(inputPath, fileContent);
                    testFunc = () => new IdentifierNamesCacheFileUtils(inputPath).readFile();
                });

                it('should throw an error if `identifierNamesCachePath` is not a valid path', () => {
                    assert.throws(testFunc, expectedFilePathError);
                });

                after(() => {
                    fs.unlinkSync(inputPath);
                });
            });

            describe('Variant #3: `identifierNamesCachePath` is not a valid cache path', () => {
                const tmpFileName: string = 'cache.js';
                const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);

                let testFunc: () => void;

                before(() => {
                    testFunc = () => new IdentifierNamesCacheFileUtils(inputPath).readFile();
                });

                it('should throw an error if `identifierNamesCachePath` is not a valid path', () => {
                    assert.throws(testFunc, expectedFilePathError);
                });
            });
        });

        describe('Variant #2: input path is a directory path', () => {
            describe('Variant #1: `inputPath` is a valid path', () => {
                let testFunc: () => TIdentifierNamesCache;

                before(() => {
                    testFunc = () => new IdentifierNamesCacheFileUtils(tmpDirectoryPath).readFile();
                });

                it('should throw an error if `identifierNamesCachePath` is a directory path', () => {
                    assert.throws(testFunc, expectedFilePathError);
                });
            });
        });
    });

    after(() => {
        rimraf.sync(tmpDirectoryPath);
    });
});
