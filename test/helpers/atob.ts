/**
 * @param {string} encodedString
 * @returns {string}
 */
export function atob (encodedString: string): string {
    return Buffer.from(encodedString, 'base64').toString();
}
