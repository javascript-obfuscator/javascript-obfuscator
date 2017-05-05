import { TOptionsNormalizerRule } from '../types/options/TOptionsNormalizerRule';

import { IOptions } from '../interfaces/options/IOptions';

import { ControlFlowFlatteningThresholdRule } from './normalizer-rules/ControlFlowFlatteningThresholdRule';
import { DeadCodeInjectionRule } from './normalizer-rules/DeadCodeInjectionRule';
import { DeadCodeInjectionThresholdRule } from './normalizer-rules/DeadCodeInjectionThresholdRule';
import { DomainLockRule } from './normalizer-rules/DomainLockRule';
import { SelfDefendingRule } from './normalizer-rules/SelfDefendingRule';
import { SourceMapBaseUrlRule } from './normalizer-rules/SourceMapBaseUrlRule';
import { SourceMapFileNameRule } from './normalizer-rules/SourceMapFileNameRule';
import { StringArrayRule } from './normalizer-rules/StringArrayRule';
import { StringArrayEncodingRule } from './normalizer-rules/StringArrayEncodingRule';
import { StringArrayThresholdRule } from './normalizer-rules/StringArrayThresholdRule';

export class OptionsNormalizer {
    /**
     * @type {TOptionsNormalizerRule[]}
     */
    private static readonly normalizerRules: TOptionsNormalizerRule[] = [
        ControlFlowFlatteningThresholdRule,
        DeadCodeInjectionRule,
        DeadCodeInjectionThresholdRule,
        DomainLockRule,
        SelfDefendingRule,
        SourceMapBaseUrlRule,
        SourceMapFileNameRule,
        StringArrayRule,
        StringArrayEncodingRule,
        StringArrayThresholdRule,
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
}
