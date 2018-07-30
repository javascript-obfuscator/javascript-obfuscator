import 'reflect-metadata';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { assert } from 'chai';

import { TInputOptions } from '../../../src/types/options/TInputOptions';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IOptions } from '../../../src/interfaces/options/IOptions';
import { IOptionsNormalizer } from '../../../src/interfaces/options/IOptionsNormalizer';

import { StringArrayEncoding } from '../../../src/enums/StringArrayEncoding';

import { DEFAULT_PRESET } from '../../../src/options/presets/Default';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

/**
 * @param optionsPreset
 * @returns {IOptions}
 */
function getNormalizedOptions (optionsPreset: TInputOptions): TInputOptions {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

    inversifyContainerFacade.load('', '', optionsPreset);

    const options: IOptions = inversifyContainerFacade
        .get<IOptions>(ServiceIdentifiers.IOptions);
    const optionsNormalizer: IOptionsNormalizer = inversifyContainerFacade
        .get<IOptionsNormalizer>(ServiceIdentifiers.IOptionsNormalizer);

    return optionsNormalizer.normalize(options);
}

describe('OptionsNormalizer', () => {
    describe('normalize', () => {
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

        describe('inputFileNameRule', () => {
            describe('Variant #1: extension isn\'t set', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...DEFAULT_PRESET,
                        inputFileName: 'foo'
                    });

                    expectedOptionsPreset = {
                        ...DEFAULT_PRESET,
                        inputFileName: 'foo.js'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #2: extension is set', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...DEFAULT_PRESET,
                        inputFileName: 'foo.js'
                    });

                    expectedOptionsPreset = {
                        ...DEFAULT_PRESET,
                        inputFileName: 'foo.js'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #3: extension in set with `.map` postfix', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...DEFAULT_PRESET,
                        inputFileName: 'foo.map.js'
                    });

                    expectedOptionsPreset = {
                        ...DEFAULT_PRESET,
                        inputFileName: 'foo.map.js'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #4: no file name', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...DEFAULT_PRESET,
                        inputFileName: ''
                    });

                    expectedOptionsPreset = {
                        ...DEFAULT_PRESET,
                        inputFileName: ''
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
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
            describe('Variant #1: only source map base url', () => {
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

            describe('Variant #2: source map base url with source map file name', () => {
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
                    stringArrayEncoding: StringArrayEncoding.Rc4,
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
                    stringArrayEncoding: StringArrayEncoding.Base64
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
