import { TNumberNumericalExpressionData } from '../../../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';

import { IAnalyzer } from '../IAnalyzer';

export interface INumberNumericalExpressionAnalyzer extends IAnalyzer<[number], TNumberNumericalExpressionData> {
    /**
     * @param {number} number
     * @returns {TNumberNumericalExpressionData}
     */
    analyze (number: number): TNumberNumericalExpressionData;
}
