/**
 * @returns {string}
 */
export function DebugProtectionFunctionIntervalTemplate (): string {
    return `
        setInterval(function () {
            {debugProtectionFunctionName}();
        }, 4000);
    `;
}
