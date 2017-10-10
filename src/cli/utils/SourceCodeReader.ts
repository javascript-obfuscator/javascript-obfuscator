import * as fs from 'fs';
import * as path from 'path';

import { TSourceCodeData } from '../../types/cli/TSourceCodeData';

import { IFileData } from '../../interfaces/cli/IFileData';

export class SourceCodeReader {
    /**
     * @type {string[]}
     */
    private static readonly availableInputExtensions: string[] = [
        '.js'
    ];

    /**
     * @type {BufferEncoding}
     */
    private static readonly encoding: BufferEncoding = 'utf8';

    /**
     * @param {string} inputPath
     * @returns {TSourceCodeData}
     */
    public static readSourceCode (inputPath: string): TSourceCodeData {
        if (SourceCodeReader.isFilePath(inputPath)) {
            return SourceCodeReader.readFile(inputPath);
        }

        if (SourceCodeReader.isDirectoryPath(inputPath)) {
            return SourceCodeReader.readDirectory(inputPath);
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
     * @returns {IFileData[]}
     */
    private static readDirectory (directoryPath: string): IFileData[] {
        return fs.readdirSync(directoryPath, SourceCodeReader.encoding)
            .filter(SourceCodeReader.isValidFile)
            .map((fileName: string) => {
                const filePath: string = `${directoryPath}/${fileName}`;
                const content: string = fs.readFileSync(filePath, SourceCodeReader.encoding);

                return { filePath, content };
            });
    }

    /**
     * @param {string} filePath
     * @returns {string}
     */
    private static readFile (filePath: string): string {
        if (!SourceCodeReader.isValidFile(filePath)) {
            throw new ReferenceError(`Input file must have .js extension`);
        }

        return fs.readFileSync(filePath, SourceCodeReader.encoding);
    }

    /**
     * @param {string} filePath
     * @returns {boolean}
     */
    private static isValidFile (filePath: string): boolean {
        return SourceCodeReader.availableInputExtensions.includes(path.extname(filePath));
    }
}
