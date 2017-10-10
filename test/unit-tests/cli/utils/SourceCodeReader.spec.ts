import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

import { assert } from 'chai';

import { SourceCodeReader } from '../../../../src/cli/utils/SourceCodeReader';
import { IFileData } from '../../../../src/interfaces/cli/IFileData';

describe('SourceCodeReader', () => {
    const fileContent: string = 'test';
    const tmpDir: string = 'test/tmp';

    before(() => {
        mkdirp.sync(tmpDir);
    });

    describe('readSourceCode (inputPath: string): void', () => {
        describe('Variant #1: input path is a file path', () => {
            describe('`inputPath` is a valid path', () => {
                const tmpFileName: string = 'test.js';
                const inputPath: string = `${tmpDir}/${tmpFileName}`;

                let result: string | IFileData[];

                before(() => {
                    fs.writeFileSync(inputPath, fileContent);
                    result = SourceCodeReader.readSourceCode(inputPath);
                });

                it('should return content of file', () => {
                    assert.equal(result, fileContent);
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
                    testFunc = () => SourceCodeReader.readSourceCode(inputPath);
                });

                it('should throw an error if `inputPath` is not a valid path', () => {
                    assert.throws(testFunc, ReferenceError);
                });
            });

            describe('`inputPath` has invalid extension', () => {
                const tmpFileName: string = 'test.ts';
                const inputPath: string = `${tmpDir}/${tmpFileName}`;

                let testFunc: () => void;

                before(() => {
                    fs.writeFileSync(inputPath, fileContent);
                    testFunc = () => SourceCodeReader.readSourceCode(inputPath);
                });

                it('should throw an error if `inputPath` has invalid extension', () => {
                    assert.throws(testFunc, ReferenceError);
                });

                after(() => {
                    fs.unlinkSync(inputPath);
                });
            });
        });

        describe('Variant #2: input path is a directory path', () => {
            describe('`inputPath` is a valid path', () => {
                const tmpFileName1: string = 'foo.js';
                const tmpFileName2: string = 'bar.js';
                const tmpFileName3: string = 'baz.png';
                const tmpFileName4: string = 'bark-obfuscated.js';
                const filePath1: string = `${tmpDir}/${tmpFileName1}`;
                const filePath2: string = `${tmpDir}/${tmpFileName2}`;
                const filePath3: string = `${tmpDir}/${tmpFileName3}`;
                const filePath4: string = `${tmpDir}/${tmpFileName4}`;

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
                    result = SourceCodeReader.readSourceCode(tmpDir);
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

            describe('`inputPath` is not a valid path', () => {
                const inputPath: string = 'abc';

                let testFunc: () => void;

                before(() => {
                    testFunc = () => SourceCodeReader.readSourceCode(inputPath);
                });

                it('should throw an error if `inputPath` is not a valid path', () => {
                    assert.throws(testFunc, ReferenceError);
                });
            });
        });
    });

    after(() => {
        fs.rmdirSync(tmpDir);
    });
});
