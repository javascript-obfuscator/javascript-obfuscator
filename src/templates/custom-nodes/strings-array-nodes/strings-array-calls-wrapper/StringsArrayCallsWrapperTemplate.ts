/**
 * @returns {string}
 */
export function StringsArrayCallsWrapperTemplate (): string {
    return `
        var {stringsArrayCallsWrapperName} = function (index, key) {
            var index = parseInt(index, 0x10);
            var value = {stringsArrayName}[index];
            
            {decodeNodeTemplate}
        
            return value;
        };
    `;
}
