/**
 * @returns {string}
 */
export function StringArrayRotateFunctionTemplate (): string {
    return `
        (function (array, {timesName}) {
            const {whileFunctionName} = function (times) {
                while (--times) {
                    array['push'](array['shift']());
                }
            };
            
            {code}
        })({stringArrayName}, 0x{stringArrayRotationAmount});
    `;
}
