import { assert } from 'chai';

import { NumberUtils } from '../../../src/utils/NumberUtils';

describe('NumberUtils', function () {
    this.timeout(30000);

    describe('toHex', () => {
        describe('Variant #1: number `0`', () => {
            const number: number = 0;
            const expectedHexString = '0x0';

            let hexString: string;

            before(() => {
                hexString = NumberUtils.toHex(number);
            });

            it('should create a string with hexadecimal value from a given decimal number', () => {
                assert.equal(hexString, expectedHexString);
            });
        });

        describe('Variant #2: number `10`', () => {
            const number: number = 10;
            const expectedHexString = '0xa';

            let hexString: string;

            before(() => {
                hexString = NumberUtils.toHex(number);
            });

            it('should create a string with hexadecimal value from a given decimal number', () => {
                assert.equal(hexString, expectedHexString);
            });
        });

        describe('Variant #3: number `17`', () => {
            const number: number = 17;
            const expectedHexString = '0x11';

            let hexString: string;

            before(() => {
                hexString = NumberUtils.toHex(number);
            });

            it('should create a string with hexadecimal value from a given decimal number', () => {
                assert.equal(hexString, expectedHexString);
            });
        });

        describe('Variant #4: number `536870912`', () => {
            const number: number = 536870912;
            const expectedHexString = '0x20000000';

            let hexString: string;

            before(() => {
                hexString = NumberUtils.toHex(number);
            });

            it('should create a string with hexadecimal value from a given decimal number', () => {
                assert.equal(hexString, expectedHexString);
            });
        });

        describe('Variant #5: bigint number `10n`', () => {
            // @ts-ignore
            const number: bigint = 10n;
            const expectedHexString = '0xan';

            let hexString: string;

            before(() => {
                hexString = NumberUtils.toHex(number);
            });

            it('should create a string with hexadecimal value from a given bigint number', () => {
                assert.equal(hexString, expectedHexString);
            });
        });
    });

    describe('extractIntegerAndDecimalParts', () => {
        describe('Variant #1: number `0`', () => {
            const number: number = 0;
            const expectedParts: [number, number | null] = [0, null];

            let parts: [number, number | null];

            before(() => {
                parts = NumberUtils.extractIntegerAndDecimalParts(number);
            });

            it('should extract integer and decimal parts', () => {
                assert.deepEqual(parts, expectedParts);
            });
        });

        describe('Variant #2: number `10`', () => {
            const number: number = 10;
            const expectedParts: [number, number | null] = [10, null];

            let parts: [number, number | null];

            before(() => {
                parts = NumberUtils.extractIntegerAndDecimalParts(number);
            });

            it('should extract integer and decimal parts', () => {
                assert.deepEqual(parts, expectedParts);
            });
        });

        describe('Variant #3: number `-17`', () => {
            const number: number = -17;
            const expectedParts: [number, number | null] = [-17, null];

            let parts: [number, number | null];

            before(() => {
                parts = NumberUtils.extractIntegerAndDecimalParts(number);
            });

            it('should extract integer and decimal parts', () => {
                assert.deepEqual(parts, expectedParts);
            });
        });

        describe('Variant #4: number `0.0000000001`', () => {
            const number: number = 0.0000000001;
            const expectedParts: [number, number | null] = [0, 0.0000000001];

            let parts: [number, number | null];

            before(() => {
                parts = NumberUtils.extractIntegerAndDecimalParts(number);
            });

            it('should extract integer and decimal parts', () => {
                assert.deepEqual(parts, expectedParts);
            });

            it('should return an initial number after sum of extracted parts', () => {
                assert.equal(number, parts[0] + parts[1]!);
            });
        });

        describe('Variant #5: number `10.0002`', () => {
            const number: number = 10.0002;
            const expectedParts: [number, number | null] = [10, 0.00019999999999953388];

            let parts: [number, number | null];

            before(() => {
                parts = NumberUtils.extractIntegerAndDecimalParts(number);
            });

            it('should extract integer and decimal parts (with inaccuracy of float numbers)', () => {
                assert.deepEqual(parts, expectedParts);
            });

            it('should return an initial number after sum of extracted parts', () => {
                assert.equal(number, parts[0] + parts[1]!);
            });
        });

        describe('Variant #6: number `1e-13`', () => {
            const number: number = 1e-13;
            const expectedParts: [number, number | null] = [0, 1e-13];

            let parts: [number, number | null];

            before(() => {
                parts = NumberUtils.extractIntegerAndDecimalParts(number);
            });

            it('should extract integer and decimal parts', () => {
                assert.deepEqual(parts, expectedParts);
            });

            it('should return an initial number after sum of extracted parts', () => {
                assert.equal(number, parts[0] + parts[1]!);
            });
        });

        describe('Variant #7: number `-1e-100`', () => {
            const number: number = -1e-100;
            const expectedParts: [number, number | null] = [-0, -1e-100];

            let parts: [number, number | null];

            before(() => {
                parts = NumberUtils.extractIntegerAndDecimalParts(number);
            });

            it('should extract integer and decimal parts', () => {
                assert.deepEqual(parts, expectedParts);
            });

            it('should return an initial number after sum of extracted parts', () => {
                assert.equal(number, parts[0] + parts[1]!);
            });
        });
    });

    describe('isCeil', () => {
        describe('given number is a ceil', () => {
            const number: number = 4;
            const expectedResult: boolean = true;

            let result: boolean;

            before(() => {
                result = NumberUtils.isCeil(number);
            });

            it('should return true', () => {
                assert.equal(result, expectedResult);
            });
        });

        describe('given number is a float', () => {
            const number: number = 4.5;
            const expectedResult: boolean = false;

            let result: boolean;

            before(() => {
                result = NumberUtils.isCeil(number);
            });

            it('should return false', () => {
                assert.equal(result, expectedResult);
            });
        });

        describe('bigint number', () => {
            // @ts-ignore
            const number: bigint = 10n;
            const expectedResult: boolean = true;

            let result: boolean;

            before(() => {
                result = NumberUtils.isCeil(number);
            });

            it('should return true', () => {
                assert.equal(result, expectedResult);
            });
        });
    });

    describe('isPositive', () => {
        describe('Variant #1: positive integer', () => {
            const number: number = 2;
            const expectedResult: boolean = true;

            let result: boolean;

            before(() => {
                result = NumberUtils.isPositive(number);
            });

            it('should return true', () => {
                assert.equal(result, expectedResult);
            });
        });

        describe('Variant #2: positive zero', () => {
            const number: number = 0;
            const expectedResult: boolean = true;

            let result: boolean;

            before(() => {
                result = NumberUtils.isPositive(number);
            });

            it('should return true', () => {
                assert.equal(result, expectedResult);
            });
        });

        describe('Variant #3: negative integer', () => {
            const number: number = -2;
            const expectedResult: boolean = false;

            let result: boolean;

            before(() => {
                result = NumberUtils.isPositive(number);
            });

            it('should return false', () => {
                assert.equal(result, expectedResult);
            });
        });

        describe('Variant #4: negative zero', () => {
            const number: number = -0;
            const expectedResult: boolean = false;

            let result: boolean;

            before(() => {
                result = NumberUtils.isPositive(number);
            });

            it('should return false', () => {
                assert.equal(result, expectedResult);
            });
        });

        describe('Variant #5: NaN', () => {
            const number: number = NaN;

            let testFunc: () => void;

            before(() => {
                testFunc = () => NumberUtils.isPositive(number);
            });

            it('should throw an error', () => {
                assert.throw(testFunc, 'Given value is NaN');
            });
        });
    });

    describe('isUnsafeNumber', () => {
        describe('Positive number', () => {
            describe('Variant #1: positive small safe integer', () => {
                const number: number = 100;
                const expectedResult: boolean = false

                let result: boolean;

                before(() => {
                    result = NumberUtils.isUnsafeNumber(number);
                });

                it('should return false', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #2: positive big safe integer', () => {
                const number: number = Number.MAX_SAFE_INTEGER;
                const expectedResult: boolean = false

                let result: boolean;

                before(() => {
                    result = NumberUtils.isUnsafeNumber(number);
                });

                it('should return false', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #3: positive unsafe integer', () => {
                const number: number = Number.MAX_SAFE_INTEGER + 1;
                const expectedResult: boolean = true

                let result: boolean;

                before(() => {
                    result = NumberUtils.isUnsafeNumber(number);
                });

                it('should return true', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });

        describe('Negative number', () => {
            describe('Variant #1: negative small safe integer', () => {
                const number: number = -100;
                const expectedResult: boolean = false

                let result: boolean;

                before(() => {
                    result = NumberUtils.isUnsafeNumber(number);
                });

                it('should return false', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #2: negative big safe integer', () => {
                const number: number = Number.MIN_SAFE_INTEGER;
                const expectedResult: boolean = false

                let result: boolean;

                before(() => {
                    result = NumberUtils.isUnsafeNumber(number);
                });

                it('should return false', () => {
                    assert.equal(result, expectedResult);
                });
            });

            describe('Variant #3: negative unsafe integer', () => {
                const number: number = Number.MIN_SAFE_INTEGER - 1;
                const expectedResult: boolean = true

                let result: boolean;

                before(() => {
                    result = NumberUtils.isUnsafeNumber(number);
                });

                it('should return true', () => {
                    assert.equal(result, expectedResult);
                });
            });
        });

        describe('NaN', () => {
            const number: number = NaN;

            let testFunc: () => void;

            before(() => {
                testFunc = () => NumberUtils.isUnsafeNumber(number);
            });

            it('should throw an error', () => {
                assert.throw(testFunc, 'Given value is NaN');
            });
        });
    });

    describe('getFactors', () => {
        describe('Positive numbers', () => {
            describe('Variant #1: positive number `1`', () => {
                const number: number = 1;
                const expectedFactors: number[] = [
                    -1,
                    1
                ];

                let factors: number[];

                before(() => {
                    factors = NumberUtils.getFactors(number);
                });

                it('should return factors of a number', () => {
                    assert.deepEqual(factors, expectedFactors);
                });
            });

            describe('Variant #2: positive number `2`', () => {
                const number: number = 2;
                const expectedFactors: number[] = [
                    -2,
                    -1,
                    1,
                    2
                ];

                let factors: number[];

                before(() => {
                    factors = NumberUtils.getFactors(number);
                });

                it('should return factors of a number', () => {
                    assert.deepEqual(factors, expectedFactors);
                });
            });

            describe('Variant #3: positive number `100`', () => {
                const number: number = 100;
                const expectedFactors: number[] = [
                    -100,
                    -50,
                    -25,
                    -20,
                    -10,
                    -5,
                    -4,
                    -2,
                    -1,
                    1,
                    2,
                    4,
                    5,
                    10,
                    20,
                    25,
                    50,
                    100
                ];

                let factors: number[];

                before(() => {
                    factors = NumberUtils.getFactors(number);
                });

                it('should return factors of a number', () => {
                    assert.deepEqual(factors, expectedFactors);
                });
            });

            describe('Variant #4: positive number `9007199254740991`', () => {
                const number: number = 9007199254740991;
                const expectedFactors: number[] = [
                    Number.MIN_SAFE_INTEGER,
                    -1416003655831,
                    -129728784761,
                    -441650591,
                    -20394401,
                    -69431,
                    -6361,
                    -1,
                    1,
                    6361,
                    69431,
                    20394401,
                    441650591,
                    129728784761,
                    1416003655831,
                    Number.MAX_SAFE_INTEGER
                ];

                let factors: number[];

                before(() => {
                    factors = NumberUtils.getFactors(number);
                });

                it('should return factors of a number', () => {
                    assert.deepEqual(factors, expectedFactors);
                });
            });
        })

        describe('Negative numbers', () => {
            describe('Variant #1: negative number `-1`', () => {
                const number: number = -1;
                const expectedFactors: number[] = [
                    -1,
                    1
                ];

                let factors: number[];

                before(() => {
                    factors = NumberUtils.getFactors(number);
                });

                it('should return factors of a number', () => {
                    assert.deepEqual(factors, expectedFactors);
                });
            });

            describe('Variant #2: negative number `-2`', () => {
                const number: number = -2;
                const expectedFactors: number[] = [
                    -2,
                    -1,
                    1,
                    2
                ];

                let factors: number[];

                before(() => {
                    factors = NumberUtils.getFactors(number);
                });

                it('should return factors of a number', () => {
                    assert.deepEqual(factors, expectedFactors);
                });
            });

            describe('Variant #3: negative number `-100`', () => {
                const number: number = -100;
                const expectedFactors: number[] = [
                    -100,
                    -50,
                    -25,
                    -20,
                    -10,
                    -5,
                    -4,
                    -2,
                    -1,
                    1,
                    2,
                    4,
                    5,
                    10,
                    20,
                    25,
                    50,
                    100
                ];

                let factors: number[];

                before(() => {
                    factors = NumberUtils.getFactors(number);
                });

                it('should return factors of a number', () => {
                    assert.deepEqual(factors, expectedFactors);
                });
            });

            describe('Variant #4: negative number `-9007199254740991`', () => {
                const number: number = -9007199254740991;
                const expectedFactors: number[] = [
                    Number.MIN_SAFE_INTEGER,
                    -1416003655831,
                    -129728784761,
                    -441650591,
                    -20394401,
                    -69431,
                    -6361,
                    -1,
                    1,
                    6361,
                    69431,
                    20394401,
                    441650591,
                    129728784761,
                    1416003655831,
                    Number.MAX_SAFE_INTEGER
                ];

                let factors: number[];

                before(() => {
                    factors = NumberUtils.getFactors(number);
                });

                it('should return factors of a number', () => {
                    assert.deepEqual(factors, expectedFactors);
                });
            });
        })

        describe('zero number', () => {
            const number: number = 0;

            let testFunc: () => void;

            before(() => {
                testFunc = () => NumberUtils.getFactors(number);
            });

            it('should throw an error', () => {
                assert.throw(testFunc, Error);
            });
        })
    });
});
