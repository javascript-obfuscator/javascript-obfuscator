import 'reflect-metadata';

import { assert } from 'chai';

import { TInputOptions } from '../../../src/types/options/TInputOptions';
import { TOptionsPreset } from '../../../src/types/options/TOptionsPreset';

import { OptionsPreset } from '../../../src/enums/options/presets/OptionsPreset';

import { HIGH_OBFUSCATION_PRESET } from '../../../src/options/presets/HighObfuscation';

import { Options } from '../../../src/options/Options';

describe('Options', () => {
    describe('getOptionsByPreset', () => {
        describe('Variant #1: base behaviour', () => {
            const optionsPresetName: TOptionsPreset = OptionsPreset.HighObfuscation;

            let options: TInputOptions;

            before(() => {
                options = Options.getOptionsByPreset(optionsPresetName);
            });

            it('Should return options for passed options preset name', () => {
                assert.deepEqual(options, HIGH_OBFUSCATION_PRESET);
            });
        });

        describe('Variant #2: unknown options preset name', () => {
            const optionsPresetName: TOptionsPreset = 'foobar' as TOptionsPreset;

            let testFunc: () => TInputOptions;

            before(() => {
                testFunc = () => Options.getOptionsByPreset(optionsPresetName);
            });

            it('Should throws an error when unknown option preset is passed', () => {
                assert.throws(testFunc, 'Options for preset name `foobar` are not found');
            });
        });
    });
});
