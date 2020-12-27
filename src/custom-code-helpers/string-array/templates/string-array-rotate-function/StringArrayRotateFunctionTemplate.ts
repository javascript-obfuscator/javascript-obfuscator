/**
 * @returns {string}
 */
export function StringArrayRotateFunctionTemplate (): string {
    return `
        (function (array, comparisonValue) {
            array[-1] = true;

            while (true) {
                try {
                    const expression = {comparisonExpressionCode};
                                            
                    if (expression === comparisonValue) {
                        array[-1] = false;
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
