import { IOptions } from "./interfaces/IOptions";

import { TSourceMapModes } from "./types/TSourceMapModes";

import { SourceMapMode } from "./enums/SourceMapMode";

import { Utils } from "./Utils";

export class SourceMapInjector {
    /**
     * @type {IOptions}
     */
    private options: IOptions;

    /**
     * @type {string}
     */
    private sourceCode: string;

    /**
     * @type {string}
     */
    private sourceMap: string;

    /**
     * @param sourceCode
     * @param sourceMap
     * @param options
     */
    constructor (sourceCode: string, sourceMap: string, options: IOptions) {
        this.sourceCode = sourceCode;
        this.sourceMap = sourceMap;
        this.options = options;
    }

    /**
     * @param sourceCode
     * @param url
     * @param mode
     * @returns {string}
     */
    public static appendSourceMapUrlToSourceCode (
        sourceCode: string,
        url: string,
        mode: TSourceMapModes = SourceMapMode.Separate
    ): string {
        let sourceMappingUrl: string = '//# sourceMappingURL=';

        if (mode === SourceMapMode.Separate) {
            sourceMappingUrl += url;
        } else {
            sourceMappingUrl += `data:application/json;base64,${Utils.btoa(url, false)}`;
        }

        return `${sourceCode}\n${sourceMappingUrl}`;
    }

    /**
     * @returns {string}
     */
    public inject (): string {
        if (this.options.get<string>('sourceMapMode') === SourceMapMode.Inline) {
            return SourceMapInjector.appendSourceMapUrlToSourceCode(
                this.sourceCode,
                this.sourceMap,
                SourceMapMode.Inline
            );
        }

        return this.sourceCode;
    }
}
