import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import { TObject } from '../../types/TObject';

import { IPackageConfig } from '../../interfaces/IPackageConfig';

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
     * @param {string} outputPath
     * @param {string} inputPath
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
     * @param {string} outputCodePath
     * @param {string} sourceMapFileName
     * @returns {string}
     */
    public static getOutputSourceMapPath (outputCodePath: string, sourceMapFileName: string = ''): string {
        if (sourceMapFileName) {
            outputCodePath = `${outputCodePath.substring(
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
     * @param {string} configPath
     * @returns {TObject}
     */
    public static getUserConfig (configPath: string): TObject {
        let config: Object;

        try {
            config = require(configPath);
        } catch (e) {
            try {
                config = __non_webpack_require__(configPath);
            } catch (e) {
                throw new ReferenceError('Given config path must be a valid file path');
            }
        }

        return config;
    }

    /**
     * @param {string} filePath
     * @returns {boolean}
     */
    public static isFilePath (filePath: string): boolean {
        try {
            return fs.statSync(filePath).isFile();
        } catch (e) {
            return false;
        }
    }

    /**
     * @param {string} inputPath
     * @returns {string}
     */
    public static readFile (inputPath: string): string {
        return fs.readFileSync(inputPath, CLIUtils.encoding);
    }

    /**
     * @param {string} inputPath
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
     * @param {string} outputPath
     * @param {any} data
     */
    public static writeFile (outputPath: string, data: any): void {
        mkdirp.sync(path.dirname(outputPath));

        fs.writeFileSync(outputPath, data, {
            encoding: CLIUtils.encoding
        });
    }
}
