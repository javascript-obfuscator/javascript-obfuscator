export interface ISourceMap {
    /**
     * @type {string}
     */
    mappings: string;

    /**
     * @type {string[]}
     */
    sources: string[];

    /**
     * @type {string[]}
     */
    sourcesContent: string[];
}
