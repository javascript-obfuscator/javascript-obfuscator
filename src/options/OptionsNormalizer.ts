import { injectable } from 'inversify';

import { TOptionsNormalizerRule } from '../types/options/TOptionsNormalizerRule';

import { IOptions } from '../interfaces/options/IOptions';
import { IOptionsNormalizer } from '../interfaces/options/IOptionsNormalizer';

import { ControlFlowFlatteningThresholdRule } from './normalizer-rules/ControlFlowFlatteningThresholdRule';
import { DeadCodeInjectionRule } from './normalizer-rules/DeadCodeInjectionRule';
import { DeadCodeInjectionThresholdRule } from './normalizer-rules/DeadCodeInjectionThresholdRule';
import { DomainLockRule } from './normalizer-rules/DomainLockRule';
import { InputFileNameRule } from './normalizer-rules/InputFileNameRule';
import { SelfDefendingRule } from './normalizer-rules/SelfDefendingRule';
import { SourceMapBaseUrlRule } from './normalizer-rules/SourceMapBaseUrlRule';
import { SourceMapFileNameRule } from './normalizer-rules/SourceMapFileNameRule';
import { StringArrayRule } from './normalizer-rules/StringArrayRule';
import { StringArrayEncodingRule } from './normalizer-rules/StringArrayEncodingRule';
import { StringArrayThresholdRule } from './normalizer-rules/StringArrayThresholdRule';

@injectable()
export class OptionsNormalizer implements IOptionsNormalizer {
    /**
     * @type {TOptionsNormalizerRule[]}
     */
    private static readonly normalizerRules: TOptionsNormalizerRule[] = [
        ControlFlowFlatteningThresholdRule,
        DeadCodeInjectionRule,
        DeadCodeInjectionThresholdRule,
        DomainLockRule,
        InputFileNameRule,
        SelfDefendingRule,
        SourceMapBaseUrlRule,
        SourceMapFileNameRule,
        StringArrayRule,
        StringArrayEncodingRule,
        StringArrayThresholdRule,
    ];

    /**
     * @param {IOptions} options
     * @returns {IOptions}
     */
    public normalize (options: IOptions): IOptions {
        let normalizedOptions: IOptions = {
            ...options
        };

        for (const normalizerRule of OptionsNormalizer.normalizerRules) {
            normalizedOptions = normalizerRule(normalizedOptions);
        }

        return normalizedOptions;
    }
}
