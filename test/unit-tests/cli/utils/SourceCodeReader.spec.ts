import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as rimraf from 'rimraf';

import { assert } from 'chai';
import * as sinon from 'sinon';

import { IFileData } from '../../../../src/interfaces/cli/IFileData';

import { SourceCodeReader } from '../../../../src/cli/utils/SourceCodeReader';

describe('SourceCodeReader', () => {
    const expectedError: RegExp = /Given input path must be a valid/;
    const fileContent: string = 'test';
    const tmpDirectoryPath: string = 'test/tmp';

    before(() => {
        mkdirp.sync(tmpDirectoryPath);
    });

    describe('readSourceCode', () => {
        describe('Variant #1: input path is a file path', () => {
            describe('Variant #1: `inputPath` is a valid path', () => {
                const tmpFileName: string = 'test.js';
                const inputPath: string = `${tmpDirectoryPath}/${tmpFileName}`;

                let result: string | IFileData[];

                before(() => {
                    fs.writeFileSync(inputPath, fileContent);
                    result = new SourceCodeReader({}).readSourceCode(inputPath);
                });

                it('should return content of file', () => {
                    assert.equal(result, fileContent);
                });

                after(() => {
                    fs.unlinkSync(inputPath);
                });
            });

            describe('Variant #2: `inputPath` is not a valid path', () => {
                const tmpFileName: string = 'test.js';
                const inputPath: string = `${tmpDirectoryPath}/${tmpFileName}`;

                let testFunc: () => void;

                before(() => {
                    testFunc = () => new SourceCodeReader({}).readSourceCode(inputPath);
                });

                it('should throw an error if `inputPath` is not a valid path', () => {
                    assert.throws(testFunc, expectedError);
                });
            });

            describe('Variant #3: `inputPath` has invalid extension', () => {
                const tmpFileName: string = 'test.ts';
                const inputPath: string = `${tmpDirectoryPath}/${tmpFileName}`;

                let testFunc: () => void;

                before(() => {
                    fs.writeFileSync(inputPath, fileContent);
                    testFunc = () => new SourceCodeReader({}).readSourceCode(inputPath);
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
                    const inputPath: string = `${tmpDirectoryPath}/${tmpFileName}`;

                    let result: string | IFileData[];

                    before(() => {
                        fs.writeFileSync(inputPath, fileContent);
                        result = new SourceCodeReader({
                            exclude: ['**/foo.js']
                        }).readSourceCode(inputPath);                });

                    it('should return content of file', () => {
                        assert.equal(result, fileContent);
                    });

                    after(() => {
                        fs.unlinkSync(inputPath);
                    });
                });

                describe('Variant #2: `inputPath` is excluded path', () => {
                    describe('Variant #1: exclude by `glob` pattern', () => {
                        const tmpFileName: string = 'test.js';
                        const inputPath: string = `${tmpDirectoryPath}/${tmpFileName}`;

                        let testFunc: () => void;

                        before(() => {
                            fs.writeFileSync(inputPath, fileContent);
                            testFunc = () => new SourceCodeReader({
                                exclude: [`**/${tmpFileName}`]
                            }).readSourceCode(inputPath);
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
                        const inputPath: string = `${tmpDirectoryPath}/${tmpFileName}`;

                        let testFunc: () => void;

                        before(() => {
                            fs.writeFileSync(inputPath, fileContent);
                            testFunc = () => new SourceCodeReader({
                                exclude: [tmpFileName]
                            }).readSourceCode(inputPath);
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
                        const inputPath: string = `${tmpDirectoryPath}/${tmpFileName}`;

                        let testFunc: () => void;

                        before(() => {
                            fs.writeFileSync(inputPath, fileContent);
                            testFunc = () => new SourceCodeReader({
                                exclude: [inputPath]
                            }).readSourceCode(inputPath);
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
                const filePath1: string = `${tmpDirectoryPath}/${tmpFileName1}`;
                const filePath2: string = `${tmpDirectoryPath}/${tmpFileName2}`;
                const filePath3: string = `${tmpDirectoryPath}/${tmpFileName3}`;
                const filePath4: string = `${tmpDirectoryPath}/${tmpFileName4}`;

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

                let result: string | IFileData[];

                before(() => {
                    fs.writeFileSync(filePath1, fileContent);
                    fs.writeFileSync(filePath2, fileContent);
                    fs.writeFileSync(filePath3, fileContent);
                    fs.writeFileSync(filePath4, fileContent);
                    result = new SourceCodeReader({}).readSourceCode(tmpDirectoryPath);
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
                    testFunc = () => new SourceCodeReader({}).readSourceCode(inputPath);
                });

                it('should throw an error if `inputPath` is not a valid path', () => {
                    assert.throws(testFunc, expectedError);
                });
            });

            describe('Variant #3: `inputPath` is a directory with sub-directories', () => {
                const parentDirectoryName1: string = 'parent1';
                const parentDirectoryName2: string = 'parent';
                const parentDirectoryPath1: string = `${tmpDirectoryPath}/${parentDirectoryName1}`;
                const parentDirectoryPath2: string = `${tmpDirectoryPath}/${parentDirectoryName2}`;
                const tmpFileName1: string = 'foo.js';
                const tmpFileName2: string = 'bar.js';
                const tmpFileName3: string = 'baz.js';
                const tmpFileName4: string = 'bark.js';
                const filePath1: string = `${tmpDirectoryPath}/${tmpFileName1}`;
                const filePath2: string = `${tmpDirectoryPath}/${tmpFileName2}`;
                const filePath3: string = `${parentDirectoryPath1}/${tmpFileName3}`;
                const filePath4: string = `${parentDirectoryPath2}/${tmpFileName4}`;

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

                let result: string | IFileData[];

                before(() => {
                    mkdirp.sync(parentDirectoryPath1);
                    mkdirp.sync(parentDirectoryPath2);
                    fs.writeFileSync(filePath1, fileContent);
                    fs.writeFileSync(filePath2, fileContent);
                    fs.writeFileSync(filePath3, fileContent);
                    fs.writeFileSync(filePath4, fileContent);
                    result = new SourceCodeReader({}).readSourceCode(tmpDirectoryPath);
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
                    const filePath1: string = `${tmpDirectoryPath}/${tmpFileName1}`;
                    const filePath2: string = `${tmpDirectoryPath}/${tmpFileName2}`;
                    const filePath3: string = `${tmpDirectoryPath}/${tmpFileName3}`;
                    const filePath4: string = `${tmpDirectoryPath}/${tmpFileName4}`;

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

                    let result: string | IFileData[];

                    before(() => {
                        fs.writeFileSync(filePath1, fileContent);
                        fs.writeFileSync(filePath2, fileContent);
                        fs.writeFileSync(filePath3, fileContent);
                        fs.writeFileSync(filePath4, fileContent);
                        result = new SourceCodeReader({
                            exclude: ['**/hawk.js']
                        }).readSourceCode(tmpDirectoryPath);
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
                        const filePath1: string = `${tmpDirectoryPath}/${tmpFileName1}`;
                        const filePath2: string = `${tmpDirectoryPath}/${tmpFileName2}`;
                        const filePath3: string = `${tmpDirectoryPath}/${tmpFileName3}`;
                        const filePath4: string = `${tmpDirectoryPath}/${tmpFileName4}`;

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

                        let result: string | IFileData[];

                        before(() => {
                            fs.writeFileSync(filePath1, fileContent);
                            fs.writeFileSync(filePath2, fileContent);
                            fs.writeFileSync(filePath3, fileContent);
                            fs.writeFileSync(filePath4, fileContent);
                            result = new SourceCodeReader({
                                exclude: [
                                    `**/${tmpFileName2}`,
                                    `**/${tmpFileName4}`
                                ]
                            }).readSourceCode(tmpDirectoryPath);
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
                        const filePath1: string = `${tmpDirectoryPath}/${tmpFileName1}`;
                        const filePath2: string = `${tmpDirectoryPath}/${tmpFileName2}`;
                        const filePath3: string = `${tmpDirectoryPath}/${tmpFileName3}`;
                        const filePath4: string = `${tmpDirectoryPath}/${tmpFileName4}`;

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

                        let result: string | IFileData[];

                        before(() => {
                            fs.writeFileSync(filePath1, fileContent);
                            fs.writeFileSync(filePath2, fileContent);
                            fs.writeFileSync(filePath3, fileContent);
                            fs.writeFileSync(filePath4, fileContent);
                            result = new SourceCodeReader({
                                exclude: [
                                    tmpFileName2,
                                    tmpFileName4
                                ]
                            }).readSourceCode(tmpDirectoryPath);
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
                        const filePath1: string = `${tmpDirectoryPath}/${tmpFileName1}`;
                        const filePath2: string = `${tmpDirectoryPath}/${tmpFileName2}`;
                        const filePath3: string = `${tmpDirectoryPath}/${tmpFileName3}`;
                        const filePath4: string = `${tmpDirectoryPath}/${tmpFileName4}`;

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

                        let result: string | IFileData[];

                        before(() => {
                            fs.writeFileSync(filePath1, fileContent);
                            fs.writeFileSync(filePath2, fileContent);
                            fs.writeFileSync(filePath3, fileContent);
                            fs.writeFileSync(filePath4, fileContent);
                            result = new SourceCodeReader({
                                exclude: [
                                    filePath2,
                                    filePath4
                                ]
                            }).readSourceCode(tmpDirectoryPath);
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
                        const filePath1: string = `${tmpDirectoryPath}/${tmpFileName1}`;
                        const filePath2: string = `${tmpDirectoryPath}/${tmpFileName2}`;
                        const filePath3: string = `${tmpDirectoryPath}/${tmpFileName3}`;
                        const filePath4: string = `${tmpDirectoryPath}/${tmpFileName4}`;

                        let testFunc: () => void;

                        before(() => {
                            fs.writeFileSync(filePath1, fileContent);
                            fs.writeFileSync(filePath2, fileContent);
                            fs.writeFileSync(filePath3, fileContent);
                            fs.writeFileSync(filePath4, fileContent);
                            testFunc = () => new SourceCodeReader({
                                exclude: [tmpDirectoryPath]
                            }).readSourceCode(tmpDirectoryPath);
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
        });

        describe('Variant #3: logging', () => {
            const tmpFileName: string = 'test.js';
            const inputPath: string = `${tmpDirectoryPath}/${tmpFileName}`;
            const expectedConsoleLogCallResult: boolean = true;
            const expectedLoggingMessage: string = `[javascript-obfuscator-cli] Obfuscating file: ${inputPath}...`;

            let consoleLogSpy: sinon.SinonSpy,
                consoleLogCallResult: boolean,
                loggingMessageResult: string;

            before(() => {
                consoleLogSpy = sinon.spy(console, 'log');

                fs.writeFileSync(inputPath, fileContent);
                new SourceCodeReader({}).readSourceCode(inputPath);

                consoleLogCallResult = consoleLogSpy.called;
                loggingMessageResult = consoleLogSpy.getCall(0).args[0];
            });

            it('should call `console.log`', () => {
                assert.equal(consoleLogCallResult, expectedConsoleLogCallResult);
            });

            it('should log file name to the console', () => {
                assert.include(loggingMessageResult, expectedLoggingMessage);
            });


            after(() => {
                consoleLogSpy.restore();
                fs.unlinkSync(inputPath);
            });
        });
    });

    after(() => {
        rimraf.sync(tmpDirectoryPath);
    });
});
