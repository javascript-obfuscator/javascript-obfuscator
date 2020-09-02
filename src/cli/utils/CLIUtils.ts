import * as path from 'path';

import { TDictionary } from '../../types/TDictionary';

import { StringSeparator } from '../../enums/StringSeparator';

export class CLIUtils {
    /**
     * @type {string[]}
     */
    public static readonly allowedConfigFileExtensions: string[] = [
        '.js',
        '.json'
    ];

    /**
     * @param {string} configPath
     * @returns {TDictionary}
     */
    public static getUserConfig (configPath: string): TDictionary {
        let config: TDictionary;

        const configFileExtension: string = path.extname(configPath);
        const isValidExtension: boolean = CLIUtils.allowedConfigFileExtensions.includes(configFileExtension);

        if (!isValidExtension) {
            throw new ReferenceError('Given config path must be a valid `.js` or `.json` file path');
        }

        try {
            config = require(configPath);
        } catch {
            try {
                config = __non_webpack_require__(configPath);
            } catch {
                throw new ReferenceError(`Cannot open config file with path: ${configPath}`);
            }
        }

        return config;
    }

    /**
     * @param {TDictionary} optionEnum
     * @returns {string}
     */
    public static stringifyOptionAvailableValues (optionEnum: TDictionary): string {
        return Object.values(optionEnum).join(`${StringSeparator.Comma} `);
    }
}
