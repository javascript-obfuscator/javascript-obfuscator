import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import { TInputCLIOptions } from '../../types/options/TInputCLIOptions';

import { StringSeparator } from '../../enums/StringSeparator';

import { JavaScriptObfuscatorCLI } from '../JavaScriptObfuscatorCLI';

export class ObfuscatedCodeWriter {
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
        this.inputPath = inputPath;
        this.options = options;
    }

    /**
     * @param {string} filePath
     * @returns {string}
     */
    public getOutputCodePath (filePath: string): string {
        const normalizedRawOutputPath: string | null = this.options.output
            ? path.normalize(this.options.output)
            : null;

        if (!normalizedRawOutputPath) {
            return path
                .normalize(filePath)
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
                return path.join(normalizedRawOutputPath, filePath);
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
     * @param {string} outputCodePath
     * @param {string} sourceMapFileName
     * @returns {string}
     */
    public getOutputSourceMapPath (outputCodePath: string, sourceMapFileName: string = ''): string {
        if (sourceMapFileName) {
            outputCodePath = `${outputCodePath.substring(
                0, outputCodePath.lastIndexOf('/')
            )}/${sourceMapFileName}`;
        }

        if (!/\.js\.map$/.test(outputCodePath)) {
            outputCodePath = `${outputCodePath.split(StringSeparator.Dot)[0]}.js.map`;
        } else if (/\.js$/.test(outputCodePath)) {
            outputCodePath += '.map';
        }

        return outputCodePath;
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
