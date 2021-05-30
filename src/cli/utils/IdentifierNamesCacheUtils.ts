import * as fs from 'fs';
import * as path from 'path';

import { TIdentifierNamesCache } from '../../types/storages/TIdentifierNamesCache';

import { IFileData } from '../../interfaces/cli/IFileData';

import { JavaScriptObfuscatorCLI } from '../JavaScriptObfuscatorCLI';

/**
 * Utils to work with identifier names cache file
 */
export class IdentifierNamesCacheUtils {
    /**
     * @type {string}
     */
    private static readonly identifierNamesCacheExtension: string = '.json';

    /**
     * @type {string}
     */
    private readonly identifierNamesCachePath: string | undefined;

    /**
     * @param {string} identifierNamesCachePath
     */
    public constructor (identifierNamesCachePath: string | undefined) {
        this.identifierNamesCachePath = identifierNamesCachePath;
    }

    /**
     * @param {string} filePath
     * @returns {boolean}
     */
    private static isValidFilePath (filePath: string): boolean {
        try {
            return fs.statSync(filePath).isFile()
                && path.extname(filePath) === IdentifierNamesCacheUtils.identifierNamesCacheExtension;
        } catch {
            return false;
        }
    }

    /**
     * @param {string} filePath
     * @returns {IFileData}
     */
    private static readFile (filePath: string): IFileData {
        return {
            filePath: path.normalize(filePath),
            content: fs.readFileSync(filePath, JavaScriptObfuscatorCLI.encoding)
        };
    }

    /**
     * @returns {TIdentifierNamesCache | null}
     */
    public read (): TIdentifierNamesCache | null {
        if (!this.identifierNamesCachePath) {
            return null;
        }

        if (!IdentifierNamesCacheUtils.isValidFilePath(this.identifierNamesCachePath)) {
            throw new ReferenceError(`Given identifier names cache path must be a valid ${
                IdentifierNamesCacheUtils.identifierNamesCacheExtension
            } file path`);
        }

        const fileData: IFileData = IdentifierNamesCacheUtils.readFile(this.identifierNamesCachePath);

        if (!fileData.content) {
            // Initial state of identifier names cache file
            return {};
        }

        try {
            // Already written identifier names cache file
            return JSON.parse(fileData.content);
        } catch {
            throw new ReferenceError('Identifier names cache file must contains a json dictionary with identifier names');
        }
    }

    /**
     * @param {TIdentifierNamesCache} identifierNamesCache
     */
    public write (identifierNamesCache: TIdentifierNamesCache): void {
        if (!this.identifierNamesCachePath) {
            return;
        }

        const identifierNamesCacheJson: string = JSON.stringify(identifierNamesCache);

        fs.writeFileSync(this.identifierNamesCachePath, identifierNamesCacheJson, {
            encoding: JavaScriptObfuscatorCLI.encoding
        });
    }
}
