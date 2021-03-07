import { injectable } from 'inversify';

import { TOptionsNormalizerRule } from '../types/options/TOptionsNormalizerRule';

import { IOptions } from '../interfaces/options/IOptions';
import { IOptionsNormalizer } from '../interfaces/options/IOptionsNormalizer';

import { ControlFlowFlatteningThresholdRule } from './normalizer-rules/ControlFlowFlatteningThresholdRule';
import { DeadCodeInjectionRule } from './normalizer-rules/DeadCodeInjectionRule';
import { DeadCodeInjectionThresholdRule } from './normalizer-rules/DeadCodeInjectionThresholdRule';
import { DomainLockRule } from './normalizer-rules/DomainLockRule';
import { InputFileNameRule } from './normalizer-rules/InputFileNameRule';
import { SeedRule } from './normalizer-rules/SeedRule';
import { SelfDefendingRule } from './normalizer-rules/SelfDefendingRule';
import { SourceMapBaseUrlRule } from './normalizer-rules/SourceMapBaseUrlRule';
import { SourceMapFileNameRule } from './normalizer-rules/SourceMapFileNameRule';
import { SplitStringsChunkLengthRule } from './normalizer-rules/SplitStringsChunkLengthRule';
import { StringArrayRule } from './normalizer-rules/StringArrayRule';
import { StringArrayEncodingRule } from './normalizer-rules/StringArrayEncodingRule';
import { StringArrayWrappersChainedCallsRule } from './normalizer-rules/StringArrayWappersChainedCalls';

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
        SeedRule,
        SelfDefendingRule,
        SourceMapBaseUrlRule,
        SourceMapFileNameRule,
        SplitStringsChunkLengthRule,
        StringArrayRule,
        StringArrayEncodingRule,
        StringArrayWrappersChainedCallsRule,
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
