import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayStorage', () => {
    describe('Rotate string array', function () {
        this.timeout(100000);

        describe('Variant #1: single string array value', () => {
            const samples: number = 1000;
            const delta: number = 0.1;
            const expectedVariantProbability: number = 1;

            const stringArrayVariant1RegExp1: RegExp = /var _0x([a-f0-9]){4} *= *\['test'];/g;
            const literalNodeVariant1RegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0'\);/g;

            let stringArrayVariant1Probability: number,
                literalNodeVariant1Probability: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/one-string.js');

                let stringArrayVariant1MatchesLength: number = 0;
                let literalNodeVariant1MatchesLength: number = 0;

               for (let i = 0; i < samples; i++) {
                   const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                       code,
                       {
                           ...NO_ADDITIONAL_NODES_PRESET,
                           rotateStringArray: true,
                           stringArray: true,
                           stringArrayThreshold: 1
                       }
                   ).getObfuscatedCode();

                   if (obfuscatedCode.match(stringArrayVariant1RegExp1)) {
                       stringArrayVariant1MatchesLength++;
                   }

                   if (obfuscatedCode.match(literalNodeVariant1RegExp)) {
                       literalNodeVariant1MatchesLength++;
                   }
               }

                stringArrayVariant1Probability = stringArrayVariant1MatchesLength / samples;
                literalNodeVariant1Probability = literalNodeVariant1MatchesLength / samples;
            });

            describe('String array probability', () => {
                it('Variant #1: should create single string array variant', () => {
                    assert.closeTo(stringArrayVariant1Probability, expectedVariantProbability, delta);
                });
            });

            describe('Literal node probability', () => {
                it('Variant #1: should replace literal node with call to string array variant', () => {
                    assert.closeTo(literalNodeVariant1Probability, expectedVariantProbability, delta);
                });
            });
        });

        describe('Variant #2: Three string array values', () => {
            const samples: number = 1000;
            const delta: number = 0.1;
            const expectedStringArrayVariantProbability: number = 0.33;
            const expectedLiteralNodeVariantProbability: number = 1;

            const stringArrayVariantsCount: number = 3;
            const literalNodeVariantsCount: number = 1;

            const stringArrayVariantRegExps: RegExp[] = [
                /var _0x([a-f0-9]){4} *= *\['foo', *'bar', *'baz'];/g,
                /var _0x([a-f0-9]){4} *= *\['bar', *'baz', *'foo'];/g,
                /var _0x([a-f0-9]){4} *= *\['baz', *'foo', *'bar'];/g
            ];
            const literalNodeVariantRegExps: RegExp[] = [
                new RegExp(
                    `var foo *= *_0x([a-f0-9]){4}\\('0x0'\\); *` +
                    `var bar *= *_0x([a-f0-9]){4}\\('0x1'\\); *` +
                    `var baz *= *_0x([a-f0-9]){4}\\('0x2'\\);`
                )
            ];

            const stringArrayVariantProbabilities: number[] = new Array(stringArrayVariantsCount).fill(0);
            const literalNodeVariantProbabilities: number[] = new Array(literalNodeVariantsCount).fill(0);

            const stringArrayVariantMatchesLength: number[] = new Array(stringArrayVariantsCount).fill(0);
            const literalNodeVariantMatchesLength: number[] = new Array(literalNodeVariantsCount).fill(0);

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/three-strings.js');

                for (let i = 0; i < samples; i++) {
                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            rotateStringArray: true,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    for (let variantIndex = 0; variantIndex < stringArrayVariantsCount; variantIndex++) {
                        if (obfuscatedCode.match(stringArrayVariantRegExps[variantIndex])) {
                            stringArrayVariantMatchesLength[variantIndex]++;
                        }

                        if (obfuscatedCode.match(literalNodeVariantRegExps[variantIndex])) {
                            literalNodeVariantMatchesLength[variantIndex]++;
                        }
                    }
                }

                for (let variantIndex = 0; variantIndex < stringArrayVariantsCount; variantIndex++) {
                    stringArrayVariantProbabilities[variantIndex] = stringArrayVariantMatchesLength[variantIndex] / samples;
                }

                for (let variantIndex = 0; variantIndex < literalNodeVariantsCount; variantIndex++) {
                    literalNodeVariantProbabilities[variantIndex] = literalNodeVariantMatchesLength[variantIndex] / samples;
                }
            });

            describe('String array probability', () => {
                for (let variantIndex = 0; variantIndex < stringArrayVariantsCount; variantIndex++) {
                    const variantNumber: number = variantIndex + 1;

                    it(`Variant #${variantNumber}: should create string array variant`, () => {
                        assert.closeTo(stringArrayVariantProbabilities[variantIndex], expectedStringArrayVariantProbability, delta);
                    });
                }
            });

            describe('Literal node probability', () => {
                for (let variantIndex = 0; variantIndex < literalNodeVariantsCount; variantIndex++) {
                    const variantNumber: number = variantIndex + 1;

                    it(`Variant #${variantNumber}: should replace literal node with call to string array variant`, () => {
                        assert.closeTo(literalNodeVariantProbabilities[variantIndex], expectedLiteralNodeVariantProbability, delta);
                    });
                }
            });
        });
    });

    describe('Shuffle string array', function () {
        this.timeout(100000);

        describe('Variant #1: single string array value', () => {
            const samples: number = 1000;
            const delta: number = 0.1;
            const expectedVariantProbability: number = 1;

            const stringArrayVariantRegExp1: RegExp = /var _0x([a-f0-9]){4} *= *\['test'];/g;
            const literalNodeVariant1RegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0'\);/g;

            let stringArrayVariant1Probability: number,
                literalNodeVariant1Probability: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/one-string.js');

                let stringArrayVariant1MatchesLength: number = 0;
                let literalNodeVariant1MatchesLength: number = 0;

                for (let i = 0; i < samples; i++) {
                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            shuffleStringArray: true,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    if (obfuscatedCode.match(stringArrayVariantRegExp1)) {
                        stringArrayVariant1MatchesLength++;
                    }

                    if (obfuscatedCode.match(literalNodeVariant1RegExp)) {
                        literalNodeVariant1MatchesLength++;
                    }
                }

                stringArrayVariant1Probability = stringArrayVariant1MatchesLength / samples;
                literalNodeVariant1Probability = literalNodeVariant1MatchesLength / samples;
            });

            describe('String array probability', () => {
                it('Variant #1: should create string array variant', () => {
                    assert.closeTo(stringArrayVariant1Probability, expectedVariantProbability, delta);
                });
            });

            describe('Literal node probability', () => {
                it('Variant #1: should replace literal node with call to string array variant', () => {
                    assert.closeTo(literalNodeVariant1Probability, expectedVariantProbability, delta);
                });
            });
        });

        describe('Variant #2: Three string array values', () => {
            const samples: number = 1000;
            const delta: number = 0.1;
            const expectedVariantProbability: number = 0.166;

            const variantsCount: number = 6;

            const stringArrayVariantRegExps: RegExp[] = [
                /var _0x([a-f0-9]){4} *= *\['foo', *'bar', *'baz'];/g,
                /var _0x([a-f0-9]){4} *= *\['foo', *'baz', *'bar'];/g,
                /var _0x([a-f0-9]){4} *= *\['bar', *'foo', *'baz'];/g,
                /var _0x([a-f0-9]){4} *= *\['bar', *'baz', *'foo'];/g,
                /var _0x([a-f0-9]){4} *= *\['baz', *'foo', *'bar'];/g,
                /var _0x([a-f0-9]){4} *= *\['baz', *'bar', *'foo'];/g
            ];

            const literalNodeVariantRegExps: RegExp[] = [
                new RegExp(
                    `var foo *= *_0x([a-f0-9]){4}\\('0x0'\\); *` +
                    `var bar *= *_0x([a-f0-9]){4}\\('0x1'\\); *` +
                    `var baz *= *_0x([a-f0-9]){4}\\('0x2'\\);`
                ),
                new RegExp(
                    `var foo *= *_0x([a-f0-9]){4}\\('0x0'\\); *` +
                    `var bar *= *_0x([a-f0-9]){4}\\('0x2'\\); *` +
                    `var baz *= *_0x([a-f0-9]){4}\\('0x1'\\);`
                ),
                new RegExp(
                    `var foo *= *_0x([a-f0-9]){4}\\('0x1'\\); *` +
                    `var bar *= *_0x([a-f0-9]){4}\\('0x0'\\); *` +
                    `var baz *= *_0x([a-f0-9]){4}\\('0x2'\\);`
                ),
                new RegExp(
                    `var foo *= *_0x([a-f0-9]){4}\\('0x1'\\); *` +
                    `var bar *= *_0x([a-f0-9]){4}\\('0x2'\\); *` +
                    `var baz *= *_0x([a-f0-9]){4}\\('0x0'\\);`
                ),
                new RegExp(
                    `var foo *= *_0x([a-f0-9]){4}\\('0x2'\\); *` +
                    `var bar *= *_0x([a-f0-9]){4}\\('0x0'\\); *` +
                    `var baz *= *_0x([a-f0-9]){4}\\('0x1'\\);`
                ),
                new RegExp(
                    `var foo *= *_0x([a-f0-9]){4}\\('0x2'\\); *` +
                    `var bar *= *_0x([a-f0-9]){4}\\('0x1'\\); *` +
                    `var baz *= *_0x([a-f0-9]){4}\\('0x0'\\);`
                )
            ];

            const stringArrayVariantProbabilities: number[] = new Array(variantsCount).fill(0);
            const literalNodeVariantProbabilities: number[] = new Array(variantsCount).fill(0);

            const stringArrayVariantMatchesLength: number[] = new Array(variantsCount).fill(0);
            const literalNodeVariantMatchesLength: number[] = new Array(variantsCount).fill(0);

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/three-strings.js');

                for (let i = 0; i < samples; i++) {
                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            shuffleStringArray: true,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    for (let variantIndex = 0; variantIndex < variantsCount; variantIndex++) {
                        if (obfuscatedCode.match(stringArrayVariantRegExps[variantIndex])) {
                            stringArrayVariantMatchesLength[variantIndex]++;
                        }

                        if (obfuscatedCode.match(literalNodeVariantRegExps[variantIndex])) {
                            literalNodeVariantMatchesLength[variantIndex]++;
                        }
                    }
                }

                for (let variantIndex = 0; variantIndex < variantsCount; variantIndex++) {
                    stringArrayVariantProbabilities[variantIndex] = stringArrayVariantMatchesLength[variantIndex] / samples;
                    literalNodeVariantProbabilities[variantIndex] = literalNodeVariantMatchesLength[variantIndex] / samples;
                }

            });

            for (let variantIndex = 0; variantIndex < variantsCount; variantIndex++) {
                const variantNumber: number = variantIndex + 1;

                it(`Variant #${variantNumber}: should create string array variant`, () => {
                    assert.closeTo(stringArrayVariantProbabilities[variantIndex], expectedVariantProbability, delta);
                });

                it(`Variant #${variantNumber}: should replace literal node with call to string array variant`, () => {
                    assert.closeTo(literalNodeVariantProbabilities[variantIndex], expectedVariantProbability, delta);
                });
            }
        });
    });
});
