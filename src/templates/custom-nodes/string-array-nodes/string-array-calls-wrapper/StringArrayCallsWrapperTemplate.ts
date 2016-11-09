/**
 * @returns {string}
 */
export function StringArrayCallsWrapperTemplate (): string {
    return `
        var {stringArrayCallsWrapperName} = function (index, key) {
            var index = parseInt(index, 0x10);
            var value = {stringArrayName}[index];
            
            {decodeNodeTemplate}
        
            return value;
        };
    `;
}
