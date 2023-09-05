/**
 * @returns {string}
 */
export function GlobalVariableServiceWorkerTemplate (): string {
    return 'const that = typeof global === \'object\' ? global : this;';
}
