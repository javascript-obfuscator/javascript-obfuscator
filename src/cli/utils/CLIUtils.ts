import * as path from 'path';

import { TDictionary } from '../../types/TDictionary';

import { StringSeparator } from '../../enums/StringSeparator';

export class CLIUtils {
    /**
     * @type {string[]}
     */
    public static readonly allowedConfigFileExtensions: string[] = ['.js', '.json', '.cjs'];

    /**
     * @param {string} configPath
     * @returns {TDictionary}
     */
    public static getUserConfig(configPath: string): TDictionary {
        const configFileExtension: string = path.extname(configPath);
        const isValidExtension: boolean = CLIUtils.allowedConfigFileExtensions.includes(configFileExtension);

        if (!isValidExtension) {
            throw new ReferenceError('Given config path must be a valid `.js`, `.cjs` or `.json` file path');
        }

        const errors: Error[] = [];

        try {
            return require(configPath);
        } catch (error) {
            errors.push(<Error>error);
        }

        try {
            return __non_webpack_require__(configPath);
        } catch (error) {
            errors.push(<Error>error);
        }

        // surface the underlying reason (invalid JSON, `ERR_REQUIRE_ESM`, missing file, ...)
        // instead of masking it behind a generic message
        throw new ReferenceError(
            `Cannot open config file with path: ${configPath}. Reason: ${CLIUtils.getConfigErrorReason(errors)}`
        );
    }

    /**
     * @param {TDictionary} optionEnum
     * @returns {string}
     */
    public static stringifyOptionAvailableValues(optionEnum: TDictionary): string {
        return Object.values(optionEnum).join(`${StringSeparator.Comma} `);
    }

    /**
     * @param {Error[]} errors
     * @returns {string}
     */
    private static getConfigErrorReason(errors: Error[]): string {
        const [firstError, secondError] = errors;

        // in the webpack bundle the real reason comes from the `__non_webpack_require__` call (the second error);
        // in a plain Node/ts-node context `__non_webpack_require__` is not defined, so the real reason is the first error
        if (secondError && !secondError.message.includes('__non_webpack_require__')) {
            return secondError.message;
        }

        return firstError.message;
    }
}
