import { IOptions } from "./interfaces/IOptions";

export class OptionsNormalizer {
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
        const disabledUnicodeArrayOptions: {[index: string]: boolean} = {
            encodeUnicodeLiterals: false,
            rotateUnicodeArray: false,
            unicodeArray: false,
            wrapUnicodeArrayCalls: false
        };
        
        if (!options['unicodeArray']) {
            Object.assign(options, disabledUnicodeArrayOptions);
        }
        
        return options;
    }
}