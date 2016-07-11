import { IObfuscatorOptions } from "./interfaces/IObfuscatorOptions";

import { TOptionsNormalizerRule } from "./types/TOptionsNormalizerRule";
import {DEFAULT_PRESET} from "./preset-options/DefaultPreset";

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
        OptionsNormalizer.selfDefendingRule
    ];

    /**
     * @param options
     * @returns {IObfuscatorOptions}
     */
    public static normalizeOptionsPreset (options: IObfuscatorOptions): IObfuscatorOptions {
        let normalizedOptions: IObfuscatorOptions = Object.assign({}, options);

        for (let normalizerRule of OptionsNormalizer.normalizerRules) {
            normalizedOptions = normalizerRule(normalizedOptions);
        }

        return normalizedOptions;
    }

    /**
     * @param options
     * @returns {IObfuscatorOptions}
     */
    private static selfDefendingRule (options: IObfuscatorOptions): IObfuscatorOptions {
        if (options.selfDefending) {
            Object.assign(options, OptionsNormalizer.SELF_DEFENDING_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IObfuscatorOptions}
     */
    private static unicodeArrayRule (options: IObfuscatorOptions): IObfuscatorOptions {
        if (!options.unicodeArray) {
            Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IObfuscatorOptions}
     */
    private static unicodeArrayThresholdRule (options: IObfuscatorOptions): IObfuscatorOptions {
        const minValue: number = 0,
            maxValue: number = 1;

        if (typeof options.unicodeArrayThreshold !== 'number') {
            options.unicodeArrayThreshold = DEFAULT_PRESET.unicodeArrayThreshold;
        } else {
            options.unicodeArrayThreshold = Math.min(
                Math.max(
                    options.unicodeArrayThreshold,
                    minValue
                ),
                maxValue
            );
        }

        return options;
    }
}
