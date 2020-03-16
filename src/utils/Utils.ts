export class Utils {
    /**
     * @type {string}
     */
    public static readonly baseMultipleSourcesIdentifiersPrefix: string = 'a';

    /**
     * @type {string}
     */
    public static readonly hexadecimalPrefix: string = '0x';

    /**
     * @param {string} version
     * @param {string} buildTimestamp
     * @returns {string}
     */
    public static buildVersionMessage (version?: string, buildTimestamp?: string): string {
        if (!version || !buildTimestamp) {
            return 'unknown';
        }

        const buildDate: string = new Date(parseInt(buildTimestamp, 10)).toISOString();

        return `${version}_${buildDate}`;
    }

    /**
     * @param {string} url
     * @returns {string}
     */
    public static extractDomainFrom (url: string): string {
        let domain: string;

        if (url.includes('://') || url.indexOf('//') === 0) {
            domain = url.split('/')[2];
        } else {
            domain = url.split('/')[0];
        }

        domain = domain.split(':')[0];

        return domain;
    }

    /**
     * @param {string | undefined} identifiersPrefix
     * @param {number} sourceCodeIndex
     * @returns {string}
     */
    public static getIdentifiersPrefixForMultipleSources (
        identifiersPrefix: string | undefined,
        sourceCodeIndex: number
    ): string {
        const baseIdentifiersPrefix: string = !!identifiersPrefix
            ? identifiersPrefix
            : Utils.baseMultipleSourcesIdentifiersPrefix;

        return `${baseIdentifiersPrefix}${sourceCodeIndex}`;
    }
}
