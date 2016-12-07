import { TInputOptions } from '../types/options/TInputOptions';

import { IOptions } from '../interfaces/options/IOptions';

import { TOptionsNormalizerRule } from '../types/options/TOptionsNormalizerRule';

import { Utils } from '../utils/Utils';

export class OptionsNormalizer {
    /**
     * @type {TInputOptions}
     */
    private static readonly DISABLED_UNICODE_ARRAY_OPTIONS: TInputOptions = {
        rotateStringArray: false,
        stringArray: false,
        stringArrayEncoding: false,
        stringArrayThreshold: 0
    };

    /**
     * @type {TInputOptions}
     */
    private static readonly SELF_DEFENDING_OPTIONS: TInputOptions = {
        compact: true,
        selfDefending: true
    };

    /**
     * @type {TInputOptions}
     */
    private static readonly UNICODE_ARRAY_ENCODING_OPTIONS: TInputOptions = {
        stringArrayEncoding: 'base64'
    };

    /**
     * @type {TOptionsNormalizerRule[]}
     */
    private static readonly normalizerRules: TOptionsNormalizerRule[] = [
        OptionsNormalizer.domainLockRule,
        OptionsNormalizer.selfDefendingRule,
        OptionsNormalizer.sourceMapBaseUrlRule,
        OptionsNormalizer.sourceMapFileNameRule,
        OptionsNormalizer.stringArrayRule,
        OptionsNormalizer.stringArrayEncodingRule,
        OptionsNormalizer.stringArrayThresholdRule,
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
            const normalizedDomains: string[] = [];

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
    private static sourceMapBaseUrlRule (options: IOptions): IOptions {
        const sourceMapBaseUrl: string = options.sourceMapBaseUrl;

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
    private static sourceMapFileNameRule (options: IOptions): IOptions {
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
    private static stringArrayRule (options: IOptions): IOptions {
        if (!options.stringArray) {
            Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static stringArrayEncodingRule (options: IOptions): IOptions {
        if (options.stringArrayEncoding === true) {
            Object.assign(options, OptionsNormalizer.UNICODE_ARRAY_ENCODING_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static stringArrayThresholdRule (options: IOptions): IOptions {
        if (options.stringArrayThreshold === 0) {
            Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
        }

        return options;
    }
}
