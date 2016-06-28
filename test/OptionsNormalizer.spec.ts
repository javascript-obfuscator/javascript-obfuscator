import { BabelPolyfill } from './polyfills/BabelPolyfill';

import { IOptionsPreset } from "../src/interfaces/IOptionsPreset";

import { OptionsNormalizer } from '../src/OptionsNormalizer';

import { DEFAULT_PRESET } from '../src/preset-options/DefaultPreset';

const assert: Chai.AssertStatic = require('chai').assert;

BabelPolyfill.append();

describe('OptionsNormalizer', () => {
    describe('normalizeOptionsPreset (options: IOptionsPreset): IOptionsPreset', () => {
        let optionsPreset1: IOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                compact: false,
                rotateUnicodeArray: true,
                unicodeArray: false,
                unicodeArrayThreshold: 0.5,
                wrapUnicodeArrayCalls: true

            }),
            optionsPreset2: IOptionsPreset = Object.assign({}, DEFAULT_PRESET, {
                unicodeArrayThreshold: 2

            });

        it('should normalize options preset', () => {
            assert.deepEqual(
                OptionsNormalizer.normalizeOptionsPreset(optionsPreset1), Object.assign({}, DEFAULT_PRESET, {
                    compact: true,
                    rotateUnicodeArray: false,
                    unicodeArray: false,
                    unicodeArrayThreshold: 0,
                    wrapUnicodeArrayCalls: false
                })
            );

            assert.deepEqual(
                OptionsNormalizer.normalizeOptionsPreset(optionsPreset2), Object.assign({}, DEFAULT_PRESET, {
                    unicodeArrayThreshold: 1
                })
            );
        });
    });
});
