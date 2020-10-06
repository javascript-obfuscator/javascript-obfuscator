import { assert } from 'chai';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as rimraf from 'rimraf';

import { ObfuscatedCodeWriter } from '../../../../src/cli/utils/ObfuscatedCodeWriter';

describe('ObfuscatedCodeWriter', () => {
    const tmpDirectoryPath: string = 'test/tmp';

    describe('getOutputCodePath', () => {
        before(() => {
            mkdirp.sync(path.join(tmpDirectoryPath, 'input'));
            fs.writeFileSync(
                path.join(tmpDirectoryPath, 'input', 'test-input.js'),
                'var foo = 1;'
            );
        });

        describe('Variant #1: raw input path is a file path, raw output path is a file path', () => {
            const inputPath: string = path.join(tmpDirectoryPath, 'input', 'test-input.js');
            const rawInputPath: string = path.join(tmpDirectoryPath, 'input', 'test-input.js');
            const rawOutputPath: string = path.join(tmpDirectoryPath, 'output', 'test-output.js');
            const expectedOutputCodePath: string = path.join(tmpDirectoryPath, 'output', 'test-output.js');

            let outputCodePath: string;

            before(() => {
                const obfuscatedCodeWriter: ObfuscatedCodeWriter = new ObfuscatedCodeWriter(
                    rawInputPath,
                    {
                        output: rawOutputPath
                    }
                );
                outputCodePath = obfuscatedCodeWriter.getOutputCodePath(inputPath);
            });

            it('should return output path that equals to passed output file path', () => {
                assert.equal(outputCodePath, expectedOutputCodePath);
            });
        });

        describe('Variant #2: raw input path is a file path, raw output path is a directory path', () => {
            const inputPath: string = path.join(tmpDirectoryPath, 'input', 'test-input.js');
            const rawInputPath: string = path.join(tmpDirectoryPath, 'input', 'test-input.js');
            const rawOutputPath: string = path.join(tmpDirectoryPath, 'output');
            const expectedOutputCodePath: string = path.join(tmpDirectoryPath, 'output', 'test-input.js');

            let outputCodePath: string;

            before(() => {
                const obfuscatedCodeWriter: ObfuscatedCodeWriter = new ObfuscatedCodeWriter(
                    rawInputPath,
                    {
                        output: rawOutputPath
                    }
                );
                outputCodePath = obfuscatedCodeWriter.getOutputCodePath(inputPath);
            });

            it('should return output path that equals to passed output directory with file name from actual file path', () => {
                assert.equal(outputCodePath, expectedOutputCodePath);
            });
        });

        describe('Variant #3: raw input path is a directory path, raw output path is a file path', () => {
            const inputPath: string = path.join(tmpDirectoryPath, 'input', 'test-input.js');
            const rawInputPath: string = path.join(tmpDirectoryPath, 'input');
            const rawOutputPath: string = path.join(tmpDirectoryPath, 'output', 'test-output.js');

            let testFunc: () => string;

            before(() => {
                const obfuscatedCodeWriter: ObfuscatedCodeWriter = new ObfuscatedCodeWriter(
                    rawInputPath,
                    {
                        output: rawOutputPath
                    }
                );
                testFunc = () => obfuscatedCodeWriter.getOutputCodePath(inputPath);
            });

            it('should throw an error if output path is a file path', () => {
                assert.throws(testFunc, Error);
            });
        });

        describe('Variant #4: raw input path is a directory path, raw output path is a directory path', () => {
            describe('Variant #1: base directory name', () => {
                const inputPath: string = path.join(tmpDirectoryPath, 'input', 'test-input.js');
                const rawInputPath: string = path.join(tmpDirectoryPath, 'input');
                const rawOutputPath: string = path.join(tmpDirectoryPath, 'output');
                const expectedOutputCodePath: string = path.join(
                    tmpDirectoryPath,
                    'output',
                    tmpDirectoryPath,
                    'input',
                    'test-input.js'
                );

                let outputCodePath: string;

                before(() => {
                    const obfuscatedCodeWriter: ObfuscatedCodeWriter = new ObfuscatedCodeWriter(
                        rawInputPath,
                        {
                            output: rawOutputPath
                        }
                    );
                    outputCodePath = obfuscatedCodeWriter.getOutputCodePath(inputPath);
                });

                it('should return output path that contains raw output path and actual file input path', () => {
                    assert.equal(outputCodePath, expectedOutputCodePath);
                });
            });

            describe('Variant #2: directory name with dot', () => {
                const inputPath: string = path.join(tmpDirectoryPath, 'input', 'test-input.js');
                const rawInputPath: string = path.join(tmpDirectoryPath, 'input');
                const rawOutputPath: string = path.join(tmpDirectoryPath, 'output', 'foo.bar');
                const expectedOutputCodePath: string = path.join(
                    tmpDirectoryPath,
                    'output',
                    'foo.bar',
                    tmpDirectoryPath,
                    'input',
                    'test-input.js'
                );

                let outputCodePath: string;

                before(() => {
                    const obfuscatedCodeWriter: ObfuscatedCodeWriter = new ObfuscatedCodeWriter(
                        rawInputPath,
                        {
                            output: rawOutputPath
                        }
                    );
                    outputCodePath = obfuscatedCodeWriter.getOutputCodePath(inputPath);
                });

                it('should return output path that contains raw output path and actual file input path', () => {
                    assert.equal(outputCodePath, expectedOutputCodePath);
                });
            });
        });

        after(() => {
            rimraf.sync(tmpDirectoryPath);
        });
    });

    describe('getOutputSourceMapPath', () => {
        const rawInputPath: string = path.join(tmpDirectoryPath, 'input', 'test-input.js');
        const rawOutputPath: string = path.join(tmpDirectoryPath, 'output', 'test-output.js');
        const outputCodePath: string = path.join(tmpDirectoryPath, 'output', 'test-output.js');
        const expectedOutputSourceMapPath: string = path.join(tmpDirectoryPath, 'output', 'test-output.js.map');

        let outputSourceMapPath: string;

        before(() => {
            const obfuscatedCodeWriter: ObfuscatedCodeWriter = new ObfuscatedCodeWriter(
                rawInputPath,
                {
                    output: rawOutputPath
                }
            );
            outputSourceMapPath = obfuscatedCodeWriter.getOutputSourceMapPath(outputCodePath);
        });

        it('should return output path for source map', () => {
            assert.equal(outputSourceMapPath, expectedOutputSourceMapPath);
        });
    });
});
