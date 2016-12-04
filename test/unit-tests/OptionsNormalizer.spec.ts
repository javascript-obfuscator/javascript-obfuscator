import { IObfuscatorOptions } from '../../src/interfaces/IObfuscatorOptions';
import { IOptions } from '../../src/interfaces/IOptions';

import { DEFAULT_PRESET } from '../../src/preset-options/DefaultPreset';

import { Options } from '../../src/options/Options';
import { OptionsNormalizer } from '../../src/options/OptionsNormalizer';

const assert: Chai.AssertStatic = require('chai').assert;

/**
 * @param optionsPreset
 * @returns {IOptions}
 */
function getNormalizedOptions (optionsPreset: IObfuscatorOptions): IObfuscatorOptions {
    const options: IOptions = new Options(optionsPreset);

    return OptionsNormalizer.normalizeOptions(options);
}

describe('OptionsNormalizer', () => {
    describe('normalizeOptions (options: IObfuscatorOptions): IObfuscatorOptions', () => {
        let optionsPreset: IObfuscatorOptions,
            expectedOptionsPreset: IObfuscatorOptions;

        it('should normalize options preset: domainLockRule', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                domainLock: ['//localhost:9000', 'https://google.ru/abc?cde=fgh']
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                domainLock: ['localhost', 'google.ru']
            });

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: selfDefendingRule', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                compact: false,
                selfDefending: true
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                compact: true,
                selfDefending: true
            });

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: sourceMapBaseUrlRule #1', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                sourceMapBaseUrl: 'http://localhost:9000',
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                sourceMapBaseUrl: '',
            });

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: sourceMapBaseUrlRule #2', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                sourceMapBaseUrl: 'http://localhost:9000',
                sourceMapFileName: '/outputSourceMapName.map'
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                sourceMapBaseUrl: 'http://localhost:9000/',
                sourceMapFileName: 'outputSourceMapName.js.map'
            });

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: sourceMapFileNameRule', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                sourceMapBaseUrl: 'http://localhost:9000',
                sourceMapFileName: '//outputSourceMapName',
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                sourceMapBaseUrl: 'http://localhost:9000/',
                sourceMapFileName: 'outputSourceMapName.js.map',
            });

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: stringArrayRule', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                stringArray: false,
                stringArrayEncoding: 'rc4',
                stringArrayThreshold: 0.5,
                rotateStringArray: true
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                stringArray: false,
                stringArrayEncoding: false,
                stringArrayThreshold: 0,
                rotateStringArray: false
            });

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: stringArrayEncodingRule', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                stringArrayEncoding: true
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                stringArrayEncoding: 'base64'
            });

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });

        it('should normalize options preset: stringArrayThresholdRule', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                rotateStringArray: true,
                stringArray: true,
                stringArrayThreshold: 0
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                rotateStringArray: false,
                stringArray: false,
                stringArrayThreshold: 0
            });

            assert.deepEqual(getNormalizedOptions(optionsPreset), expectedOptionsPreset);
        });
    });
});
