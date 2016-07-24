import { IObfuscatorOptions } from "../../src/interfaces/IObfuscatorOptions";
import { IOptions } from "../../src/interfaces/IOptions";

import { DEFAULT_PRESET } from '../../src/preset-options/DefaultPreset';

import { Options } from "../../src/options/Options";
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
                rotateUnicodeArray: true,
                unicodeArray: false,
                unicodeArrayThreshold: 0.5,
                wrapUnicodeArrayCalls: true
            });
            optionsPreset2 = Object.assign({}, DEFAULT_PRESET, {
                rotateUnicodeArray: true,
                unicodeArray: true,
                unicodeArrayThreshold: 0,
                wrapUnicodeArrayCalls: true
            });
            optionsPreset3 = Object.assign({}, DEFAULT_PRESET, {
                unicodeArray: true,
                encodeUnicodeLiterals: true,
                wrapUnicodeArrayCalls: false
            });

            expectedOptionsPreset1 = Object.assign({}, DEFAULT_PRESET, {
                compact: true,
                rotateUnicodeArray: false,
                unicodeArray: false,
                unicodeArrayThreshold: 0,
                wrapUnicodeArrayCalls: false
            });
            expectedOptionsPreset2 = Object.assign({}, DEFAULT_PRESET, {
                rotateUnicodeArray: false,
                unicodeArray: false,
                unicodeArrayThreshold: 0,
                wrapUnicodeArrayCalls: false
            });
            expectedOptionsPreset3 = Object.assign({}, DEFAULT_PRESET, {
                unicodeArray: true,
                encodeUnicodeLiterals: true,
                wrapUnicodeArrayCalls: true
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
