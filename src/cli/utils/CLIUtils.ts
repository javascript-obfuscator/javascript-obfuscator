import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import { TObject } from '../../types/TObject';

import { JavaScriptObfuscatorCLI } from '../JavaScriptObfuscatorCLI';

export class CLIUtils {
    /**
     * @param {string} inputPath
     * @returns {string}
     */
    public static getOutputCodePath (inputPath: string): string {
        return path
            .normalize(inputPath)
            .split('.')
            .map((value: string, index: number) => {
                return index === 0 ? `${value}${JavaScriptObfuscatorCLI.obfuscatedFilePrefix}` : value;
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
     * @param {string} configPath
     * @returns {TObject}
     */
    public static getUserConfig (configPath: string): TObject {
        let config: Object;

        try {
            config = require(configPath);
        } catch {
            try {
                config = __non_webpack_require__(configPath);
            } catch {
                throw new ReferenceError('Given config path must be a valid `.js` or `.json` file path');
            }
        }

        return config;
    }

    /**
     * @param {string} outputPath
     * @param {string} data
     */
    public static writeFile (outputPath: string, data: string): void {
        mkdirp.sync(path.dirname(outputPath));

        fs.writeFileSync(outputPath, data, {
            encoding: JavaScriptObfuscatorCLI.encoding
        });
    }
}
