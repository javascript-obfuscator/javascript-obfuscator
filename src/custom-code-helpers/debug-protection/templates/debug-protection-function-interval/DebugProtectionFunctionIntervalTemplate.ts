/**
 * @returns {string}
 */
export function DebugProtectionFunctionIntervalTemplate (): string {
    return `
        (function () {
            {globalVariableTemplate}
    
            that.setInterval({debugProtectionFunctionName}, {debugProtectionInterval});
        })();
    `;
}
