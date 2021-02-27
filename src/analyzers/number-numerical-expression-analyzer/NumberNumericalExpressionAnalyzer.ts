import { injectable, inject } from 'inversify';

import { TNumberNumericalExpressionData } from '../../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';

import { INumberNumericalExpressionAnalyzer } from '../../interfaces/analyzers/number-numerical-expression-analyzer/INumberNumericalExpressionAnalyzer';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { NumberUtils } from '../../utils/NumberUtils';

/**
 * Based on https://gist.github.com/da411d/0e59f79dcf4603cdabf0024a10eeb6fe
 */
@injectable()
export class NumberNumericalExpressionAnalyzer implements INumberNumericalExpressionAnalyzer {
    /**
     * @type {number}
     */
    public static readonly defaultAdditionalPartsCount: number = 3;

    /**
     * @type {number}
     */
    private static readonly delta: number = 10000;

    /**
     * @type {Map<number, number[]>}
     */
    private readonly numberFactorsMap: Map<number, number[]> = new Map();

    /**
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator
    ) {
        this.randomGenerator = randomGenerator;
    }

    /**
     * @param {number} number
     * @param {number} additionalPartsCount
     * @returns {TNumberNumericalExpressionData}
     */
    public analyze (
        number: number,
        additionalPartsCount: number
    ): TNumberNumericalExpressionData {
        if (isNaN(number)) {
            throw new Error('Given value is NaN');
        }

        if (NumberUtils.isUnsafeNumber(number)) {
            return [number];
        }

        const additionParts: number[] = this.generateAdditionParts(number, additionalPartsCount);

        return additionParts.map((addition: number) => this.mixWithMultiplyParts(addition));
    }

    /**
     * @param {number} number
     * @param {number} additionalPartsCount
     * @returns {number[]}
     */
    private generateAdditionParts (number: number, additionalPartsCount: number): number[] {
        const additionParts = [];

        const upperNumberLimit: number = Math.min(Math.abs(number * 2), Number.MAX_SAFE_INTEGER);

        const from: number = Math.min(-NumberNumericalExpressionAnalyzer.delta, -upperNumberLimit);
        const to: number = Math.max(NumberNumericalExpressionAnalyzer.delta, upperNumberLimit);

        let temporarySum = 0;

        for (let i = 0; i < additionalPartsCount; i++) {
            if (i < additionalPartsCount - 1) {
                // trailing parts

                let addition: number = this.randomGenerator.getRandomInteger(from, to);
                const isUnsafeCombination: boolean = NumberUtils.isUnsafeNumber(temporarySum + addition);

                // we have to flip sign if total expression sum overflows over safe integer limits
                if (isUnsafeCombination) {
                    addition = -addition;
                }

                additionParts.push(addition);
                temporarySum += addition;
            } else {
                const combination: number = number - temporarySum;
                const isUnsafeCombination: boolean = NumberUtils.isUnsafeNumber(combination);

                // last part
                if (isUnsafeCombination) {
                    additionParts.push(0 - temporarySum);
                    additionParts.push(number);
                } else {
                    additionParts.push(combination);
                }
            }
        }

        return additionParts;
    }

    /**
     * @param {number} number
     * @returns {number | number[]}
     */
    private mixWithMultiplyParts (number: number): number | number[] {
        const shouldMixWithMultiplyParts: boolean = this.randomGenerator.getMathRandom() > 0.5;

        if (!shouldMixWithMultiplyParts || number === 0) {
            return number;
        }

        let factors: number[] | null = this.numberFactorsMap.get(number) ?? null;

        if (!factors) {
           factors = NumberUtils.getFactors(number);
           this.numberFactorsMap.set(number, factors);
        }

        if (!factors.length) {
            return number;
        }

        const factor: number = factors[this.randomGenerator.getRandomInteger(0, factors.length - 1)];

        return [factor, number / factor];
    }
}
