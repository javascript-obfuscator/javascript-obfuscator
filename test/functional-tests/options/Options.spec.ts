import 'reflect-metadata';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { assert, use } from 'chai';
import chaiExclude from 'chai-exclude';

import { TInputOptions } from '../../../src/types/options/TInputOptions';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IOptions } from '../../../src/interfaces/options/IOptions';

import { OptionsPreset } from '../../../src/enums/options/presets/OptionsPreset';

import { DEFAULT_PRESET } from '../../../src/options/presets/Default';
import { LOW_OBFUSCATION_PRESET } from '../../../src/options/presets/LowObfuscation';
import { MEDIUM_OBFUSCATION_PRESET } from '../../../src/options/presets/MediumObfuscation';
import { HIGH_OBFUSCATION_PRESET } from '../../../src/options/presets/HighObfuscation';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

use(chaiExclude);

/**
 * @param {TInputOptions} inputOptions
 */
function getOptions (inputOptions: TInputOptions): IOptions {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

    inversifyContainerFacade.load('', '', inputOptions);

    return inversifyContainerFacade
        .get<IOptions>(ServiceIdentifiers.IOptions);
}

describe('Options', () => {
    describe('Options preset', () => {
        let options: IOptions,
            expectedOptions: TInputOptions;

        describe('Preset selection', () => {
            describe('Default preset', () => {
                before(() => {
                    options = getOptions({
                        optionsPreset: OptionsPreset.Default
                    });

                    expectedOptions = DEFAULT_PRESET;
                });

                it('should return correct options preset', () => {
                    assert.deepEqualExcluding<IOptions | TInputOptions>(options, expectedOptions, 'seed');
                });
            });

            describe('Low obfuscation preset', () => {
                before(() => {
                    options = getOptions({
                        optionsPreset: OptionsPreset.LowObfuscation
                    });

                    expectedOptions = LOW_OBFUSCATION_PRESET;
                });

                it('should return correct options preset', () => {
                    assert.deepEqualExcluding<IOptions | TInputOptions>(options, expectedOptions, 'seed');
                });
            });

            describe('Medium obfuscation preset', () => {
                before(() => {
                    options = getOptions({
                        optionsPreset: OptionsPreset.MediumObfuscation
                    });

                    expectedOptions = MEDIUM_OBFUSCATION_PRESET;
                });

                it('should return correct options preset', () => {
                    assert.deepEqualExcluding<IOptions | TInputOptions>(options, expectedOptions, 'seed');
                });
            });

            describe('High obfuscation preset', () => {
                before(() => {
                    options = getOptions({
                        optionsPreset: OptionsPreset.HighObfuscation
                    });

                    expectedOptions = HIGH_OBFUSCATION_PRESET;
                });

                it('should return correct options preset', () => {
                    assert.deepEqualExcluding<IOptions | TInputOptions>(options, expectedOptions, 'seed');
                });
            });
        });

        describe('Input options merge with preset', () => {
            before(() => {
                options = getOptions({
                    optionsPreset: OptionsPreset.HighObfuscation,
                    numbersToExpressions: false
                });

                expectedOptions = {
                    ...HIGH_OBFUSCATION_PRESET,
                    numbersToExpressions: false
                };
            });

            it('should return merge input options with options preset', () => {
                assert.deepEqualExcluding<IOptions | TInputOptions>(options, expectedOptions, 'seed');
            });
        });
    });
});
