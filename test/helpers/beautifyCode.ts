/**
 * Adds some spaces between some language constructions
 *
 * @param {string} code
 * @returns {string}
 */
export function beautifyCode (code: string): string {
    return code
        .replace(/function\(\){/g, 'function () {')
        .replace(/(!?=+)/g, ' $1 ')
        .replace(/,/g, ', ')
        .replace(/;/g, '; ');
}