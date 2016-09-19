import { IObfuscatorOptions } from "../interfaces/IObfuscatorOptions";
import { IOptions } from "../interfaces/IOptions";

import { TOptionsNormalizerRule } from "../types/TOptionsNormalizerRule";

import { Utils } from "../Utils";

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
        OptionsNormalizer.domainLockRule,
        OptionsNormalizer.unicodeArrayRule,
        OptionsNormalizer.unicodeArrayThresholdRule,
        OptionsNormalizer.encodeUnicodeLiteralsRule,
        OptionsNormalizer.sourceMapBaseUrl,
        OptionsNormalizer.sourceMapFileName,
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
    private static domainLockRule (options: IOptions): IOptions {
        if (options.domainLock.length) {
            let normalizedDomains: string[] = [];

            for (let domain of options.domainLock) {
                normalizedDomains.push(Utils.extractDomainFromUrl(domain));
            }

            Object.assign(options, {
                domainLock: normalizedDomains
            });
        }

        return options;
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
    private static sourceMapBaseUrl (options: IOptions): IOptions {
        let sourceMapBaseUrl: string = options.sourceMapBaseUrl;

        if (!options.sourceMapFileName) {
            Object.assign(options, {
                sourceMapBaseUrl: ''
            });

            return options;
        }

        if (sourceMapBaseUrl && !sourceMapBaseUrl.endsWith('/')) {
            Object.assign(options, {
                sourceMapBaseUrl: `${sourceMapBaseUrl}/`
            });
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static sourceMapFileName (options: IOptions): IOptions {
        let sourceMapFileName: string = options.sourceMapFileName;

        if (sourceMapFileName) {
            sourceMapFileName = sourceMapFileName
                .replace(/^\/+/, '')
                .split('.')[0];

            Object.assign(options, {
                sourceMapFileName: `${sourceMapFileName}.js.map`
            });
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
