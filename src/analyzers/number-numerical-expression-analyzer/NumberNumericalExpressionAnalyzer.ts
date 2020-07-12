import { injectable, inject } from 'inversify';

import { TNumberNumericalExpressionData } from '../../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';

import { INumberNumericalExpressionAnalyzer } from '../../interfaces/analyzers/number-numerical-expression-analyzer/INumberNumericalExpressionAnalyzer';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

/**
 * Rework of https://gist.github.com/da411d/0e59f79dcf4603cdabf0024a10eeb6fe
 */
@injectable()
export class NumberNumericalExpressionAnalyzer implements INumberNumericalExpressionAnalyzer {
    /**
     * @type {number}
     */
    private static readonly additionalParts: number = 5;

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
     * @returns {TNumberNumericalExpressionData}
     */
    public analyze (number: number): TNumberNumericalExpressionData {
        if (isNaN(number)) {
            throw new Error('Given value is NaN');
        }

        const additionParts: number[] = this.generateAdditionParts(number);

        return additionParts.map((addition: number) => this.mixWithMultiplyParts(addition));
    }

    /**
     * @param {number} number
     * @returns {number[]}
     */
    private generateAdditionParts (number: number): number[] {
        const additionParts = [];

        const from: number = Math.min(-10000, -Math.abs(number * 2));
        const to: number = Math.max(10000, Math.abs(number * 2));

        let temporarySum = 0;

        for (let i = 0; i < NumberNumericalExpressionAnalyzer.additionalParts; i++) {
            if (i < NumberNumericalExpressionAnalyzer.additionalParts - 1) {
                // trailing parts

                const addition: number = this.randomGenerator.getRandomInteger(from, to);

                additionParts.push(addition);
                temporarySum += addition;
            } else {
                // last part

                additionParts.push(number - temporarySum);
            }
        }

        return additionParts;
    }

    /**
     * @param {number} number
     * @returns {number | number[]}
     */
    private mixWithMultiplyParts (number: number): number | number[] {
        const dividers: number[] = this.getDividers(number);

        const shouldMixWithMultiplyParts: boolean = this.randomGenerator.getMathRandom() > 0.5;

        if (!shouldMixWithMultiplyParts || !dividers.length) {
            return number;
        }

        const divider = dividers[
            this.randomGenerator.getRandomInteger(0, dividers.length - 1)
        ];

        return [divider, number / divider];
    }

    /**
     * @param {number} number
     * @returns {number[]}
     */
    private getDividers (number: number): number[] {
        const dividers: number[] = [];

        number = Math.abs(number);

        for (let i = 2; i < number; i++) {
            if (number % i === 0){
                dividers.push(i);
            }
        }

        return dividers;
    }
}
