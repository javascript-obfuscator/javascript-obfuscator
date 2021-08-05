/**
 * @returns {string}
 */
export function StringArrayTemplate (): string {
    return `
        function {stringArrayFunctionName} () {
            const {stringArrayName} = [{stringArrayStorageItems}];
            
            {stringArrayFunctionName} = function () {
                return {stringArrayName};
            };
            
            return {stringArrayFunctionName}();
        }
    `;
}
