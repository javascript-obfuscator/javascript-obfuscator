import jsStringEscape from 'js-string-escape';

export class StringUtils {
    /**
     * @param {string} string
     * @returns {string}
     */
    public static escapeJsString (string: string): string {
        return jsStringEscape(string);
    }
}
