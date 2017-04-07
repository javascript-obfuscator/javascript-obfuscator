import { TInputOptions } from '../types/options/TInputOptions';

import { IOptions } from '../interfaces/options/IOptions';

import { TOptionsNormalizerRule } from '../types/options/TOptionsNormalizerRule';

import { Utils } from '../utils/Utils';

export class OptionsNormalizer {
    /**
     * @type {TInputOptions}
     */
    private static readonly DISABLED_CONTROL_FLOW_FLATTENING_OPTIONS: TInputOptions = {
        controlFlowFlattening: false,
        controlFlowFlatteningThreshold: 0
    };

    /**
     * @type {TInputOptions}
     */
    private static readonly DISABLED_DEAD_CODE_INJECTION_OPTIONS: TInputOptions = {
        deadCodeInjection: false,
        deadCodeInjectionThreshold: 0
    };

    /**
     * @type {TInputOptions}
     */
    private static readonly DISABLED_STRING_ARRAY_OPTIONS: TInputOptions = {
        rotateStringArray: false,
        stringArray: false,
        stringArrayEncoding: false,
        stringArrayThreshold: 0
    };

    /**
     * @type {TInputOptions}
     */
    private static readonly ENABLED_DEAD_CODE_INJECTION_OPTIONS: TInputOptions = {
        deadCodeInjection: true,
        stringArray: true
    };

    /**
     * @type {TInputOptions}
     */
    private static readonly ENABLED_STRING_ARRAY_THRESHOLD_OPTIONS: TInputOptions = {
        stringArray: true,
        stringArrayThreshold: 0.75
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
    private static readonly STRING_ARRAY_ENCODING_OPTIONS: TInputOptions = {
        stringArrayEncoding: 'base64'
    };

    /**
     * @type {TOptionsNormalizerRule[]}
     */
    private static readonly normalizerRules: TOptionsNormalizerRule[] = [
        OptionsNormalizer.controlFlowFlatteningThresholdRule,
        OptionsNormalizer.deadCodeInjectionRule,
        OptionsNormalizer.deadCodeInjectionThresholdRule,
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
        let normalizedOptions: IOptions = {
            ...options
        };

        for (const normalizerRule of OptionsNormalizer.normalizerRules) {
            normalizedOptions = normalizerRule(normalizedOptions);
        }

        return normalizedOptions;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static controlFlowFlatteningThresholdRule (options: IOptions): IOptions {
        if (options.controlFlowFlatteningThreshold === 0) {
            options = {
                ...options,
                ...OptionsNormalizer.DISABLED_CONTROL_FLOW_FLATTENING_OPTIONS
            };
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static deadCodeInjectionRule (options: IOptions): IOptions {
        if (options.deadCodeInjection) {
            options = {
                ...options,
                ...OptionsNormalizer.ENABLED_DEAD_CODE_INJECTION_OPTIONS,
            };

            if (!options.stringArrayThreshold) {
                options = {
                    ...options,
                    ...OptionsNormalizer.ENABLED_STRING_ARRAY_THRESHOLD_OPTIONS
                };
            }
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static deadCodeInjectionThresholdRule (options: IOptions): IOptions {
        if (options.deadCodeInjectionThreshold === 0) {
            options = {
                ...options,
                ...OptionsNormalizer.DISABLED_DEAD_CODE_INJECTION_OPTIONS
            };
        }

        return options;
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

            options = {
                ...options,
                domainLock: normalizedDomains
            };
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static selfDefendingRule (options: IOptions): IOptions {
        if (options.selfDefending) {
            options = {
                ...options,
                ...OptionsNormalizer.SELF_DEFENDING_OPTIONS
            };
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static sourceMapBaseUrlRule (options: IOptions): IOptions {
        const { sourceMapBaseUrl }: { sourceMapBaseUrl: string } = options;

        if (!options.sourceMapFileName) {
            options = {
                ...options,
                sourceMapBaseUrl: ''
            };

            return options;
        }

        if (sourceMapBaseUrl && !sourceMapBaseUrl.endsWith('/')) {
            options = {
                ...options,
                sourceMapBaseUrl: `${sourceMapBaseUrl}/`
            };
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static sourceMapFileNameRule (options: IOptions): IOptions {
        let { sourceMapFileName }: { sourceMapFileName: string } = options;

        if (sourceMapFileName) {
            sourceMapFileName = sourceMapFileName
                .replace(/^\/+/, '')
                .split('.')[0];

            options = {
                ...options,
                sourceMapFileName: `${sourceMapFileName}.js.map`
            };
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static stringArrayRule (options: IOptions): IOptions {
        if (!options.stringArray) {
            options = {
                ...options,
                ...OptionsNormalizer.DISABLED_STRING_ARRAY_OPTIONS
            };
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static stringArrayEncodingRule (options: IOptions): IOptions {
        if (options.stringArrayEncoding === true) {
            options = {
                ...options,
                ...OptionsNormalizer.STRING_ARRAY_ENCODING_OPTIONS
            };
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptions}
     */
    private static stringArrayThresholdRule (options: IOptions): IOptions {
        if (options.stringArrayThreshold === 0) {
            options = {
                ...options,
                ...OptionsNormalizer.DISABLED_STRING_ARRAY_OPTIONS
            };
        }

        return options;
    }
}
