/**
 * @returns {string}
 */
export function StringArrayRotateFunctionTemplate (): string {
    return `
        (function (array, comparisonValue) {
            while (true) {
                try {
                    const expression = {comparisonExpressionCode};
                                            
                    if (expression === comparisonValue) {
                        break;
                    } else {
                        array['push'](array['shift']());
                    }
                } catch (e) {
                    array['push'](array['shift']());
                }
            }
        })({stringArrayName}, {comparisonValue});
    `;
}
