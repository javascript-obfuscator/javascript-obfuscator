import { TObject } from '../../types/TObject';

export class CLIUtils {
    /**
     * @param {string} configPath
     * @returns {TObject}
     */
    public static getUserConfig (configPath: string): TObject {
        let config: TObject;

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
