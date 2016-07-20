import { Utils } from "../../../../Utils";

/**
 * @param unicodeArrayCallsWrapperName
 * @param unicodeArrayName
 * @returns {string}
 */
export function UnicodeArrayCallsWrapperTemplate (unicodeArrayCallsWrapperName: string, unicodeArrayName: string): string {
    let keyName: string = Utils.getRandomVariableName();

    return `
        var ${unicodeArrayCallsWrapperName} = function (${keyName}) {
            return ${unicodeArrayName}[parseInt(${keyName}, 0x010)];
        };
    `;
}
