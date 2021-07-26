/**
 * @returns {string}
 */
export function StringArrayTemplate (): string {
    return `
        const {stringArrayFunctionName} = function () {
            return [{stringArrayStorageItems}];
        };
        
        const {stringArrayName} = {stringArrayFunctionName}();
    `;
}
