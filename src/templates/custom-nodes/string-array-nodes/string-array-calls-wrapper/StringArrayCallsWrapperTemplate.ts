/**
 * @returns {string}
 */
export function StringArrayCallsWrapperTemplate (): string {
    return `
        var {stringArrayCallsWrapperName} = function (index, key) {
            index = index - 0;
            
            var value = {stringArrayName}[index];
            
            {decodeNodeTemplate}
        
            return value;
        };
    `;
}
