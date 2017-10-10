/**
 * @returns {string}
 */
export function GlobalVariableNoEvalTemplate (): string {
    return `
        var that = (typeof window !== 'undefined'
           ? window
           : (typeof process === 'object' &&
              typeof require === 'function' &&
              typeof global === 'object')
             ? global
             : this);
    `;
}
