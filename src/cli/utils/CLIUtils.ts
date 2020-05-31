import { TDictionary } from '../../types/TDictionary';

export class CLIUtils {
    /**
     * @param {string} configPath
     * @returns {TDictionary}
     */
    public static getUserConfig (configPath: string): TDictionary {
        let config: TDictionary;

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
}
