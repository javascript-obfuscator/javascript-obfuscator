import * as fs from 'fs';
import * as path from 'path';
import multimatch from 'multimatch';

import { TInputCLIOptions } from '../../types/options/TInputCLIOptions';

import { IFileData } from '../../interfaces/cli/IFileData';

import { LoggingPrefix } from '../../enums/logger/LoggingPrefix';

import { JavaScriptObfuscatorCLI } from '../JavaScriptObfuscatorCLI';
import { Logger } from '../../logger/Logger';

export class SourceCodeReader {
    /**
     * @type {string[]}
     */
    public static readonly availableInputExtensions: string[] = [
        '.js'
    ];

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
     * @param {string[]} excludePatterns
     * @returns {boolean}
     */
    private static isExcludedPath (filePath: string, excludePatterns: string[] = []): boolean {
        if (!excludePatterns.length) {
            return false;
        }

        const fileName: string = path.basename(filePath);
        const isExcludedFilePathByGlobPattern: boolean = !!multimatch([filePath], excludePatterns).length;
        const isExcludedFilePathByInclusion: boolean = excludePatterns.some((excludePattern: string) =>
            filePath.includes(excludePattern) || fileName.includes(excludePattern)
        );

        return isExcludedFilePathByInclusion || isExcludedFilePathByGlobPattern;
    }

    /**
     * @param {string} filePath
     * @returns {boolean}
     */
    private static isDirectoryPath (filePath: string): boolean {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch {
            return false;
        }
    }

    /**
     * @param {string} filePath
     * @returns {boolean}
     */
    private static isFilePath (filePath: string): boolean {
        try {
            return fs.statSync(filePath).isFile();
        } catch {
            return false;
        }
    }

    /**
     * @param {string} directoryPath
     * @param {string[]} excludePatterns
     * @returns {boolean}
     */
    private static isValidDirectory (directoryPath: string, excludePatterns: string[] = []): boolean {
        return !SourceCodeReader.isExcludedPath(directoryPath, excludePatterns);
    }

    /**
     * @param {string} filePath
     * @param {string[]} excludePatterns
     * @returns {boolean}
     */
    private static isValidFile (filePath: string, excludePatterns: string[] = []): boolean {
        return SourceCodeReader.availableInputExtensions.includes(path.extname(filePath))
            && !filePath.includes(JavaScriptObfuscatorCLI.obfuscatedFilePrefix)
            && !SourceCodeReader.isExcludedPath(filePath, excludePatterns);
    }

    /**
     * @param {string} filePath
     */
    private static logFilePath (filePath: string): void {
        const normalizedFilePath: string = path.normalize(filePath);

        Logger.log(
            Logger.colorInfo,
            LoggingPrefix.CLI,
            `Obfuscating file: ${normalizedFilePath}...`
        );
    }

    /**
     * @param {string} filePath
     * @returns {string}
     */
    private static readFile (filePath: string): IFileData {
        SourceCodeReader.logFilePath(filePath);

        return {
            filePath,
            content: fs.readFileSync(filePath, JavaScriptObfuscatorCLI.encoding)
        };
    }

    /**
     * @returns {IFileData[]}
     */
    public readSourceCode (): IFileData[] {
        if (
            SourceCodeReader.isFilePath(this.inputPath)
            && SourceCodeReader.isValidFile(this.inputPath, this.options.exclude)
        ) {
            return [SourceCodeReader.readFile(this.inputPath)];
        }

        if (
            SourceCodeReader.isDirectoryPath(this.inputPath)
            && SourceCodeReader.isValidDirectory(this.inputPath, this.options.exclude)
        ) {
            return this.readDirectoryRecursive(this.inputPath);
        }

        const availableFilePaths: string = SourceCodeReader
            .availableInputExtensions
            .map((extension: string) => `\`${extension}\``)
            .join(', ');

        throw new ReferenceError(`Given input path must be a valid ${availableFilePaths} file or directory path`);
    }

    /**
     * @param {string} directoryPath
     * @param {IFileData[]} filesData
     * @returns {IFileData[]}
     */
    private readDirectoryRecursive (directoryPath: string, filesData: IFileData[] = []): IFileData[] {
        fs.readdirSync(directoryPath, JavaScriptObfuscatorCLI.encoding)
            .forEach((fileName: string) => {
                const filePath: string = `${directoryPath}/${fileName}`;

                if (
                    SourceCodeReader.isDirectoryPath(filePath)
                    && SourceCodeReader.isValidDirectory(filePath, this.options.exclude)
                ) {
                    filesData.push(...this.readDirectoryRecursive(filePath));

                    return;
                }

                if (
                    SourceCodeReader.isFilePath(filePath)
                    && SourceCodeReader.isValidFile(filePath, this.options.exclude)
                ) {
                    const fileData: IFileData = SourceCodeReader.readFile(filePath);

                    filesData.push(fileData);

                    return;
                }
            });

        return filesData;
    }
}
