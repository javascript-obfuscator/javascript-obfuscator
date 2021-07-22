/**
 * Adds some spaces between some language constructions
 *
 * @param {string} code
 * @param {" " | "  "} character
 * @returns {string}
 */
export function beautifyCode (code: string, character: 'space' | 'tab'): string {
    const spaceCharacter: string = character === 'space' ? '\x20' : '\x09';

    return code
        .replace(/function\(\){/g, 'function () {')
        .replace(/(!?=+)/g, ' $1 ')
        .replace(/,/g, `,${spaceCharacter}`)
        .replace(/;/g, `;\n${spaceCharacter}`);
}