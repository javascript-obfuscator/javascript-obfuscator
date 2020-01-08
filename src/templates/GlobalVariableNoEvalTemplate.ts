/**
 * @returns {string}
 */
export function GlobalVariableNoEvalTemplate (): string {
    return `
        const that = (typeof window !== 'undefined'
           ? window
           : (typeof process === 'object' &&
              typeof require === 'function' &&
              typeof global === 'object')
             ? global
             : this);
    `;
}
