/**
 * @returns {string}
 */
export function StringArrayCallsWrapperTemplate (): string {
    return `
         function {stringArrayCallsWrapperName} (index, key) {
            index = index - {indexShiftAmount};
            
            let value = {stringArrayName}[index];
            
            {decodeCodeHelperTemplate}
        
            return value;
        }
    `;
}
