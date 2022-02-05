import 'reflect-metadata';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { assert } from 'chai';

import { TInputOptions } from '../../../src/types/options/TInputOptions';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IOptions } from '../../../src/interfaces/options/IOptions';
import { IOptionsNormalizer } from '../../../src/interfaces/options/IOptionsNormalizer';

import { StringArrayEncoding } from '../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';

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

    return <TInputOptions>optionsNormalizer.normalize(options);
}

function getDefaultOptions(): TInputOptions {
    return {
        ...DEFAULT_PRESET,
        seed: 1 // set `seed` to the fixed value, to prevent a new seed for the each case
    };
}

describe('OptionsNormalizer', () => {
    describe('normalize', () => {
        let optionsPreset: TInputOptions,
            expectedOptionsPreset: TInputOptions;

        describe('controlFlowFlatteningThresholdRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...getDefaultOptions(),
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 0
                });

                expectedOptionsPreset = {
                    ...getDefaultOptions(),
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
                    ...getDefaultOptions(),
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 0.4,
                    stringArray: false,
                    stringArrayThreshold: 0
                });

                expectedOptionsPreset = {
                    ...getDefaultOptions(),
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
                        ...getDefaultOptions(),
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0.4,
                        stringArray: false,
                        stringArrayThreshold: 0
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
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
                        ...getDefaultOptions(),
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0.4,
                        stringArray: false,
                        stringArrayThreshold: 0.5
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
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
                    ...getDefaultOptions(),
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 0
                });

                expectedOptionsPreset = {
                    ...getDefaultOptions(),
                    deadCodeInjection: false,
                    deadCodeInjectionThreshold: 0
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('domainLockRedirectUrlRule', () => {
            describe('Variant #1: `domainLock` option is set', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        domainLock: [
                            'localhost'
                        ],
                        domainLockRedirectUrl: 'https://example.com'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        domainLock: [
                            'localhost'
                        ],
                        domainLockRedirectUrl: 'https://example.com'
                    };
                });

                it('should not normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #2 `domainLock` option is not set', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        domainLock: [],
                        domainLockRedirectUrl: 'https://example.com'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        domainLock: [],
                        domainLockRedirectUrl: 'about:blank'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });
        });

        describe('domainLockRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...getDefaultOptions(),
                    domainLock: [
                        '//localhost:9000',
                        'https://google.ru/abc?cde=fgh'
                    ]
                });

                expectedOptionsPreset = {
                    ...getDefaultOptions(),
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
                        ...getDefaultOptions(),
                        inputFileName: 'foo'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
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
                        ...getDefaultOptions(),
                        inputFileName: 'foo.js'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
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
                        ...getDefaultOptions(),
                        inputFileName: 'foo.map.js'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
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
                        ...getDefaultOptions(),
                        inputFileName: ''
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        inputFileName: ''
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #5: relative path', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        inputFileName: 'baz/bar/foo.js'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        inputFileName: 'baz/bar/foo.js'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });
        });

        describe('identifierNamesCacheRule', () => {
            describe('Variant #1: all fields are exist with values', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        identifierNamesCache: {
                            globalIdentifiers: {
                                foo: '_0x123456'
                            },
                            propertyIdentifiers: {
                                bar: '_0x654321'
                            }
                        }
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        identifierNamesCache: {
                            globalIdentifiers: {
                                foo: '_0x123456'
                            },
                            propertyIdentifiers: {
                                bar: '_0x654321'
                            }
                        }
                    };
                });

                it('should not normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #2: some fields are exist with values', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        identifierNamesCache: {
                            globalIdentifiers: {
                                foo: '_0x123456'
                            },
                            propertyIdentifiers: {}
                        }
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        identifierNamesCache: {
                            globalIdentifiers: {
                                foo: '_0x123456'
                            },
                            propertyIdentifiers: {}
                        }
                    };
                });

                it('should not normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #3: all fields are exist with empty objects', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        identifierNamesCache: {
                            globalIdentifiers: {},
                            propertyIdentifiers: {}
                        }
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        identifierNamesCache: {
                            globalIdentifiers: {},
                            propertyIdentifiers: {}
                        }
                    };
                });

                it('should not normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #4: some fields are missing', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        identifierNamesCache: {
                            globalIdentifiers: {
                                foo: '_0x123456'
                            }
                        }
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        identifierNamesCache: {
                            globalIdentifiers: {
                                foo: '_0x123456'
                            },
                            propertyIdentifiers: {}
                        }
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #5: all fields are missing', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        identifierNamesCache: {}
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        identifierNamesCache: {
                            globalIdentifiers: {},
                            propertyIdentifiers: {}
                        }
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });
        });

        describe('seedRule', () => {
            describe('Variant #1: seed value is string', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        seed: 'abc'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        seed: 'abc'
                    };
                });

                it('should not normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #2: seed value is number', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        seed: 123
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        seed: 123
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Variant #3: seed value is `0``', () => {
                let seedValue: number;

                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        seed: 0
                    });

                    seedValue = Number(optionsPreset.seed);
                });

                it('should normalize seed value', () => {
                    assert.isAtLeast(seedValue, 0);
                    assert.isBelow(seedValue, 999_999_999);
                });
            });
        });

        describe('selfDefendingRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...getDefaultOptions(),
                    selfDefending: true,
                    compact: false
                });

                expectedOptionsPreset = {
                    ...getDefaultOptions(),
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
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000',
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
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
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000',
                        sourceMapFileName: '/outputSourceMapName.map'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
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
            describe('Base filename without extension', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000',
                        sourceMapFileName: 'outputSourceMapName'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000/',
                        sourceMapFileName: 'outputSourceMapName.js.map'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Slashes in file name', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000',
                        sourceMapFileName: '//outputSourceMapName'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000/',
                        sourceMapFileName: 'outputSourceMapName.js.map'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('`js` file extension in file name', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000',
                        sourceMapFileName: 'outputSourceMapName.js'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000/',
                        sourceMapFileName: 'outputSourceMapName.js.map'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('Non `js` file extension in file name', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000',
                        sourceMapFileName: 'outputSourceMapName.exe'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000/',
                        sourceMapFileName: 'outputSourceMapName.js.map'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('File hash in file name', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000',
                        sourceMapFileName: 'outputSourceMapName.7e2c49a622975ebd9b7e'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000/',
                        sourceMapFileName: 'outputSourceMapName.7e2c49a622975ebd9b7e.js.map'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('File hash and `js` file extension in file name #1', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000',
                        sourceMapFileName: 'outputSourceMapName.7e2c49a622975ebd9b7e.js'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000/',
                        sourceMapFileName: 'outputSourceMapName.7e2c49a622975ebd9b7e.js.map'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });

            describe('File hash and non `js` file extension in file name', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000',
                        sourceMapFileName: 'outputSourceMapName.7e2c49a622975ebd9b7e.exe'
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        sourceMapBaseUrl: 'http://localhost:9000/',
                        sourceMapFileName: 'outputSourceMapName.7e2c49a622975ebd9b7e.js.map'
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });
        });

        describe('splitStringsChunkLengthRule', () => {
            describe('`splitStringsChunkLengthRule` value is float number', () => {
                before(() => {
                    optionsPreset = getNormalizedOptions({
                        ...getDefaultOptions(),
                        splitStrings: true,
                        splitStringsChunkLength: 5.6
                    });

                    expectedOptionsPreset = {
                        ...getDefaultOptions(),
                        splitStrings: true,
                        splitStringsChunkLength: 5
                    };
                });

                it('should normalize options preset', () => {
                    assert.deepEqual(optionsPreset, expectedOptionsPreset);
                });
            });
        });

        describe('stringArrayRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...getDefaultOptions(),
                    stringArray: false,
                    stringArrayCallsTransform: true,
                    stringArrayCallsTransformThreshold: 1,
                    stringArrayEncoding: [StringArrayEncoding.Rc4],
                    stringArrayIndexShift: true,
                    stringArrayRotate: true,
                    stringArrayShuffle: true,
                    stringArrayWrappersChainedCalls: true,
                    stringArrayWrappersCount: 5,
                    stringArrayThreshold: 0.5
                });

                expectedOptionsPreset = {
                    ...getDefaultOptions(),
                    stringArray: false,
                    stringArrayCallsTransform: false,
                    stringArrayCallsTransformThreshold: 0,
                    stringArrayEncoding: [StringArrayEncoding.None],
                    stringArrayIndexShift: false,
                    stringArrayRotate: false,
                    stringArrayShuffle: false,
                    stringArrayWrappersChainedCalls: false,
                    stringArrayWrappersCount: 0,
                    stringArrayThreshold: 0
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('stringArrayCallsTransformThresholdRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...getDefaultOptions(),
                    stringArrayCallsTransform: true,
                    stringArrayCallsTransformThreshold: 0
                });

                expectedOptionsPreset = {
                    ...getDefaultOptions(),
                    stringArrayCallsTransform: false,
                    stringArrayCallsTransformThreshold: 0
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('stringArrayEncodingRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...getDefaultOptions(),
                    stringArrayEncoding: []
                });

                expectedOptionsPreset = {
                    ...getDefaultOptions(),
                    stringArrayEncoding: [
                        StringArrayEncoding.None
                    ]
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });

        describe('stringArrayWrappersChainedCallsRule', () => {
            before(() => {
                optionsPreset = getNormalizedOptions({
                    ...getDefaultOptions(),
                    stringArrayWrappersChainedCalls: true,
                    stringArrayWrappersCount: 0
                });

                expectedOptionsPreset = {
                    ...getDefaultOptions(),
                    stringArrayWrappersChainedCalls: false,
                    stringArrayWrappersCount: 0
                };
            });

            it('should normalize options preset', () => {
                assert.deepEqual(optionsPreset, expectedOptionsPreset);
            });
        });
    });
});