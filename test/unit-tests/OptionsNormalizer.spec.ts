import { IObfuscatorOptions } from '../../src/interfaces/IObfuscatorOptions';
import { IOptions } from '../../src/interfaces/IOptions';

import { DEFAULT_PRESET } from '../../src/preset-options/DefaultPreset';

import { Options } from '../../src/options/Options';
import { OptionsNormalizer } from '../../src/options/OptionsNormalizer';

const assert: Chai.AssertStatic = require('chai').assert;

describe('OptionsNormalizer', () => {
    describe('normalizeOptions (options: IObfuscatorOptions): IObfuscatorOptions', () => {
        let options1: IOptions,
            options2: IOptions,
            options3: IOptions,
            optionsPreset1: IObfuscatorOptions,
            optionsPreset2: IObfuscatorOptions,
            optionsPreset3: IObfuscatorOptions,
            expectedOptionsPreset1: IObfuscatorOptions,
            expectedOptionsPreset2: IObfuscatorOptions,
            expectedOptionsPreset3: IObfuscatorOptions;

        beforeEach(() => {
            optionsPreset1 = Object.assign({}, DEFAULT_PRESET, {
                compact: false,
                rotateStringsArray: true,
                sourceMapBaseUrl: 'http://localhost:9000',
                stringsArray: false,
                stringsArrayEncoding: 'rc4',
                stringsArrayThreshold: 0.5
            });
            optionsPreset2 = Object.assign({}, DEFAULT_PRESET, {
                rotateStringsArray: true,
                sourceMapBaseUrl: 'http://localhost:9000',
                sourceMapFileName: '//outputSourceMapName',
                stringsArray: true,
                stringsArrayThreshold: 0
            });
            optionsPreset3 = Object.assign({}, DEFAULT_PRESET, {
                domainLock: ['//localhost:9000', 'https://google.ru/abc?cde=fgh'],
                sourceMapFileName: '/outputSourceMapName.map',
                stringsArray: true,
                stringsArrayEncoding: true
            });

            expectedOptionsPreset1 = Object.assign({}, DEFAULT_PRESET, {
                compact: true,
                rotateStringsArray: false,
                sourceMapBaseUrl: '',
                stringsArray: false,
                stringsArrayEncoding: false,
                stringsArrayThreshold: 0
            });
            expectedOptionsPreset2 = Object.assign({}, DEFAULT_PRESET, {
                rotateStringsArray: false,
                sourceMapBaseUrl: 'http://localhost:9000/',
                sourceMapFileName: 'outputSourceMapName.js.map',
                stringsArray: false,
                stringsArrayThreshold: 0
            });
            expectedOptionsPreset3 = Object.assign({}, DEFAULT_PRESET, {
                domainLock: ['localhost', 'google.ru'],
                sourceMapFileName: 'outputSourceMapName.js.map',
                stringsArray: true,
                stringsArrayEncoding: 'base64'
            });

            options1 = new Options(optionsPreset1);
            options2 = new Options(optionsPreset2);
            options3 = new Options(optionsPreset3);
        });

        it('should normalize options preset', () => {
            assert.deepEqual(OptionsNormalizer.normalizeOptions(options1), expectedOptionsPreset1);
            assert.deepEqual(OptionsNormalizer.normalizeOptions(options2), expectedOptionsPreset2);
            assert.deepEqual(OptionsNormalizer.normalizeOptions(options3), expectedOptionsPreset3);
        });
    });
});
