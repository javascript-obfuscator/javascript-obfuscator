import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as rimraf from 'rimraf';

import { assert } from 'chai';

import { IFileData } from '../../../../src/interfaces/cli/IFileData';

import { SourceCodeFileUtils } from '../../../../src/cli/utils/SourceCodeFileUtils';

describe('SourceCodeFileUtils', () => {
    const expectedError: RegExp = /Given input path must be a valid/;
    const fileContent: string = 'test';
    const tmpDirectoryPath: string = path.join('test', 'tmp');

    before(() => {
        mkdirp.sync(tmpDirectoryPath);
    });

    describe('readSourceCode', () => {
        describe('Variant #1: input path is a file path', () => {
            describe('Variant #1: `inputPath` is a valid path', () => {
                const tmpFileName: string = 'test.js';
                const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);
                const expectedFilesData: IFileData[] = [{
                    content: fileContent,
                    filePath: inputPath
                }];

                let filesData: IFileData[];

                before(() => {
                    fs.writeFileSync(inputPath, fileContent);
                    filesData = new SourceCodeFileUtils(inputPath, {}).readSourceCode();
                });

                it('should return valid files data', () => {
                    assert.deepEqual(filesData, expectedFilesData);
                });

                after(() => {
                    fs.unlinkSync(inputPath);
                });
            });

            describe('Variant #2: `inputPath` is not a valid path', () => {
                const tmpFileName: string = 'test.js';
                const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);

                let testFunc: () => void;

                before(() => {
                    testFunc = () => new SourceCodeFileUtils(inputPath, {}).readSourceCode();
                });

                it('should throw an error if `inputPath` is not a valid path', () => {
                    assert.throws(testFunc, expectedError);
                });
            });

            describe('Variant #3: `inputPath` has invalid extension', () => {
                const tmpFileName: string = 'test.ts';
                const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);

                let testFunc: () => void;

                before(() => {
                    fs.writeFileSync(inputPath, fileContent);
                    testFunc = () => new SourceCodeFileUtils(inputPath, {}).readSourceCode();
                });

                it('should throw an error if `inputPath` has invalid extension', () => {
                    assert.throws(testFunc, expectedError);
                });

                after(() => {
                    fs.unlinkSync(inputPath);
                });
            });

            describe('Variant #4: `exclude` option', () => {
                describe('Variant #1: `inputPath` isn\'t excluded path', () => {
                    const tmpFileName: string = 'test.js';
                    const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);
                    const expectedFilesData: IFileData[] = [{
                        content: fileContent,
                        filePath: inputPath
                    }];

                    let filesData: IFileData[];

                    before(() => {
                        fs.writeFileSync(inputPath, fileContent);
                        filesData = new SourceCodeFileUtils(
                            inputPath,
                            {
                                exclude: [path.join('**', 'foo.js')]
                            }
                        ).readSourceCode();
                    });

                    it('should return valid files data', () => {
                        assert.deepEqual(filesData, expectedFilesData);
                    });

                    after(() => {
                        fs.unlinkSync(inputPath);
                    });
                });

                describe('Variant #2: `inputPath` is excluded path', () => {
                    describe('Variant #1: exclude by `glob` pattern', () => {
                        const tmpFileName: string = 'test.js';
                        const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);

                        let testFunc: () => void;

                        before(() => {
                            fs.writeFileSync(inputPath, fileContent);
                            testFunc = () => new SourceCodeFileUtils(
                                inputPath,
                                {
                                    exclude: [path.join('**', tmpFileName)]
                                }
                            ).readSourceCode();
                        });

                        it('should throw an error if `inputPath` is the excluded file path', () => {
                            assert.throws(testFunc, expectedError);
                        });

                        after(() => {
                            fs.unlinkSync(inputPath);
                        });
                    });

                    describe('Variant #2: exclude by file name', () => {
                        const tmpFileName: string = 'test.js';
                        const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);

                        let testFunc: () => void;

                        before(() => {
                            fs.writeFileSync(inputPath, fileContent);
                            testFunc = () => new SourceCodeFileUtils(
                                inputPath,
                                {
                                    exclude: [tmpFileName]
                                }
                            ).readSourceCode();
                        });

                        it('should throw an error if `inputPath` is the excluded file path', () => {
                            assert.throws(testFunc, expectedError);
                        });

                        after(() => {
                            fs.unlinkSync(inputPath);
                        });
                    });

                    describe('Variant #3: exclude by file path', () => {
                        const tmpFileName: string = 'test.js';
                        const inputPath: string = path.join(tmpDirectoryPath, tmpFileName);

                        let testFunc: () => void;

                        before(() => {
                            fs.writeFileSync(inputPath, fileContent);
                            testFunc = () => new SourceCodeFileUtils(
                                inputPath,
                                {
                                    exclude: [inputPath]
                                }
                            ).readSourceCode();
                        });

                        it('should throw an error if `inputPath` is the excluded file path', () => {
                            assert.throws(testFunc, expectedError);
                        });

                        after(() => {
                            fs.unlinkSync(inputPath);
                        });
                    });
                });
            });
        });

        describe('Variant #2: input path is a directory path', () => {
            describe('Variant #1: `inputPath` is a valid path', () => {
                const tmpFileName1: string = 'foo.js';
                const tmpFileName2: string = 'bar.js';
                const tmpFileName3: string = 'baz.png';
                const tmpFileName4: string = 'bark-obfuscated.js';
                const filePath1: string = path.join(tmpDirectoryPath, tmpFileName1);
                const filePath2: string = path.join(tmpDirectoryPath, tmpFileName2);
                const filePath3: string = path.join(tmpDirectoryPath, tmpFileName3);
                const filePath4: string = path.join(tmpDirectoryPath, tmpFileName4);

                const expectedResult: IFileData[] = [
                    {
                        filePath: filePath2,
                        content: fileContent
                    },
                    {
                        filePath: filePath1,
                        content: fileContent
                    }
                ];

                let result: IFileData[];

                before(() => {
                    fs.writeFileSync(filePath1, fileContent);
                    fs.writeFileSync(filePath2, fileContent);
                    fs.writeFileSync(filePath3, fileContent);
                    fs.writeFileSync(filePath4, fileContent);
                    result = new SourceCodeFileUtils(tmpDirectoryPath, {}).readSourceCode();
                });

                it('should return files data', () => {
                    assert.deepEqual(result, expectedResult);
                });

                after(() => {
                    fs.unlinkSync(filePath1);
                    fs.unlinkSync(filePath2);
                    fs.unlinkSync(filePath3);
                    fs.unlinkSync(filePath4);
                });
            });

            describe('Variant #2: `inputPath` is not a valid path', () => {
                const inputPath: string = 'abc';

                let testFunc: () => void;

                before(() => {
                    testFunc = () => new SourceCodeFileUtils(inputPath, {}).readSourceCode();
                });

                it('should throw an error if `inputPath` is not a valid path', () => {
                    assert.throws(testFunc, expectedError);
                });
            });

            describe('Variant #3: `inputPath` is a directory with sub-directories', () => {
                const parentDirectoryName1: string = 'parent1';
                const parentDirectoryName2: string = 'parent';
                const parentDirectoryPath1: string = path.join(tmpDirectoryPath, parentDirectoryName1);
                const parentDirectoryPath2: string = path.join(tmpDirectoryPath, parentDirectoryName2);
                const tmpFileName1: string = 'foo.js';
                const tmpFileName2: string = 'bar.js';
                const tmpFileName3: string = 'baz.js';
                const tmpFileName4: string = 'bark.js';
                const filePath1: string = path.join(tmpDirectoryPath, tmpFileName1);
                const filePath2: string = path.join(tmpDirectoryPath, tmpFileName2);
                const filePath3: string = path.join(parentDirectoryPath1, tmpFileName3);
                const filePath4: string = path.join(parentDirectoryPath2, tmpFileName4);

                const expectedResult: IFileData[] = [
                    {
                        filePath: filePath2,
                        content: fileContent
                    },
                    {
                        filePath: filePath1,
                        content: fileContent
                    },
                    {
                        filePath: filePath4,
                        content: fileContent
                    },
                    {
                        filePath: filePath3,
                        content: fileContent
                    }
                ];

                let result: IFileData[];

                before(() => {
                    mkdirp.sync(parentDirectoryPath1);
                    mkdirp.sync(parentDirectoryPath2);
                    fs.writeFileSync(filePath1, fileContent);
                    fs.writeFileSync(filePath2, fileContent);
                    fs.writeFileSync(filePath3, fileContent);
                    fs.writeFileSync(filePath4, fileContent);
                    result = new SourceCodeFileUtils(tmpDirectoryPath, {}).readSourceCode();
                });

                it('should return files data', () => {
                    assert.deepEqual(result, expectedResult);
                });

                after(() => {
                    fs.unlinkSync(filePath1);
                    fs.unlinkSync(filePath2);
                    fs.unlinkSync(filePath3);
                    fs.unlinkSync(filePath4);
                    rimraf.sync(parentDirectoryPath1);
                    rimraf.sync(parentDirectoryPath2);
                });
            });

            describe('Variant #4: `exclude` option', () => {
                describe('Variant #1: `inputPath` isn\'t excluded path', () => {
                    const tmpFileName1: string = 'foo.js';
                    const tmpFileName2: string = 'bar.js';
                    const tmpFileName3: string = 'baz.png';
                    const tmpFileName4: string = 'bark-obfuscated.js';
                    const filePath1: string = path.join(tmpDirectoryPath, tmpFileName1);
                    const filePath2: string = path.join(tmpDirectoryPath, tmpFileName2);
                    const filePath3: string = path.join(tmpDirectoryPath, tmpFileName3);
                    const filePath4: string = path.join(tmpDirectoryPath, tmpFileName4);

                    const expectedResult: IFileData[] = [
                        {
                            filePath: filePath2,
                            content: fileContent
                        },
                        {
                            filePath: filePath1,
                            content: fileContent
                        }
                    ];

                    let result: IFileData[];

                    before(() => {
                        fs.writeFileSync(filePath1, fileContent);
                        fs.writeFileSync(filePath2, fileContent);
                        fs.writeFileSync(filePath3, fileContent);
                        fs.writeFileSync(filePath4, fileContent);
                        result = new SourceCodeFileUtils(
                            tmpDirectoryPath,
                            {
                                exclude: ['**/hawk.js']
                            }
                        ).readSourceCode();
                    });

                    it('should return files data', () => {
                        assert.deepEqual(result, expectedResult);
                    });

                    after(() => {
                        fs.unlinkSync(filePath1);
                        fs.unlinkSync(filePath2);
                        fs.unlinkSync(filePath3);
                        fs.unlinkSync(filePath4);
                    });
                });

                describe('Variant #2: `inputPath` is excluded path', () => {
                    describe('Variant #1: exclude by `glob` pattern', () => {
                        const tmpFileName1: string = 'foo.js';
                        const tmpFileName2: string = 'bar.js';
                        const tmpFileName3: string = 'baz.js';
                        const tmpFileName4: string = 'bark.js';
                        const filePath1: string = path.join(tmpDirectoryPath, tmpFileName1);
                        const filePath2: string = path.join(tmpDirectoryPath, tmpFileName2);
                        const filePath3: string = path.join(tmpDirectoryPath, tmpFileName3);
                        const filePath4: string = path.join(tmpDirectoryPath, tmpFileName4);

                        const expectedResult: IFileData[] = [
                            {
                                filePath: filePath3,
                                content: fileContent
                            },
                            {
                                filePath: filePath1,
                                content: fileContent
                            }
                        ];

                        let result: IFileData[];

                        before(() => {
                            fs.writeFileSync(filePath1, fileContent);
                            fs.writeFileSync(filePath2, fileContent);
                            fs.writeFileSync(filePath3, fileContent);
                            fs.writeFileSync(filePath4, fileContent);
                            result = new SourceCodeFileUtils(
                                tmpDirectoryPath,
                                {
                                    exclude: [
                                        `**/${tmpFileName2}`,
                                        `**/${tmpFileName4}`
                                    ]
                                }
                            ).readSourceCode();
                        });

                        it('should return files data', () => {
                            assert.deepEqual(result, expectedResult);
                        });

                        after(() => {
                            fs.unlinkSync(filePath1);
                            fs.unlinkSync(filePath2);
                            fs.unlinkSync(filePath3);
                            fs.unlinkSync(filePath4);
                        });
                    });

                    describe('Variant #2: exclude by file name', () => {
                        const tmpFileName1: string = 'foo.js';
                        const tmpFileName2: string = 'bar.js';
                        const tmpFileName3: string = 'baz.js';
                        const tmpFileName4: string = 'bark.js';
                        const filePath1: string = path.join(tmpDirectoryPath, tmpFileName1);
                        const filePath2: string = path.join(tmpDirectoryPath, tmpFileName2);
                        const filePath3: string = path.join(tmpDirectoryPath, tmpFileName3);
                        const filePath4: string = path.join(tmpDirectoryPath, tmpFileName4);

                        const expectedResult: IFileData[] = [
                            {
                                filePath: filePath3,
                                content: fileContent
                            },
                            {
                                filePath: filePath1,
                                content: fileContent
                            }
                        ];

                        let result: IFileData[];

                        before(() => {
                            fs.writeFileSync(filePath1, fileContent);
                            fs.writeFileSync(filePath2, fileContent);
                            fs.writeFileSync(filePath3, fileContent);
                            fs.writeFileSync(filePath4, fileContent);
                            result = new SourceCodeFileUtils(
                                tmpDirectoryPath,
                                {
                                    exclude: [
                                        tmpFileName2,
                                        tmpFileName4
                                    ]
                                }
                            ).readSourceCode();
                        });

                        it('should return files data', () => {
                            assert.deepEqual(result, expectedResult);
                        });

                        after(() => {
                            fs.unlinkSync(filePath1);
                            fs.unlinkSync(filePath2);
                            fs.unlinkSync(filePath3);
                            fs.unlinkSync(filePath4);
                        });
                    });

                    describe('Variant #3: exclude by file path', () => {
                        const tmpFileName1: string = 'foo.js';
                        const tmpFileName2: string = 'bar.js';
                        const tmpFileName3: string = 'baz.js';
                        const tmpFileName4: string = 'bark.js';
                        const filePath1: string = path.join(tmpDirectoryPath, tmpFileName1);
                        const filePath2: string = path.join(tmpDirectoryPath, tmpFileName2);
                        const filePath3: string = path.join(tmpDirectoryPath, tmpFileName3);
                        const filePath4: string = path.join(tmpDirectoryPath, tmpFileName4);

                        const expectedResult: IFileData[] = [
                            {
                                filePath: filePath3,
                                content: fileContent
                            },
                            {
                                filePath: filePath1,
                                content: fileContent
                            }
                        ];

                        let result: IFileData[];

                        before(() => {
                            fs.writeFileSync(filePath1, fileContent);
                            fs.writeFileSync(filePath2, fileContent);
                            fs.writeFileSync(filePath3, fileContent);
                            fs.writeFileSync(filePath4, fileContent);
                            result = new SourceCodeFileUtils(
                                tmpDirectoryPath,
                                {
                                    exclude: [
                                        filePath2,
                                        filePath4
                                    ]
                                }
                            ).readSourceCode();
                        });

                        it('should return files data', () => {
                            assert.deepEqual(result, expectedResult);
                        });

                        after(() => {
                            fs.unlinkSync(filePath1);
                            fs.unlinkSync(filePath2);
                            fs.unlinkSync(filePath3);
                            fs.unlinkSync(filePath4);
                        });
                    });

                    describe('Variant #4: exclude whole directory', () => {
                        const tmpFileName1: string = 'foo.js';
                        const tmpFileName2: string = 'bar.js';
                        const tmpFileName3: string = 'baz.js';
                        const tmpFileName4: string = 'bark.js';
                        const filePath1: string = path.join(tmpDirectoryPath, tmpFileName1);
                        const filePath2: string = path.join(tmpDirectoryPath, tmpFileName2);
                        const filePath3: string = path.join(tmpDirectoryPath, tmpFileName3);
                        const filePath4: string = path.join(tmpDirectoryPath, tmpFileName4);

                        let testFunc: () => void;

                        before(() => {
                            fs.writeFileSync(filePath1, fileContent);
                            fs.writeFileSync(filePath2, fileContent);
                            fs.writeFileSync(filePath3, fileContent);
                            fs.writeFileSync(filePath4, fileContent);
                            testFunc = () => new SourceCodeFileUtils(
                                tmpDirectoryPath,
                                {
                                    exclude: [tmpDirectoryPath]
                                }
                            ).readSourceCode();
                        });

                        it('should return files data', () => {
                            assert.throws(testFunc, expectedError);
                        });

                        after(() => {
                            fs.unlinkSync(filePath1);
                            fs.unlinkSync(filePath2);
                            fs.unlinkSync(filePath3);
                            fs.unlinkSync(filePath4);
                        });
                    });
                });
            });

            describe('Variant #5: `inputPath` is a valid path with dot', () => {
                const tmpDirectoryWithDotPath: string = `${tmpDirectoryPath}.bar`;
                const tmpFileName: string = 'foo.js';
                const filePath: string = path.join(tmpDirectoryWithDotPath, tmpFileName);

                const expectedResult: IFileData[] = [
                    {
                        filePath: filePath,
                        content: fileContent
                    }
                ];

                let result: IFileData[];

                before(() => {
                    mkdirp.sync(tmpDirectoryWithDotPath);
                    fs.writeFileSync(filePath, fileContent);
                    result = new SourceCodeFileUtils(tmpDirectoryWithDotPath, {}).readSourceCode();
                });

                it('should return files data', () => {
                    assert.deepEqual(result, expectedResult);
                });

                after(() => {
                    fs.unlinkSync(filePath);
                    rimraf.sync(tmpDirectoryWithDotPath);
                });
            });
        });
    });

    after(() => {
        rimraf.sync(tmpDirectoryPath);
    });
});
