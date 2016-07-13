import { IObfuscatorOptions } from "../../src/interfaces/IObfuscatorOptions";

import { OptionsNormalizer } from '../../src/OptionsNormalizer';

import { DEFAULT_PRESET } from '../../src/preset-options/DefaultPreset';

const assert: Chai.AssertStatic = require('chai').assert;

describe('OptionsNormalizer', () => {
    describe('normalizeOptions (options: IObfuscatorOptions): IObfuscatorOptions', () => {
        let optionsPreset1: IObfuscatorOptions;

        beforeEach(() => {
            optionsPreset1 = Object.assign({}, DEFAULT_PRESET, {
                compact: false,
                rotateUnicodeArray: true,
                unicodeArray: false,
                unicodeArrayThreshold: 0.5,
                wrapUnicodeArrayCalls: true
            });
        });

        it('should normalize options preset', () => {
            assert.deepEqual(
                OptionsNormalizer.normalizeOptions(optionsPreset1), Object.assign({}, DEFAULT_PRESET, {
                    compact: true,
                    rotateUnicodeArray: false,
                    unicodeArray: false,
                    unicodeArrayThreshold: 0,
                    wrapUnicodeArrayCalls: false
                })
            );
        });
    });
});
