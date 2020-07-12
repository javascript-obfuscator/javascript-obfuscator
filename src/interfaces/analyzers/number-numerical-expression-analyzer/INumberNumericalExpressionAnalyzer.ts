import { TNumberNumericalExpressionData } from '../../../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';

export interface INumberNumericalExpressionAnalyzer {
    /**
     * @param {number} number
     * @returns {TNumberNumericalExpressionData}
     */
    analyze (number: number): TNumberNumericalExpressionData;
}
