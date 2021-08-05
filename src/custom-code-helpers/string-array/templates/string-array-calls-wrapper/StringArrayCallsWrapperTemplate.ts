/**
 * The first parameter of the outer stringArrayCallsWrapperName function will be used as an initial index
 * and later as a cache variable that will be captured by the inner function
 *
 * @returns {string}
 */
export function StringArrayCallsWrapperTemplate (): string {
    return `
        function {stringArrayCallsWrapperName} ({stringArrayCacheName}, key) {
            const stringArray = {stringArrayFunctionName}();
            
            {stringArrayCallsWrapperName} = function (index, key) {
                index = index - {indexShiftAmount};
                
                let value = stringArray[index];
                
                {decodeCodeHelperTemplate}
            
                return value;
            };
         
            return {stringArrayCallsWrapperName}({stringArrayCacheName}, key);
        }
    `;
}
