import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import { IPackageConfig } from '../interfaces/IPackageConfig';

export class CLIUtils {
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
     * @param outputPath
     * @param inputPath
     * @returns {string}
     */
    public static getOutputCodePath (outputPath: string, inputPath: string): string {
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
     * @param outputCodePath
     * @param sourceMapFileName
     * @returns {string}
     */
    public static getOutputSourceMapPath (outputCodePath: string, sourceMapFileName: string = ''): string {
        if (sourceMapFileName) {
            outputCodePath = `${outputCodePath.substr(
                0, outputCodePath.lastIndexOf('/')
            )}/${sourceMapFileName}`;
        }

        if (!/\.js\.map$/.test(outputCodePath)) {
            outputCodePath = `${outputCodePath.split('.')[0]}.js.map`;
        } else if (/\.js$/.test(outputCodePath)) {
            outputCodePath += '.map';
        }

        return outputCodePath;
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
     * @param inputPath
     */
    public static validateInputPath (inputPath: string): void {
        if (!CLIUtils.isFilePath(inputPath)) {
            throw new ReferenceError(`Given input path must be a valid file path`);
        }

        if (!CLIUtils.availableInputExtensions.includes(path.extname(inputPath))) {
            throw new ReferenceError(`Input file must have .js extension`);
        }
    }

    /**
     * @param outputPath
     * @param data
     */
    public static writeFile (outputPath: string, data: any): void {
        mkdirp.sync(path.dirname(outputPath));

        fs.writeFileSync(outputPath, data, {
            encoding: CLIUtils.encoding
        });
    }
}
