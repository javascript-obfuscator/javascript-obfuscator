/**
 * @returns {string}
 */
export function StringArrayCallsWrapperTemplate (): string {
    return `
        const {stringArrayCallsWrapperName} = function (index, key) {
            index = index - 0;
            
            let value = {stringArrayName}[index];
            
            {decodeCodeHelperTemplate}
        
            return value;
        };
    `;
}
