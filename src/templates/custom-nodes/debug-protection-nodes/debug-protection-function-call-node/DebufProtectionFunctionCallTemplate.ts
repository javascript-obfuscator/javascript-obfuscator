/**
 * @param debugProtectionFunctionName
 * @returns {string}
 */
export function DebugProtectionFunctionCallTemplate (debugProtectionFunctionName: string): string {
    return `
        ${debugProtectionFunctionName}();
    `;
}
