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
            expectedOptions1: IOptions,
            expectedOptions2: IOptions,
            optionsPreset1: IObfuscatorOptions,
            optionsPreset2: IObfuscatorOptions,
            expectedOptionsPreset1: IObfuscatorOptions,
            expectedOptionsPreset2: IObfuscatorOptions;

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

            options1 = new Options(optionsPreset1);
            options2 = new Options(optionsPreset2);

            expectedOptions1 = new Options(expectedOptionsPreset1);
            expectedOptions2 = new Options(expectedOptionsPreset2);
        });

        it('should normalize options preset', () => {
            assert.deepEqual(OptionsNormalizer.normalizeOptions(options1), expectedOptions1);
            assert.deepEqual(OptionsNormalizer.normalizeOptions(options2), expectedOptions2);
        });
    });
});
