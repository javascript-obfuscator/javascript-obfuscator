import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import { TInputCLIOptions } from '../../types/options/TInputCLIOptions';

import { StringSeparator } from '../../enums/StringSeparator';

import { JavaScriptObfuscatorCLI } from '../JavaScriptObfuscatorCLI';

export class ObfuscatedCodeFileUtils {
    /**
     * @type {string}
     */
    private readonly inputPath: string;

    /**
     * @type {TInputCLIOptions}
     */
    private readonly options: TInputCLIOptions;

    /**
     * @param {string} inputPath
     * @param {TInputCLIOptions} options
     */
    public constructor (
        inputPath: string,
        options: TInputCLIOptions
    ) {
        this.inputPath = path.normalize(inputPath);
        this.options = options;
    }

    /**
     * @param {string} filePath
     * @returns {string}
     */
    public getOutputCodePath (filePath: string): string {
        if (this.options.dangerously_overwrite) {
            return this.getOutputCodePathForOverwrite(filePath);
        }

        const normalizedFilePath: string = path.normalize(filePath);
        const normalizedRawOutputPath: string | null = this.options.output
            ? path.normalize(this.options.output)
            : null;

        if (!normalizedRawOutputPath) {
            return normalizedFilePath
                .split(StringSeparator.Dot)
                .map((value: string, index: number) => {
                    return index === 0 ? `${value}${JavaScriptObfuscatorCLI.obfuscatedFilePrefix}` : value;
                })
                .join(StringSeparator.Dot);
        }

        const rawInputPathStats: fs.Stats = fs.lstatSync(this.inputPath);
        const outputPathExtName: string = path.extname(normalizedRawOutputPath);

        const isDirectoryRawInputPath: boolean = rawInputPathStats.isDirectory();
        const isDirectoryRawOutputPath: boolean = !JavaScriptObfuscatorCLI
            .availableInputExtensions
            .includes(outputPathExtName);

        if (isDirectoryRawInputPath) {
            if (isDirectoryRawOutputPath) {
                const parsedNormalizedFilePath: path.ParsedPath = path.parse(normalizedFilePath);

                // Make ending with "/" consistent
                if (!parsedNormalizedFilePath.dir.endsWith('/') && this.inputPath.endsWith('/')) {
                    parsedNormalizedFilePath.dir += '/';
                }

                const baseOutputPath: string = path.join(
                    parsedNormalizedFilePath.dir.replace(this.inputPath, ''),
                    parsedNormalizedFilePath.base
                );

                return path.join(normalizedRawOutputPath, baseOutputPath);
            } else {
                throw new Error('Output path for directory obfuscation should be a directory path');
            }
        } else {
            if (isDirectoryRawOutputPath) {
                return path.join(normalizedRawOutputPath, path.basename(filePath));
            } else {
                return normalizedRawOutputPath;
            }
        }
    }

    /**
     * @param {string} filePath
     * @returns {string}
     */
    private getOutputCodePathForOverwrite (filePath: string): string {
        return path.normalize(filePath);
    }

    /**
     * @param {string} outputCodePath
     * @param {string} sourceMapFileName
     * @returns {string}
     */
    public getOutputSourceMapPath (outputCodePath: string, sourceMapFileName: string = ''): string {
        if (!outputCodePath) {
            throw new Error('Output code path is empty');
        }

        let normalizedOutputCodePath: string = path.normalize(outputCodePath);
        let parsedOutputCodePath: path.ParsedPath = path.parse(normalizedOutputCodePath);

        if (!parsedOutputCodePath.ext && !sourceMapFileName) {
            throw new Error('Source map file name should be set when output code path is a directory path');
        }

        if (sourceMapFileName) {
            const indexOfLastSeparator: number = normalizedOutputCodePath.lastIndexOf(path.sep);
            let sourceMapPath: string;

            if (parsedOutputCodePath.ext) {
                // File path with directory, like: `foo/bar.js`, or without, like: `bar.js`
                const isFilePathWithDirectory: boolean = indexOfLastSeparator > 0;

                sourceMapPath = isFilePathWithDirectory
                    ? normalizedOutputCodePath.slice(0, indexOfLastSeparator)
                    : '';
            } else {
                sourceMapPath = normalizedOutputCodePath;
            }

            // remove possible drive letter for win32 environment
            const normalizedSourceMapFilePath: string = sourceMapFileName.replace(/^[a-zA-Z]:\\*/, '');

            normalizedOutputCodePath = path.join(sourceMapPath, normalizedSourceMapFilePath);
        }

        if (!/\.js\.map$/.test(normalizedOutputCodePath)) {
            parsedOutputCodePath = path.parse(normalizedOutputCodePath);
            const outputCodePathWithoutExtension: string = path.join(parsedOutputCodePath.dir, parsedOutputCodePath.name);

            normalizedOutputCodePath = `${outputCodePathWithoutExtension}.js.map`;
        } else if (/\.js$/.test(normalizedOutputCodePath)) {
            normalizedOutputCodePath += '.map';
        }

        return normalizedOutputCodePath;
    }

    /**
     * @param {string} outputPath
     * @param {string} data
     */
    public writeFile (outputPath: string, data: string): void {
        mkdirp.sync(path.dirname(outputPath));

        fs.writeFileSync(outputPath, data, {
            encoding: JavaScriptObfuscatorCLI.encoding
        });
    }
}
