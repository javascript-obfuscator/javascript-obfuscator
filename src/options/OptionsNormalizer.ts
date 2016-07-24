import { IObfuscatorOptions } from "../interfaces/IObfuscatorOptions";
import { IOptions } from "../interfaces/IOptions";

import { TOptionsNormalizerRule } from "../types/TOptionsNormalizerRule";

export class OptionsNormalizer {
    /**
     * @type {IObfuscatorOptions}
     */
    private static DISABLED_UNICODE_ARRAY_OPTIONS: IObfuscatorOptions = {
        encodeUnicodeLiterals: false,
        rotateUnicodeArray: false,
        unicodeArray: false,
        unicodeArrayThreshold: 0,
        wrapUnicodeArrayCalls: false
    };

    /**
     * @type {IObfuscatorOptions}
     */
    private static ENCODE_UNICODE_LITERALS_OPTIONS: IObfuscatorOptions = {
        encodeUnicodeLiterals: true,
        wrapUnicodeArrayCalls: true
    };

    /**
     * @type {IObfuscatorOptions}
     */
    private static SELF_DEFENDING_OPTIONS: IObfuscatorOptions = {
        compact: true,
        selfDefending: true
    };

    /**
     * @type {TOptionsNormalizerRule[]}
     */
    private static normalizerRules: TOptionsNormalizerRule[] = [
        OptionsNormalizer.unicodeArrayRule,
        OptionsNormalizer.unicodeArrayThresholdRule,
        OptionsNormalizer.encodeUnicodeLiteralsRule,
        OptionsNormalizer.selfDefendingRule
    ];

    /**
     * @param options
     * @returns {IOptions}
     */
    public static normalizeOptions (options: IOptions): IOptions {
        let normalizedOptions: IOptions = Object.assign({}, options);

        for (let normalizerRule of OptionsNormalizer.normalizerRules) {
            normalizedOptions = normalizerRule(normalizedOptions);
        }

        return normalizedOptions;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static encodeUnicodeLiteralsRule (options: IOptions): IOptions {
        if (options.unicodeArray && options.encodeUnicodeLiterals) {
            Object.assign(options, OptionsNormalizer.ENCODE_UNICODE_LITERALS_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static selfDefendingRule (options: IOptions): IOptions {
        if (options.selfDefending) {
            Object.assign(options, OptionsNormalizer.SELF_DEFENDING_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static unicodeArrayRule (options: IOptions): IOptions {
        if (!options.unicodeArray) {
            Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static unicodeArrayThresholdRule (options: IOptions): IOptions {
        if (options.unicodeArrayThreshold === 0) {
            Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
        }

        return options;
    }
}
