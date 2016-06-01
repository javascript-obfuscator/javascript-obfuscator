import { IOptions } from "./interfaces/IOptions";

export class OptionsNormalizer {
    /**
     * @type {IOptions}
     */
    public static DISABLED_UNICODE_ARRAY_OPTIONS: IOptions = {
        encodeUnicodeLiterals: false,
        rotateUnicodeArray: false,
        unicodeArray: false,
        wrapUnicodeArrayCalls: false
    };

    /**
     * @param options
     * @returns {IOptions}
     */
    public static normalize (options: IOptions): IOptions {
        let normalizedOptions: IOptions = Object.assign({}, options);
        
        normalizedOptions = OptionsNormalizer.unicodeArrayRule(normalizedOptions);
        
        return normalizedOptions;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static unicodeArrayRule (options: IOptions): IOptions {
        if (!options['unicodeArray']) {
            Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
        }
        
        return options;
    }
}