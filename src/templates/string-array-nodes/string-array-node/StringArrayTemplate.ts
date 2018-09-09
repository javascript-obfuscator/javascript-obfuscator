/**
 * @returns {string}
 */
export function StringArrayTemplate (): string {
    return `
        function {stringArrayName} () {
            return [{stringArray}];
        }
        {selfDefendingCode}
        {stringArrayName} = {stringArrayName}();
    `;
}
