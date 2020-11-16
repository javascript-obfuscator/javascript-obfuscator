/**
 * Evaluates code passed amount time
 *
 * @param {() => string} codeGetterFunction
 * @param {number} runsAmount
 * @param expectedResult
 * @returns {{areSuccessEvaluations: boolean, errorMessage?: string}}
 */
export function checkCodeEvaluation (
    codeGetterFunction: () => string,
    runsAmount: number,
    expectedResult?: any
): {
    areSuccessEvaluations: boolean;
    errorMessage?: string;
} {
    for (let i = 0; i < runsAmount; i++) {
        try {
            const result = eval(codeGetterFunction());

            if (expectedResult !== undefined && result !== expectedResult) {
                return {
                    areSuccessEvaluations: false,
                    errorMessage: `Invalid evaluation result: ${result}. Expected: ${expectedResult}`
                };
            }
        } catch (error) {
            return {
                areSuccessEvaluations: false,
                errorMessage: error.message
            };
        }
    }

    return {
        areSuccessEvaluations: true
    };
}