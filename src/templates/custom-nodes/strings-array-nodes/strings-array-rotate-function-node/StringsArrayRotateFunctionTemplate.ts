/**
 * @returns {string}
 */
export function StringsArrayRotateFunctionTemplate (): string {
    return `
        (function (array, {timesName}) {
            var {whileFunctionName} = function (times) {
                while (--times) {
                    array['push'](array['shift']());
                }
            };
            
            {code}
        })({stringsArrayName}, 0x{stringsArrayRotateValue});
    `;
}
