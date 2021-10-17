import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { StringArrayEncoding } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayIndexesType } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayIndexesType';
import { StringArrayWrappersType } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getStringArrayRegExp } from '../../../../helpers/get-string-array-regexp';
import { readFileAsString } from '../../../../helpers/readFileAsString';
import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { swapLettersCase } from '../../../../helpers/swapLettersCase';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayTransformer', function () {
    this.timeout(120000);

    describe('Variant #1: default behaviour', () => {
        const stringArrayRegExp: RegExp = getStringArrayRegExp(['test']);
        const stringArrayCallRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('match #1: should replace literal node value with value from string array', () => {
            assert.match(obfuscatedCode, stringArrayRegExp);
        });

        it('match #2: should replace literal node value with value from string array', () => {
            assert.match(obfuscatedCode, stringArrayCallRegExp);
        });
    });

    describe('Variant #2: `stringArray` option is disabled', () => {
        const regExp: RegExp = /^var test *= *'test';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t replace literal node value with value from string array', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #3: `stringArrayIndexesType` option', () => {
        describe('Variant #1: `hexadecimal-number` type', () => {
            const stringArrayCallRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayIndexesType: [
                            StringArrayIndexesType.HexadecimalNumber
                        ]
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should transform string array index with the passed index type', () => {
                assert.match(obfuscatedCode, stringArrayCallRegExp);
            });
        });

        describe('Variant #2: `hexadecimal-numeric-string` type', () => {
            const stringArrayCallRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0'\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayIndexesType: [
                            StringArrayIndexesType.HexadecimalNumericString
                        ]
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should transform string array index with the passed index type', () => {
                assert.match(obfuscatedCode, stringArrayCallRegExp);
            });
        });

        describe('Variant #3: multiple types', () => {
            const samplesCount: number = 500;
            const expectedMatchesChance: number = 0.5;
            const expectedMatchesDelta: number = 0.15;

            const hexadecimalNumberIndexTypeRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0\);/;
            const hexadecimalNumericStringIndexTypeRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\('0x0'\);/;

            let hexadecimalNumberIndexTypeMatchesCount: number = 0;
            let hexadecimalNumericStringIndexTypeMatchesCount: number = 0;

            let hexadecimalNumberIndexTypeMatchesChance: number = 0;
            let hexadecimalNumericStringIndexTypeMatchesChance: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                for (let i = 0; i < samplesCount; i++) {
                    const obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            stringArrayIndexesType: [
                                StringArrayIndexesType.HexadecimalNumber,
                                StringArrayIndexesType.HexadecimalNumericString
                            ]
                        }
                    ).getObfuscatedCode();

                    if (obfuscatedCode.match(hexadecimalNumberIndexTypeRegExp)) {
                        hexadecimalNumberIndexTypeMatchesCount += 1;
                    }

                    if (obfuscatedCode.match(hexadecimalNumericStringIndexTypeRegExp)) {
                        hexadecimalNumericStringIndexTypeMatchesCount += 1;
                    }

                    hexadecimalNumberIndexTypeMatchesChance = hexadecimalNumberIndexTypeMatchesCount / samplesCount;
                    hexadecimalNumericStringIndexTypeMatchesChance = hexadecimalNumericStringIndexTypeMatchesCount / samplesCount;
                }
            });

            it('should transform string array indexes with a `hexadecimal-number` type', () => {
                assert.closeTo(hexadecimalNumberIndexTypeMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });

            it('should transform string array indexes with a `hexadecimal-numeric-string` type', () => {
                assert.closeTo(hexadecimalNumericStringIndexTypeMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });
        });
    });

    describe('Variant #4: `stringArrayIndexShift` option is enabled', () => {
        const stringArrayIndexShiftRegExp: RegExp = /_0x(?:[a-f0-9]){4,6} *= *_0x(?:[a-f0-9]){4,6} *- *(0x[a-z0-9]{1,3});/;
        const stringArrayCallRegExp1: RegExp = /var _0x(?:[a-f0-9]){4,6} *= *_0x(?:[a-f0-9]){4}\((0x[a-z0-9]{1,3})\) *\+ *0x1;/;
        const stringArrayCallRegExp2: RegExp = /var _0x(?:[a-f0-9]){4,6} *= *_0x(?:[a-f0-9]){4}\((0x[a-z0-9]{1,3})\) *\+ *0x2;/;
        const stringArrayCallRegExp3: RegExp = /var _0x(?:[a-f0-9]){4,6} *= *_0x(?:[a-f0-9]){4}\((0x[a-z0-9]{1,3})\) *\+ *0x3;/;

        const expectedEvaluationResult: string = 'foo1bar2baz3';

        let obfuscatedCode: string;

        let stringArrayIndexShiftIndexValue: number;
        let stringArrayCallIndexValue1: number;
        let stringArrayCallIndexValue2: number;
        let stringArrayCallIndexValue3: number;

        let evaluationResult: string;

        describe('Variant #1: simple', () => {
            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/string-array-index-shift.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayIndexShift: true
                    }
                ).getObfuscatedCode();

                stringArrayIndexShiftIndexValue = parseInt(getRegExpMatch(obfuscatedCode, stringArrayIndexShiftRegExp), 16);
                stringArrayCallIndexValue1 = parseInt(getRegExpMatch(obfuscatedCode, stringArrayCallRegExp1), 16);
                stringArrayCallIndexValue2 = parseInt(getRegExpMatch(obfuscatedCode, stringArrayCallRegExp2), 16);
                stringArrayCallIndexValue3 = parseInt(getRegExpMatch(obfuscatedCode, stringArrayCallRegExp3), 16);

                evaluationResult = eval(obfuscatedCode);
            });

            it('should shift string array index in calls wrapper', () => {
                assert.match(obfuscatedCode, stringArrayIndexShiftRegExp);
            });

            it('Match #1: should create string array call with shifted index', () => {
                assert.equal(stringArrayIndexShiftIndexValue, stringArrayCallIndexValue1);
            });

            it('Match #2: should create string array call with shifted index', () => {
                assert.equal(stringArrayIndexShiftIndexValue, stringArrayCallIndexValue2 - 1);
            });

            it('Match #3: should create string array call with shifted index', () => {
                assert.equal(stringArrayIndexShiftIndexValue, stringArrayCallIndexValue3 - 2);
            });

            it('should correctly evaluate code', () => {
                assert.equal(evaluationResult, expectedEvaluationResult);
            });
        });

        describe('Variant #2: `stringArrayRotate` option is enabled', () => {
            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/string-array-index-shift.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayIndexShift: true,
                        stringArrayRotate: true
                    }
                ).getObfuscatedCode();

                stringArrayIndexShiftIndexValue = parseInt(getRegExpMatch(obfuscatedCode, stringArrayIndexShiftRegExp), 16);
                stringArrayCallIndexValue1 = parseInt(getRegExpMatch(obfuscatedCode, stringArrayCallRegExp1), 16);
                stringArrayCallIndexValue2 = parseInt(getRegExpMatch(obfuscatedCode, stringArrayCallRegExp2), 16);
                stringArrayCallIndexValue3 = parseInt(getRegExpMatch(obfuscatedCode, stringArrayCallRegExp3), 16);

                evaluationResult = eval(obfuscatedCode);
            });

            it('should shift string array index in calls wrapper', () => {
                assert.match(obfuscatedCode, stringArrayIndexShiftRegExp);
            });

            it('should correctly evaluate code', () => {
                assert.equal(evaluationResult, expectedEvaluationResult);
            });
        });

        describe('Variant #3: `stringArrayShuffle` option is enabled', () => {
            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/string-array-index-shift.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayIndexShift: true,
                        stringArrayShuffle: true
                    }
                ).getObfuscatedCode();

                evaluationResult = eval(obfuscatedCode);
            });

            it('should shift string array index in calls wrapper', () => {
                assert.match(obfuscatedCode, stringArrayIndexShiftRegExp);
            });

            it('should correctly evaluate code', () => {
                assert.equal(evaluationResult, expectedEvaluationResult);
            });
        });

        describe('Variant #4: `stringArrayWrappersCount` option is enabled and type is `function`', () => {
            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/string-array-index-shift.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayIndexShift: true,
                        stringArrayWrappersCount: 1,
                        stringArrayWrappersType: StringArrayWrappersType.Function
                    }
                ).getObfuscatedCode();

                evaluationResult = eval(obfuscatedCode);
            });

            it('should shift string array index in calls wrapper', () => {
                assert.match(obfuscatedCode, stringArrayIndexShiftRegExp);
            });

            it('should correctly evaluate code', () => {
                assert.equal(evaluationResult, expectedEvaluationResult);
            });
        });

        describe('Variant #5: all string array options are enabled', () => {
            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/string-array-index-shift.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArrayRotate: true,
                        stringArrayShuffle: true,
                        stringArray: true,
                        stringArrayEncoding: [
                            StringArrayEncoding.Rc4
                        ],
                        stringArrayIndexShift: true,
                        stringArrayThreshold: 1,
                        stringArrayWrappersCount: 2,
                        stringArrayWrappersChainedCalls: true,
                        stringArrayWrappersType: 'function'
                    }
                ).getObfuscatedCode();

                evaluationResult = eval(obfuscatedCode);
            });

            it('should shift string array index in calls wrapper', () => {
                assert.match(obfuscatedCode, stringArrayIndexShiftRegExp);
            });

            it('should correctly evaluate code', () => {
                assert.equal(evaluationResult, expectedEvaluationResult);
            });
        });
    });

    describe('Variant #5: same literal node values', () => {
        const stringArrayRegExp: RegExp = getStringArrayRegExp(['test']);
        const stringArrayCallRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/same-literal-values.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('match #1: should create only one item in string array for same literal node values', () => {
            assert.match(obfuscatedCode, stringArrayRegExp);
        });

        it('match #2: should create only one item in string array for same literal node values', () => {
            assert.match(obfuscatedCode, stringArrayCallRegExp);
        });
    });

    describe('Variant #6: short literal node value', () => {
        const regExp: RegExp = /var test *= *'te';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/short-literal-value.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t replace short literal node value with value from string array', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #7: base64 encoding', () => {
        const stringArrayRegExp: RegExp = new RegExp(
            'function _0x([a-f0-9]){4} *\\(\\) *{' +
                `var _0x([a-f0-9]){4,6} *= *\\[\'${swapLettersCase('dGVzdA')}\'];.*` +
                'return _0x([a-f0-9]){4}\\(\\); *' +
            '}'
        );
        const stringArrayCallRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayEncoding: [StringArrayEncoding.Base64],
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('match #1: should replace literal node value with value from string array encoded using base64', () => {
            assert.match(obfuscatedCode, stringArrayRegExp);
        });

        it('match #2: should replace literal node value with value from string array encoded using base64', () => {
            assert.match(obfuscatedCode, stringArrayCallRegExp);
        });
    });

    describe('Variant #8: rc4 encoding', () => {
        describe('Variant #1: single string literal', () => {
            const regExp: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0, *'.{4}'\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayEncoding: [StringArrayEncoding.Rc4],
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should replace literal node value with value from string array encoded using rc4', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: multiple string literals', () => {
            const variableRegExp1: RegExp = /var test *= *_0x(?:[a-f0-9]){4}\(0x0, *'(.{4})'\);/;
            const variableRegExp2: RegExp = /var test *= *_0x(?:[a-f0-9]){4}\(0x1, *'(.{4})'\);/;

            let encodedLiteralValue1: string;
            let encodedLiteralValue2: string;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/same-literal-values.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        seed: 1, // set seed to prevent rare case when all encoded values are the same
                        stringArray: true,
                        stringArrayEncoding: [StringArrayEncoding.Rc4],
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();

                encodedLiteralValue1 = getRegExpMatch(obfuscatedCode, variableRegExp1);
                encodedLiteralValue2 = getRegExpMatch(obfuscatedCode, variableRegExp2);
            });

            it('Match #1: should replace literal node value with value from string array encoded using rc4', () => {
                assert.match(obfuscatedCode, variableRegExp1);
            });

            it('Match #2: should replace literal node value with value from string array encoded using rc4', () => {
                assert.match(obfuscatedCode, variableRegExp2);
            });

            it('Should encode same values as two different encoded string array items', () => {
                assert.notEqual(encodedLiteralValue1, encodedLiteralValue2);
            });
        });
    });

    describe('Variant #9: none and base64 encoding', () => {
        describe('Variant #1: string array values', () => {
            const samplesCount: number = 300;
            const expectedMatchesChance: number = 0.5;
            const expectedMatchesDelta: number = 0.15;

            const noneEncodingRegExp: RegExp = getStringArrayRegExp(['test']);
            const base64EncodingRegExp: RegExp = getStringArrayRegExp(['DgvZDa']);

            let noneEncodingMatchesCount: number = 0;
            let base64EncodingMatchesCount: number = 0;
            let obfuscatedCode: string;

            let noneEncodingMatchesChance: number;
            let base64EncodingMatchesChance: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                for (let i = 0; i < samplesCount; i++) {
                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.None,
                                StringArrayEncoding.Base64
                            ],
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    if (obfuscatedCode.match(noneEncodingRegExp)) {
                        noneEncodingMatchesCount = noneEncodingMatchesCount + 1;
                    }

                    if (obfuscatedCode.match(base64EncodingRegExp)) {
                        base64EncodingMatchesCount = base64EncodingMatchesCount + 1;
                    }

                    noneEncodingMatchesChance = noneEncodingMatchesCount / samplesCount;
                    base64EncodingMatchesChance = base64EncodingMatchesCount / samplesCount;
                }
            });

            it('should add literal node value to the string array without encoding', () => {
                assert.closeTo(noneEncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });

            it('should add literal node value to the string array encoded using base64', () => {
                assert.closeTo(base64EncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });
        });
    });

    describe('Variant #10: none and rc4 encoding', () => {
        describe('Variant #1: string array calls wrapper call', () => {
            const samplesCount: number = 300;
            const expectedMatchesChance: number = 0.5;
            const expectedMatchesDelta: number = 0.15;

            const noneEncodingRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0\);/;
            const rc4EncodingRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0, *'.{4}'\);/;

            let noneEncodingMatchesCount: number = 0;
            let rc4EncodingMatchesCount: number = 0;
            let obfuscatedCode: string;

            let noneEncodingMatchesChance: number;
            let rc4EncodingMatchesChance: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                for (let i = 0; i < samplesCount; i++) {
                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.None,
                                StringArrayEncoding.Rc4
                            ],
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    if (obfuscatedCode.match(noneEncodingRegExp)) {
                        noneEncodingMatchesCount = noneEncodingMatchesCount + 1;
                    }

                    if (obfuscatedCode.match(rc4EncodingRegExp)) {
                        rc4EncodingMatchesCount = rc4EncodingMatchesCount + 1;
                    }

                    noneEncodingMatchesChance = noneEncodingMatchesCount / samplesCount;
                    rc4EncodingMatchesChance = rc4EncodingMatchesCount / samplesCount;
                }
            });

            it('should replace literal node value with value from string array without encoding', () => {
                assert.closeTo(noneEncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });

            it('should replace literal node value with value from string array encoded using rc4', () => {
                assert.closeTo(rc4EncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });
        });
    });

    describe('Variant #11: base64 and rc4 encoding', () => {
        describe('Variant #1: single string literal', () => {
            const samplesCount: number = 300;
            const expectedMatchesChance: number = 0.5;
            const expectedMatchesDelta: number = 0.15;

            const base64EncodingRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0\);/;
            const rc4EncodingRegExp: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0, *'.{4}'\);/;

            let base64EncodingMatchesCount: number = 0;
            let rc4EncodingMatchesCount: number = 0;
            let obfuscatedCode: string;

            let base64EncodingMatchesChance: number;
            let rc4EncodingMatchesChance: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                for (let i = 0; i < samplesCount; i++) {
                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayEncoding: [
                                StringArrayEncoding.Base64,
                                StringArrayEncoding.Rc4
                            ],
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

                    if (obfuscatedCode.match(base64EncodingRegExp)) {
                        base64EncodingMatchesCount = base64EncodingMatchesCount + 1;
                    }

                    if (obfuscatedCode.match(rc4EncodingRegExp)) {
                        rc4EncodingMatchesCount = rc4EncodingMatchesCount + 1;
                    }

                    base64EncodingMatchesChance = base64EncodingMatchesCount / samplesCount;
                    rc4EncodingMatchesChance = rc4EncodingMatchesCount / samplesCount;
                }
            });

            it('should replace literal node value with value from string array encoded using base64', () => {
                assert.closeTo(base64EncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });

            it('should replace literal node value with value from string array encoded using rc4', () => {
                assert.closeTo(rc4EncodingMatchesChance, expectedMatchesChance, expectedMatchesDelta);
            });
        });
    });

    describe('Variant #12: `stringArrayThreshold` option value', () => {
        const samples: number = 1000;
        const stringArrayThreshold: number = 0.5;
        const delta: number = 0.1;

        const regExp1: RegExp = /var test *= *_0x([a-f0-9]){4}\(0x0\);/g;
        const regExp2: RegExp = /var test *= *'test';/g;

        let stringArrayProbability: number,
            noStringArrayProbability: number;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                `${code}\n`.repeat(samples),
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: stringArrayThreshold
                }
            ).getObfuscatedCode();

            const stringArrayMatchesLength: number = obfuscatedCode
                .match(regExp1)!
                .length;
            const noStringArrayMatchesLength: number = obfuscatedCode
                .match(regExp2)!
                .length;

            stringArrayProbability = stringArrayMatchesLength / samples;
            noStringArrayProbability = noStringArrayMatchesLength / samples;
        });

        it('Variant #1: should replace literal node value with value from string array with `stringArrayThreshold` chance', () => {
            assert.closeTo(stringArrayProbability, stringArrayThreshold, delta);
        });

        it('Variant #2: shouldn\'t replace literal node value with value from string array with `(1 - stringArrayThreshold)` chance', () => {
            assert.closeTo(noStringArrayProbability, stringArrayThreshold, delta);
        });
    });

    describe('Variant #13: string array calls wrapper name', () => {
        const regExp: RegExp = /console\[b\(0x0\)]\('a'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/string-array-calls-wrapper-name.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                }
            ).getObfuscatedCode();
        });

        it('match #1: should keep identifier with string array calls wrapper name untouched after obfuscation', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #14: `reservedStrings` option is enabled', () => {
        describe('Variant #1: base `reservedStrings` values', () => {
            describe('Variant #1: single reserved string value', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
                const stringLiteralRegExp2: RegExp = /const bar *= *_0x([a-f0-9]){4}\(0x0\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            reservedStrings: ['foo']
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should transform non-reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });

            describe('Variant #2: two reserved string values', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
                const stringLiteralRegExp2: RegExp = /const bar *= *'bar';/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            reservedStrings: ['foo', 'bar']
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });
        });

        describe('Variant #2: RegExp `reservedStrings` values', () => {
            describe('Variant #1: single reserved string value', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *_0x([a-f0-9]){4}\(0x0\);/;
                const stringLiteralRegExp2: RegExp = /const bar *= *'bar';/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            reservedStrings: ['ar$']
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should transform non-reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });

            describe('Variant #2: two reserved string values', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
                const stringLiteralRegExp2: RegExp = /const bar *= *'bar';/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/reserved-strings-option.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            reservedStrings: ['^fo', '.ar']
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should ignore reserved strings', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });
        });
    });

    describe('Variant #15: `forceTransformStrings` option is enabled', () => {
        describe('Variant #1: base `forceTransformStrings` values', () => {
            describe('Variant #1: single force transform string value', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
                const stringLiteralRegExp2: RegExp = /const bar *= *_0x([a-f0-9]){4}\(0x0\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/force-transform-strings-option.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            forceTransformStrings: ['bar'],
                            stringArray: true,
                            stringArrayThreshold: 0
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should not transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should transform force transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });

            describe('Variant #2: two force transform string values', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *_0x([a-f0-9]){4}\(0x0\);/;
                const stringLiteralRegExp2: RegExp = /const bar *= *_0x([a-f0-9]){4}\(0x1\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/force-transform-strings-option.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            forceTransformStrings: ['foo', 'bar'],
                            stringArray: true,
                            stringArrayThreshold: 0
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should transform force transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should transform force transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });
        });

        describe('Variant #2: RegExp `forceTransformStrings` values', () => {
            describe('Variant #1: single force transform string value', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo'/;
                const stringLiteralRegExp2: RegExp = /const bar *= *_0x([a-f0-9]){4}\(0x0\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/force-transform-strings-option.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            forceTransformStrings: ['ar$'],
                            stringArray: true,
                            stringArrayThreshold: 0
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should not transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should transform force transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });

            describe('Variant #2: two force transform string values', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *_0x([a-f0-9]){4}\(0x0\);/;
                const stringLiteralRegExp2: RegExp = /const bar *= *_0x([a-f0-9]){4}\(0x1\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/force-transform-strings-option.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            forceTransformStrings: ['^fo', '.ar'],
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should transform force transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should transform force transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });
        });

        describe('Variant #3: `stringArray` option is disabled', () => {
            describe('Variant #1: base case', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
                const stringLiteralRegExp2: RegExp = /const bar *= *'bar';/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/force-transform-strings-option.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            forceTransformStrings: ['foo', 'bar'],
                            stringArray: false,
                            stringArrayThreshold: 0
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should not transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should not transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });
        });

        describe('Variant #4: Priority over `reservedStrings` option', () => {
            describe('Variant #1: base case', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
                const stringLiteralRegExp2: RegExp = /const bar *= *_0x([a-f0-9]){4}\(0x0\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/force-transform-strings-option.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            forceTransformStrings: ['bar'],
                            reservedStrings: ['foo', 'bar'],
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should not transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });
            });
        });

        describe('Variant #5: Priority on conditional comments', () => {
            describe('Variant #1: base case', () => {
                const stringLiteralRegExp1: RegExp = /const foo *= *'foo';/;
                const stringLiteralRegExp2: RegExp = /const bar *= *'bar';/;
                const stringLiteralRegExp3: RegExp = /const baz *= *_0x([a-f0-9]){4}\(0x0\);/;

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/force-transform-strings-option-conditional-comments.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            forceTransformStrings: ['bar'],
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('match #1: should not transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp1);
                });

                it('match #2: should not transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp2);
                });

                it('match #3: should transform string', () => {
                    assert.match(obfuscatedCode, stringLiteralRegExp3);
                });
            });
        });
    });

    describe('Variant #16: object expression key literal', () => {
        describe('Variant #1: base key literal', () => {
            const stringArrayRegExp: RegExp = getStringArrayRegExp(['bar'])
            const objectExpressionRegExp: RegExp = /var test *= *{'foo' *: *_0x([a-f0-9]){4}\(0x0\)};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/object-expression-key-literal.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should not add object expression key literal to the string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });

            it('match #2: should keep object expression key literal', () => {
                assert.match(obfuscatedCode, objectExpressionRegExp);
            });
        });

        describe('Variant #2: computed key literal', () => {
            const stringArrayRegExp: RegExp = getStringArrayRegExp(['foo', 'bar'])
            const objectExpressionRegExp: RegExp = /var test *= *{\[_0x([a-f0-9]){4}\(0x0\)] *: *_0x([a-f0-9]){4}\(0x1\)};/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/object-expression-computed-key-literal.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should add object expression computed key literal to the string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });

            it('match #2: should replace object expression computed key literal on call to the string array', () => {
                assert.match(obfuscatedCode, objectExpressionRegExp);
            });
        });
    });

    describe('Variant #17: import declaration source literal', () => {
        const importDeclarationRegExp: RegExp = /import *{ *bar *} *from *'foo';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/import-declaration-source.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('Should not add `ImportDeclaration` source literal to the string array', () => {
            assert.match(obfuscatedCode, importDeclarationRegExp);
        });
    });

    describe('Variant #18: export all declaration source literal', () => {
        const exportAllDeclarationRegExp: RegExp = /export *\* *from *'foo';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/export-all-declaration-source.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('Should not add `ExportAllDeclaration` source literal to the string array', () => {
            assert.match(obfuscatedCode, exportAllDeclarationRegExp);
        });
    });

    describe('Variant #19: export named declaration source literal', () => {
        const exportNamedDeclarationRegExp: RegExp = /export *{ *bar *} *from *'foo';/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/export-named-declaration-source.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('Should not add `ExportNamedDeclaration` source literal to the string array', () => {
            assert.match(obfuscatedCode, exportNamedDeclarationRegExp);
        });
    });
});
