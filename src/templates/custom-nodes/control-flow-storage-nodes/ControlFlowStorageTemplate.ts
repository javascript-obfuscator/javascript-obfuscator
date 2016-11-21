/**
 * @returns {string}
 */
export function ControlFlowStorageTemplate (): string {
    return `
        var {controlFlowStorageName} = { {controlFlowStorage} };
    `;
}
