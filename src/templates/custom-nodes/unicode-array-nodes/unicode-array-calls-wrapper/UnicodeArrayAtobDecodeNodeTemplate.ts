/**
 * @returns {string}
 */
export function UnicodeArrayAtobDecodeNodeTemplate (): string {
    return `
        var decodedIndices = [];
    
        if (decodedIndices.indexOf(index) === -1) {
            value = atob(value);
        }
    `;
}
