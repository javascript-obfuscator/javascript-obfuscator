import { assert } from 'chai';

import { TInputOptions } from '../../../src/types/options/TInputOptions';

import { IOptions } from '../../../src/interfaces/options/IOptions';

import { DEFAULT_PRESET } from '../../../src/options/presets/Default';

import { Options } from '../../../src/options/Options';
import { OptionsNormalizer } from '../../../src/options/OptionsNormalizer';

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

        describe('controlFlowFlatteningThresholdRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...DEFAULT_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 0
                });

                expectedOptionsPreset = {
                    ...DEFAULT_PRESET,
                    controlFlowFlattening: false,
                    controlFlowFlatteningThreshold: 0
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('deadCodeInjectionRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...DEFAULT_PRESET,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 0.4,
                    stringArray: false,
                    stringArrayThreshold: 0
                });

                expectedOptionsPreset = {
                    ...DEFAULT_PRESET,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 0.4,
                    stringArray: true,
                    stringArrayThreshold: 0.75
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('deadCodeInjectionRule', () => {
            describe('`stringArrayThreshold` option is empty', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...DEFAULT_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0.4,
                        stringArray: false,
                        stringArrayThreshold: 0
                    });

                    expectedOptionsPreset = {
                        ...DEFAULT_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0.4,
                        stringArray: true,
                        stringArrayThreshold: 0.75
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('`stringArrayThreshold` option is not empty', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...DEFAULT_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0.4,
                        stringArray: false,
                        stringArrayThreshold: 0.5
                    });

                    expectedOptionsPreset = {
                        ...DEFAULT_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0.4,
                        stringArray: true,
                        stringArrayThreshold: 0.5
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });
        });

        describe('deadCodeInjectionThresholdRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...DEFAULT_PRESET,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 0
                });

                expectedOptionsPreset = {
                    ...DEFAULT_PRESET,
                    deadCodeInjection: false,
                    deadCodeInjectionThreshold: 0
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('domainLockRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...DEFAULT_PRESET,
                    domainLock: [
                        '//localhost:9000',
                        'https://google.ru/abc?cde=fgh'
                    ]
                });

                expectedOptionsPreset = {
                    ...DEFAULT_PRESET,
                    domainLock: [
                        'localhost',
                        'google.ru'
                    ]
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('selfDefendingRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...DEFAULT_PRESET,
                    selfDefending: true,
                    compact: false
                });

                expectedOptionsPreset = {
                    ...DEFAULT_PRESET,
                    selfDefending: true,
                    compact: true
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('sourceMapBaseUrlRule', () => {
            describe('variant #1: only source map base url', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...DEFAULT_PRESET,
                        sourceMapBaseUrl: 'http://localhost:9000',
                    });

                    expectedOptionsPreset = {
                        ...DEFAULT_PRESET,
                        sourceMapBaseUrl: ''
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('variant #2: source map base url with source map file name', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...DEFAULT_PRESET,
                        sourceMapBaseUrl: 'http://localhost:9000',
                        sourceMapFileName: '/outputSourceMapName.map'
                    });

                    expectedOptionsPreset = {
                        ...DEFAULT_PRESET,
                        sourceMapBaseUrl: 'http://localhost:9000/',
                        sourceMapFileName: 'outputSourceMapName.js.map'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });
        });

        describe('sourceMapFileNameRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...DEFAULT_PRESET,
                    sourceMapBaseUrl: 'http://localhost:9000',
                    sourceMapFileName: '//outputSourceMapName'
                });

                expectedOptionsPreset = {
                    ...DEFAULT_PRESET,
                    sourceMapBaseUrl: 'http://localhost:9000/',
                    sourceMapFileName: 'outputSourceMapName.js.map'
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('stringArrayRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...DEFAULT_PRESET,
                    stringArray: false,
                    stringArrayEncoding: 'rc4',
                    stringArrayThreshold: 0.5,
                    rotateStringArray: true
                });

                expectedOptionsPreset = {
                    ...DEFAULT_PRESET,
                    stringArray: false,
                    stringArrayEncoding: false,
                    stringArrayThreshold: 0,
                    rotateStringArray: false
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('stringArrayEncodingRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...DEFAULT_PRESET,
                    stringArrayEncoding: true
                });

                expectedOptionsPreset = {
                    ...DEFAULT_PRESET,
                    stringArrayEncoding: 'base64'
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('stringArrayThresholdRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...DEFAULT_PRESET,
                    rotateStringArray: true,
                    stringArray: true,
                    stringArrayThreshold: 0
                });

                expectedOptionsPreset = {
                    ...DEFAULT_PRESET,
                    rotateStringArray: false,
                    stringArray: false,
                    stringArrayThreshold: 0
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });
    });
});
