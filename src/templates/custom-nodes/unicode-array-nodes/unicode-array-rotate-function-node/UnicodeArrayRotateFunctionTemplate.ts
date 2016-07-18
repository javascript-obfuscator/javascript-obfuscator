import { Utils } from "../../../../Utils";

/**
 * @param code
 * @param unicodeArrayName
 * @param unicodeArrayRotateValue
 * @param whileFunctionName
 * @param timesName
 * @returns {string}
 */
export function UnicodeArrayRotateFunctionTemplate (
    code: string,
    unicodeArrayName: string,
    unicodeArrayRotateValue: number,
    whileFunctionName: string,
    timesName: string
): string {
    let arrayName: string = Utils.getRandomVariableName(),
        timesArgumentName: string = Utils.getRandomVariableName();

    return `
        (function (${arrayName}, ${timesName}) {
            var ${whileFunctionName} = function (${timesArgumentName}) {
                while (--${timesArgumentName}) {
                    ${arrayName}[${Utils.stringToUnicode('push')}](${arrayName}[${Utils.stringToUnicode('shift')}]());
                }
            };
            
            ${code}
        })(${unicodeArrayName}, 0x${Utils.decToHex(unicodeArrayRotateValue)});
    `;
}
