import { IOptionsPreset } from "./interfaces/IOptionsPreset";

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
    public static SELF_DEFENDING_OPTIONS: IOptionsPreset = {
        compact: true,
        selfDefending: true
    };

    /**
     * @param options
     * @returns {IOptionsPreset}
     */
    public static normalizeOptionsPreset (options: IOptionsPreset): IOptionsPreset {
        let normalizedOptions: IOptionsPreset = Object.assign({}, options);

        normalizedOptions = OptionsNormalizer.unicodeArrayRule(normalizedOptions);
        normalizedOptions = OptionsNormalizer.unicodeArrayThresholdRule(normalizedOptions);
        normalizedOptions = OptionsNormalizer.selfDefendingRule(normalizedOptions);

        return normalizedOptions;
    }

    /**
     * @param options
     * @returns {IOptionsPreset}
     */
    private static selfDefendingRule (options: IOptionsPreset): IOptionsPreset {
        if (options['selfDefending']) {
            Object.assign(options, OptionsNormalizer.SELF_DEFENDING_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptionsPreset}
     */
    private static unicodeArrayRule (options: IOptionsPreset): IOptionsPreset {
        if (!options['unicodeArray']) {
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

        options['unicodeArrayThreshold'] = Math.min(
            Math.max(
                options['unicodeArrayThreshold'],
                minValue
            ),
            maxValue
        );

        return options;
    }
}
