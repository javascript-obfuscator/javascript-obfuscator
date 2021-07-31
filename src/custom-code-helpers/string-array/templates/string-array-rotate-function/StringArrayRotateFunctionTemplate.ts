/**
 * @returns {string}
 */
export function StringArrayRotateFunctionTemplate (): string {
    return `
        (function (stringArrayFunction, comparisonValue) {
            const stringArray = stringArrayFunction();
        
            while (true) {
                try {
                    const expression = {comparisonExpressionCode};
                                            
                    if (expression === comparisonValue) {
                        break;
                    } else {
                        stringArray['push'](stringArray['shift']());
                    }
                } catch (e) {
                    stringArray['push'](stringArray['shift']());
                }
            }
        })({stringArrayFunctionName}, {comparisonValue});
    `;
}
