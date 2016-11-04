/**
 * @returns {string}
 */
export function UnicodeArrayCallsWrapperTemplate (): string {
    return `
        var {unicodeArrayCallsWrapperName} = function (index, key) {
            var index = parseInt(index, 0x10);
            var value = {unicodeArrayName}[index];
            
            {decodeNodeTemplate}
        
            return value;
        };
    `;
}
