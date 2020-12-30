import { TNumberNumericalExpressionData } from '../../../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';

import { IAnalyzer } from '../IAnalyzer';

export interface INumberNumericalExpressionAnalyzer extends IAnalyzer<[number, number], TNumberNumericalExpressionData> {
    /**
     * @param {number} number
     * @param {number} additionalPartsCount
     * @returns {TNumberNumericalExpressionData}
     */
    analyze (
        number: number,
        additionalPartsCount: number
    ): TNumberNumericalExpressionData;
}
