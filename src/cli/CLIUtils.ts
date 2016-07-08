import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import { IPackageConfig } from "../interfaces/IPackageConfig";

import { Utils } from "../Utils";

export class CLIUtils {
    /**
     * @type {BufferEncoding}
     */
    private static encoding: BufferEncoding = 'utf8';

    /**
     * @param argv
     * @param availableInputExtensions
     * @returns {string}
     */
    public static getInputPath (argv: string[], availableInputExtensions: string[] = ['.js']): string {
        let inputPath: string = argv[0];

        if (!CLIUtils.isFilePath(inputPath)) {
            throw new ReferenceError(`First argument must be a valid file path`);
        }

        if (!Utils.arrayContains(availableInputExtensions, path.extname(inputPath))) {
            throw new ReferenceError(`Input file must have .js extension`);
        }

        return inputPath;
    }

    /**
     * @param commands
     * @param inputPath
     * @returns {string}
     */
    public static getOutputCodePath (commands: commander.ICommand, inputPath: string): string {
        let outputPath: string = (<any>commands).output;

        if (outputPath) {
            return outputPath;
        }

        return inputPath
            .split('.')
            .map<string>((value: string, index: number) => {
                return index === 0 ? `${value}-obfuscated` : value;
            })
            .join('.');
    }

    /**
     * @returns {string}
     */
    public static getOutputSourceMapPath (outputCodePath: string): string {
        return outputCodePath
            .split('.')
            .map<string>((value: string, index: number, array: string[]) => {
                return index === array.length - 1 ? `${value}.map` : value;
            })
            .join('.');
    }

    /**
     * @returns {IPackageConfig}
     */
    public static getPackageConfig (): IPackageConfig {
        return <IPackageConfig>JSON.parse(
            fs.readFileSync(
                path.join(
                    path.dirname(
                        fs.realpathSync(process.argv[1])
                    ),
                    '../package.json'
                ),
                CLIUtils.encoding
            )
        );
    }

    /**
     * @param filePath
     */
    public static isFilePath (filePath: string): boolean {
        try {
            return fs.statSync(filePath).isFile();
        } catch (e) {
            return false;
        }
    }

    /**
     * @param inputPath
     * @returns {string}
     */
    public static readFile (inputPath: string): string {
        return fs.readFileSync(inputPath, CLIUtils.encoding);
    }

    /**
     * @param outputPath
     * @param data
     */
    public static writeFile (outputPath: string, data: any): void {
        if (!data) {
            return;
        }

        mkdirp.sync(path.dirname(outputPath));

        fs.writeFileSync(outputPath, data, {
            encoding: CLIUtils.encoding
        });
    }
}
