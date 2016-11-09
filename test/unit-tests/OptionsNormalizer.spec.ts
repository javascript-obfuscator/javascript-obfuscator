import { IObfuscatorOptions } from '../../src/interfaces/IObfuscatorOptions';
import { IOptions } from '../../src/interfaces/IOptions';

import { DEFAULT_PRESET } from '../../src/preset-options/DefaultPreset';

import { Options } from '../../src/options/Options';
import { OptionsNormalizer } from '../../src/options/OptionsNormalizer';

const assert: Chai.AssertStatic = require('chai').assert;

describe('OptionsNormalizer', () => {
    describe('normalizeOptions (options: IObfuscatorOptions): IObfuscatorOptions', () => {
        let options: IOptions,
            optionsPreset: IObfuscatorOptions,
            expectedOptionsPreset: IObfuscatorOptions;

        it('should normalize options preset: domainLockRule', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                domainLock: ['//localhost:9000', 'https://google.ru/abc?cde=fgh']
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                domainLock: ['localhost', 'google.ru']
            });

            options = new Options(optionsPreset);

            assert.deepEqual(OptionsNormalizer.normalizeOptions(options), expectedOptionsPreset);
        });

        it('should normalize options preset: selfDefendingRule', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                compact: false
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                compact: true
            });

            options = new Options(optionsPreset);

            assert.deepEqual(OptionsNormalizer.normalizeOptions(options), expectedOptionsPreset);
        });

        it('should normalize options preset: sourceMapBaseUrlRule #1', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                sourceMapBaseUrl: 'http://localhost:9000',
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                sourceMapBaseUrl: '',
            });

            options = new Options(optionsPreset);

            assert.deepEqual(OptionsNormalizer.normalizeOptions(options), expectedOptionsPreset);
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

            options = new Options(optionsPreset);

            assert.deepEqual(OptionsNormalizer.normalizeOptions(options), expectedOptionsPreset);
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

            options = new Options(optionsPreset);

            assert.deepEqual(OptionsNormalizer.normalizeOptions(options), expectedOptionsPreset);
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

            options = new Options(optionsPreset);

            assert.deepEqual(OptionsNormalizer.normalizeOptions(options), expectedOptionsPreset);
        });

        it('should normalize options preset: stringArrayEncodingRule', () => {
            optionsPreset = Object.assign({}, DEFAULT_PRESET, {
                stringArrayEncoding: true
            });

            expectedOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                stringArrayEncoding: 'base64'
            });

            options = new Options(optionsPreset);

            assert.deepEqual(OptionsNormalizer.normalizeOptions(options), expectedOptionsPreset);
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

            options = new Options(optionsPreset);

            assert.deepEqual(OptionsNormalizer.normalizeOptions(options), expectedOptionsPreset);
        });
    });
});
