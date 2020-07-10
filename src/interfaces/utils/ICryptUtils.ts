export interface ICryptUtils {
    /**
     * @param {string} string
     * @returns {string}
     */
    btoa (string: string): string;

    /**
     * @param str
     * @param length
     * @returns {[string, string]}
     */
    hideString (str: string, length: number): [string, string];

    /**
     * @param key
     * @param string
     * @returns {string}
     */
    rc4 (string: string, key: string): string;
}
