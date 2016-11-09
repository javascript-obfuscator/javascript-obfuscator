/**
 * @returns {string}
 */
export function StringArrayRotateFunctionTemplate (): string {
    return `
        (function (array, {timesName}) {
            var {whileFunctionName} = function (times) {
                while (--times) {
                    array['push'](array['shift']());
                }
            };
            
            {code}
        })({stringArrayName}, 0x{stringArrayRotateValue});
    `;
}
