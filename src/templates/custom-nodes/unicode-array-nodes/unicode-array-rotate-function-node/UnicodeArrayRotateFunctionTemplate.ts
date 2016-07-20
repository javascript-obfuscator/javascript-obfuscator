/**
 * @returns {string}
 */
export function UnicodeArrayRotateFunctionTemplate (): string {
    return `
        (function (array, {timesName}) {
            var {whileFunctionName} = function (times) {
                while (--times) {
                    array['push'](array['shift']());
                }
            };
            
            {code}
        })({unicodeArrayName}, 0x{unicodeArrayRotateValue});
    `;
}
