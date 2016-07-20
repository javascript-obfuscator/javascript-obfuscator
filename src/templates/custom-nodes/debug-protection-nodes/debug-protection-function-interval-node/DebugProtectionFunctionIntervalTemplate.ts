/**
 * @param debugProtectionFunctionName
 * @returns {string}
 */
export function DebugProtectionFunctionIntervalTemplate (debugProtectionFunctionName: string): string {
    return `
        setInterval(function () {
            ${debugProtectionFunctionName}();
        }, 4000);
    `;
}
