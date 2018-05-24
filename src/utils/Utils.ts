export class Utils {
    /**
     * @type {string}
     */
    public static readonly hexadecimalPrefix: string = '0x';

    /**
     * @param {string} url
     * @returns {string}
     */
    public static extractDomainFrom (url: string): string {
        let domain: string;

        if (url.indexOf('://') > -1 || url.indexOf('//') === 0) {
            domain = url.split('/')[2];
        } else {
            domain = url.split('/')[0];
        }

        domain = domain.split(':')[0];

        return domain;
    }
}
