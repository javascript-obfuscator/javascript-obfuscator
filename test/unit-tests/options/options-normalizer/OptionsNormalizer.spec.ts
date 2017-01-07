import { assert } from 'chai';

import { TInputOptions } from '../../../../src/types/options/TInputOptions';

import { IOptions } from '../../../../src/interfaces/options/IOptions';

import { DEFAULT_PRESET } from '../../../../src/options/presets/Default';

import { Options } from '../../../../src/options/Options';
import { OptionsNormalizer } from '../../../../src/options/OptionsNormalizer';

/**
 * @param optionsPreset
 * @returns {IOptions}
 */
function getNormalizedOptions (optionsPreset: TInputOptions): TInputOptions {
    const options: IOptions = new Options(optionsPreset);

    return OptionsNormalizer.normalizeOptions(options);
}

describe('OptionsNormalizer', () => {
    describe('normalizeOptions (options: IObfuscatorOptions): IObfuscatorOptions', () => {
        let optionsPreset: TInputOptions,
            expectedOptionsPreset: TInputOptions;

        it('should normalize options preset: controlFlowFlatteningThresholdRule', () => {
            optionsPreset = {
                ...DEFAULT_PRESET,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0
            };

            expectedOptionsPreset = {
                ...DEFAULT_PRESET,
                controlFlowFlattening: false,
                controlFlowFlatteningThreshold: 0
            };

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: domainLockRule', () => {
            optionsPreset = {
                ...DEFAULT_PRESET,
                domainLock: ['//localhost:9000', 'https://google.ru/abc?cde=fgh']
            };

            expectedOptionsPreset = {
                ...DEFAULT_PRESET,
                domainLock: ['localhost', 'google.ru']
            };

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: selfDefendingRule', () => {
            optionsPreset = {
                ...DEFAULT_PRESET,
                selfDefending: true,
                compact: false
            };

            expectedOptionsPreset = {
                ...DEFAULT_PRESET,
                selfDefending: true,
                compact: true
            };

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: sourceMapBaseUrlRule #1', () => {
            optionsPreset = {
                ...DEFAULT_PRESET,
                sourceMapBaseUrl: 'http://localhost:9000',
            };

            expectedOptionsPreset = {
                ...DEFAULT_PRESET,
                sourceMapBaseUrl: ''
            };

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: sourceMapBaseUrlRule #2', () => {
            optionsPreset = {
                ...DEFAULT_PRESET,
                sourceMapBaseUrl: 'http://localhost:9000',
                sourceMapFileName: '/outputSourceMapName.map'
            };

            expectedOptionsPreset = {
                ...DEFAULT_PRESET,
                sourceMapBaseUrl: 'http://localhost:9000/',
                sourceMapFileName: 'outputSourceMapName.js.map'
            };

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: sourceMapFileNameRule', () => {
            optionsPreset = {
                ...DEFAULT_PRESET,
                sourceMapBaseUrl: 'http://localhost:9000',
                sourceMapFileName: '//outputSourceMapName'
            };

            expectedOptionsPreset = {
                ...DEFAULT_PRESET,
                sourceMapBaseUrl: 'http://localhost:9000/',
                sourceMapFileName: 'outputSourceMapName.js.map'
            };

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: stringArrayRule', () => {
            optionsPreset = {
                ...DEFAULT_PRESET,
                stringArray: false,
                stringArrayEncoding: 'rc4',
                stringArrayThreshold: 0.5,
                rotateStringArray: true
            };

            expectedOptionsPreset = {
                ...DEFAULT_PRESET,
                stringArray: false,
                stringArrayEncoding: false,
                stringArrayThreshold: 0,
                rotateStringArray: false
            };

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: stringArrayEncodingRule', () => {
            optionsPreset = {
                ...DEFAULT_PRESET,
                stringArrayEncoding: true
            };

            expectedOptionsPreset = {
                ...DEFAULT_PRESET,
                stringArrayEncoding: 'base64'
            };

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: stringArrayThresholdRule', () => {
            optionsPreset = {
                ...DEFAULT_PRESET,
                rotateStringArray: true,
                stringArray: true,
                stringArrayThreshold: 0
            };

            expectedOptionsPreset = {
                ...DEFAULT_PRESET,
                rotateStringArray: false,
                stringArray: false,
                stringArrayThreshold: 0
            };

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });
    });
});
