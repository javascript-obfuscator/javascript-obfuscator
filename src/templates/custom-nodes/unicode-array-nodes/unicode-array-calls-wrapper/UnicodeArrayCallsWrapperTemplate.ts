/**
 * @returns {string}
 */
export function UnicodeArrayCallsWrapperTemplate (): string {
    return `
        var {unicodeArrayCallsWrapperName} = function ({keyName}) {
            return {unicodeArrayName}[parseInt({keyName}, 0x010)];
        };
    `;
}
