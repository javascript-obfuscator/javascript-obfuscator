import { IObfuscatorOptions } from '../interfaces/IObfuscatorOptions';
import { IOptions } from '../interfaces/IOptions';

import { TOptionsNormalizerRule } from '../types/TOptionsNormalizerRule';

import { Utils } from '../Utils';

export class OptionsNormalizer {
    /**
     * @type {IObfuscatorOptions}
     */
    private static DISABLED_UNICODE_ARRAY_OPTIONS: IObfuscatorOptions = {
        rotateStringsArray: false,
        stringsArray: false,
        stringsArrayEncoding: false,
        stringsArrayThreshold: 0
    };

    /**
     * @type {IObfuscatorOptions}
     */
    private static SELF_DEFENDING_OPTIONS: IObfuscatorOptions = {
        compact: true,
        selfDefending: true
    };

    /**
     * @type {IObfuscatorOptions}
     */
    private static UNICODE_ARRAY_ENCODING_OPTIONS: IObfuscatorOptions = {
        stringsArrayEncoding: 'base64'
    };

    /**
     * @type {TOptionsNormalizerRule[]}
     */
    private static normalizerRules: TOptionsNormalizerRule[] = [
        OptionsNormalizer.domainLockRule,
        OptionsNormalizer.selfDefendingRule,
        OptionsNormalizer.sourceMapBaseUrl,
        OptionsNormalizer.sourceMapFileName,
        OptionsNormalizer.stringsArrayRule,
        OptionsNormalizer.stringsArrayEncodingRule,
        OptionsNormalizer.stringsArrayThresholdRule,
    ];

    /**
     * @param options
     * @returns {IOptions}
     */
    public static normalizeOptions (options: IOptions): IOptions {
        let normalizedOptions: IOptions = Object.assign({}, options);

        for (const normalizerRule of OptionsNormalizer.normalizerRules) {
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

            for (const domain of options.domainLock) {
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
    private static stringsArrayRule (options: IOptions): IOptions {
        if (!options.stringsArray) {
            Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static stringsArrayEncodingRule (options: IOptions): IOptions {
        if (options.stringsArrayEncoding === true) {
            Object.assign(options, OptionsNormalizer.UNICODE_ARRAY_ENCODING_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static stringsArrayThresholdRule (options: IOptions): IOptions {
        if (options.stringsArrayThreshold === 0) {
            Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
        }

        return options;
    }
}
