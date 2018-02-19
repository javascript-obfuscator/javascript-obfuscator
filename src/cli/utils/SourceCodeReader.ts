import * as fs from 'fs';
import * as path from 'path';

import chalk, { Chalk } from 'chalk';

import { TSourceCodeData } from '../../types/cli/TSourceCodeData';

import { IFileData } from '../../interfaces/cli/IFileData';

import { JavaScriptObfuscatorCLI } from '../JavaScriptObfuscatorCLI';

export class SourceCodeReader {
    /**
     * @type {Chalk}
     */
    private static readonly colorInfo: Chalk = chalk.cyan;

    /**
     * @type {string}
     */
    private static readonly loggingPrefix: string = '[javascript-obfuscator-cli]';

    /**
     * @param {string} inputPath
     * @returns {TSourceCodeData}
     */
    public static readSourceCode (inputPath: string): TSourceCodeData {
        if (SourceCodeReader.isFilePath(inputPath)) {
            return SourceCodeReader.readFile(inputPath);
        }

        if (SourceCodeReader.isDirectoryPath(inputPath)) {
            return SourceCodeReader.readDirectoryRecursive(inputPath);
        }

        throw new ReferenceError(`Given input path must be a valid source code file or directory path`);
    }

    /**
     * @param {string} filePath
     * @returns {boolean}
     */
    private static isDirectoryPath (filePath: string): boolean {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (e) {
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
        } catch (e) {
            return false;
        }
    }

    /**
     * @param {string} directoryPath
     * @param {IFileData[]} fileData
     * @returns {IFileData[]}
     */
    private static readDirectoryRecursive (directoryPath: string, fileData: IFileData[] = []): IFileData[] {
        fs.readdirSync(directoryPath, JavaScriptObfuscatorCLI.encoding)
            .forEach((fileName: string) => {
                const filePath: string = `${directoryPath}/${fileName}`;

                if (SourceCodeReader.isDirectoryPath(filePath)) {
                    fileData.push(
                        ...SourceCodeReader.readDirectoryRecursive(filePath)
                    );
                } else if (SourceCodeReader.isFilePath(filePath) && SourceCodeReader.isValidFile(fileName)) {
                    const content: string = SourceCodeReader.readFile(filePath);

                    fileData.push({ filePath, content });
                }
            });

        return fileData;
    }

    /**
     * @param {string} filePath
     * @returns {string}
     */
    private static readFile (filePath: string): string {
        if (!SourceCodeReader.isValidFile(filePath)) {
            throw new ReferenceError(`Input file must have .js extension`);
        }

        SourceCodeReader.logFilePath(`Obfuscating file: ${filePath}...`);

        return fs.readFileSync(filePath, JavaScriptObfuscatorCLI.encoding);
    }

    /**
     * @param {string} filePath
     * @returns {boolean}
     */
    private static isValidFile (filePath: string): boolean {
        return JavaScriptObfuscatorCLI.availableInputExtensions.includes(path.extname(filePath))
            && !filePath.includes(JavaScriptObfuscatorCLI.obfuscatedFilePrefix);
    }

    /**
     * @param {string} filePath
     */
    private static logFilePath (filePath: string): void {
        const normalizedFilePath: string = path.normalize(filePath);

        console.log(SourceCodeReader.colorInfo(`\n${SourceCodeReader.loggingPrefix} ${normalizedFilePath}`));
    }
}
