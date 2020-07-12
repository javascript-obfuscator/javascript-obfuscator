import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { readFileAsString } from '../../../../helpers/readFileAsString';

describe('NumbersToNumericalExpressionsTransformer', function () {
    this.timeout(60000);

    describe('Variant #1: base', () => {
        const initialNumber: number = -50;
        const lastNumber: number = 50;

        let areValidExpressions: boolean = true;

        before(() => {
            for (let i = initialNumber; i < lastNumber; i++) {
                const number: number = i;
                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    `${number};`,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        numbersToExpressions: true
                    }
                ).getObfuscatedCode();

                const result: number = eval(obfuscatedCode);

                if (result !== number) {
                    areValidExpressions = false;
                    break;
                }
            }
        });

        it('should correctly transform numbers to expressions', () => {
            assert.isTrue(areValidExpressions);
        });
    });

    describe('Variant #2: safe integers', () => {
        describe('Variant #1: max safe integer', () => {
            const number: number = Number.MAX_SAFE_INTEGER;
            const samplesCount: number = 15;

            let areValidExpressions: boolean = true;

            before(() => {
                for (let i = 0; i < samplesCount; i++) {
                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        `${number};`,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            numbersToExpressions: true
                        }
                    ).getObfuscatedCode();

                    const result: number = eval(obfuscatedCode);

                    if (result !== number) {
                        areValidExpressions = false;
                        break;
                    }
                }
            });

            it('should correctly transform numbers to expressions', () => {
                assert.isTrue(areValidExpressions);
            });
        });

        describe('Variant #2: max unsafe integer', () => {
            const unsafeIntegerRegExp: RegExp = /0x20000000000000;/;
            const number: number = Number.MAX_SAFE_INTEGER + 1;

            let obfuscatedCode: string;

            before(() => {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    `${number};`,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        numbersToExpressions: true
                    }
                ).getObfuscatedCode();
            });

            it('should not transform unsafe integer to expressions', () => {
                assert.match(obfuscatedCode, unsafeIntegerRegExp);
            });
        });

        describe('Variant #3: min safe integer', () => {
            const number: number = Number.MIN_SAFE_INTEGER;
            const samplesCount: number = 15;

            let areValidExpressions: boolean = true;

            before(() => {
                for (let i = 0; i < samplesCount; i++) {
                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        `${number};`,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            numbersToExpressions: true
                        }
                    ).getObfuscatedCode();

                    const result: number = eval(obfuscatedCode);

                    if (result !== number) {
                        areValidExpressions = false;
                        break;
                    }
                }
            });

            it('should correctly transform numbers to expressions', () => {
                assert.isTrue(areValidExpressions);
            });
        });

        describe('Variant #4: min unsafe integer', () => {
            const unsafeIntegerRegExp: RegExp = /-0x20000000000000;/;
            const number: number = Number.MIN_SAFE_INTEGER - 1;

            let obfuscatedCode: string;

            before(() => {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    `${number};`,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        numbersToExpressions: true
                    }
                ).getObfuscatedCode();
            });

            it('should not transform unsafe integer to expressions', () => {
                assert.match(obfuscatedCode, unsafeIntegerRegExp);
            });
        });
    });

    describe('Variant #3: parent node is non-computed object property', () => {
        const regExp: RegExp = /const foo *= *{1: *'bar'};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/non-computed-object-key.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    numbersToExpressions: true
                }
            ).getObfuscatedCode();
        });

        it('should not replace non-computed object property literal with expression', () => {
            assert.match(obfuscatedCode,  regExp);
        });
    });

    describe('Variant #4: parent node is member expression', () => {
        const regExp: RegExp = /\((?:-?0x[a-zA-Z0-9]+(?: *[+\-*] *)?)*?\)\['toString']\(\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/member-expression.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    numbersToExpressions: true
                }
            ).getObfuscatedCode();
        });

        it('should replace member expression with literal object with expression', () => {
            assert.match(obfuscatedCode,  regExp);
        });
    });
});
