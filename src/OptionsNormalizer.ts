import { IOptionsPreset } from "./interfaces/IOptionsPreset";

import { TOptionsNormalizerRule } from "./types/TOptionsNormalizerRule";

export class OptionsNormalizer {
    /**
     * @type {IOptionsPreset}
     */
    private static DISABLED_UNICODE_ARRAY_OPTIONS: IOptionsPreset = {
        encodeUnicodeLiterals: false,
        rotateUnicodeArray: false,
        unicodeArray: false,
        unicodeArrayThreshold: 0,
        wrapUnicodeArrayCalls: false
    };

    /**
     * @type {IOptionsPreset}
     */
    private static SELF_DEFENDING_OPTIONS: IOptionsPreset = {
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
     * @returns {IOptionsPreset}
     */
    public static normalizeOptionsPreset (options: IOptionsPreset): IOptionsPreset {
        let normalizedOptions: IOptionsPreset = Object.assign({}, options);

        for (let normalizerRule of OptionsNormalizer.normalizerRules) {
            normalizedOptions = normalizerRule(normalizedOptions);
        }

        return normalizedOptions;
    }

    /**
     * @param options
     * @returns {IOptionsPreset}
     */
    private static selfDefendingRule (options: IOptionsPreset): IOptionsPreset {
        if (options.selfDefending) {
            Object.assign(options, OptionsNormalizer.SELF_DEFENDING_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptionsPreset}
     */
    private static unicodeArrayRule (options: IOptionsPreset): IOptionsPreset {
        if (!options.unicodeArray) {
            Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptionsPreset}
     */
    private static unicodeArrayThresholdRule (options: IOptionsPreset): IOptionsPreset {
        const minValue: number = 0,
            maxValue: number = 1;

        options.unicodeArrayThreshold = Math.min(
            Math.max(
                options.unicodeArrayThreshold,
                minValue
            ),
            maxValue
        );

        return options;
    }
}
