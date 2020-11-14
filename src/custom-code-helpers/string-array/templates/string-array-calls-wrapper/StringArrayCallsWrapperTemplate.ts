/**
 * @returns {string}
 */
export function StringArrayCallsWrapperTemplate (): string {
    return `
        const {stringArrayCallsWrapperName} = function (index, key) {
            index = index - {indexShiftAmount};
            
            let value = {stringArrayName}[index];
            
            {decodeCodeHelperTemplate}
        
            return value;
        };
    `;
}
