/**
 * @param unicodeArrayName
 * @param unicodeArray
 * @returns {string}
 */
export function UnicodeArrayTemplate (unicodeArrayName: string, unicodeArray: string): string {
    return `
        var ${unicodeArrayName} = [${unicodeArray}];
    `;
}
