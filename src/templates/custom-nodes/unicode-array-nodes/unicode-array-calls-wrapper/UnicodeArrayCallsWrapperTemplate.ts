/**
 * @returns {string}
 */
export function UnicodeArrayCallsWrapperTemplate (): string {
    return `
        var {unicodeArrayCallsWrapperName} = function (index, key) {
            var value = {unicodeArrayName}[parseInt(index, 0x010)]
            
            {decodeNodeTemplate}
        
            return value;
        };
    `;
}
