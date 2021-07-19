/**
 * @param {string} encodedString
 * @returns {string}
 */
export function cryptUtilsAtob (encodedString: string): string {
    const baseDecodedString = atob(encodedString);

    var tempDecodedString = '';

    for (let k = 0, length = baseDecodedString.length; k < length; k++) {
        tempDecodedString += '%' + ('00' + baseDecodedString.charCodeAt(k).toString(16)).slice(-2);
    }

    return decodeURIComponent(tempDecodedString);
}
