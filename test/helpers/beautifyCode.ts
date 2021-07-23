const beautify = require('js-beautify').js;

/**
 * Beautifies code
 *
 * @param {string} code
 * @param {" " | "  "} character
 * @returns {string}
 */
export function beautifyCode (code: string, character: 'space' | 'tab'): string {
    const indentCharacter: string = character === 'space' ? '\x20' : '\x09';

    return beautify(code, {
        indent_char: indentCharacter
    });
}