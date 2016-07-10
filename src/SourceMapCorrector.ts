import { IObfuscationResult } from "./interfaces/IObfuscationResult";

import { TSourceMapMode } from "./types/TSourceMapMode";

import { SourceMapMode } from "./enums/SourceMapMode";

import { ObfuscationResult } from "./ObfuscationResult";
import { Utils } from "./Utils";

export class SourceMapCorrector {
    /**
     * @type {string}
     */
    private obfuscatedCode: string;

    /**
     * @type {string}
     */
    private sourceMap: string;

    /**
     * @type {TSourceMapMode}
     */
    private sourceMapMode: TSourceMapMode;

    /**
     * @type {string}
     */
    private sourceMapUrl: string;

    /**
     * @param obfuscationResult
     * @param sourceMapUrl
     * @param sourceMapMode
     */
    constructor (
        obfuscationResult: IObfuscationResult,
        sourceMapUrl: string,
        sourceMapMode: TSourceMapMode
    ) {
        this.obfuscatedCode = obfuscationResult.getObfuscatedCode();
        this.sourceMap = obfuscationResult.getSourceMap();

        this.sourceMapUrl = sourceMapUrl;
        this.sourceMapMode = sourceMapMode;
    }

    /**
     * @returns {ObfuscationResult}
     */
    public correct (): IObfuscationResult {
        return new ObfuscationResult(
            this.correctObfuscatedCode(),
            this.correctSourceMap()
        );
    }

    /**
     * @returns {string}
     */
    private correctObfuscatedCode (): string {
        if (!this.sourceMap) {
            return this.obfuscatedCode;
        }

        let sourceMappingUrl: string = '//# sourceMappingURL=';

        switch (this.sourceMapMode) {
            case SourceMapMode.Inline:
                sourceMappingUrl += `data:application/json;base64,${Utils.btoa(this.sourceMapUrl || this.sourceMap, false)}`;

                break;

            case SourceMapMode.Separate:
            default:
                if (this.sourceMapUrl) {
                    sourceMappingUrl += this.sourceMapUrl;

                    break;
                }

                return this.obfuscatedCode;
        }

        return `${this.obfuscatedCode}\n${sourceMappingUrl}`;
    };

    /**
     * @returns {string}
     */
    private correctSourceMap (): string {
        if (this.sourceMapMode === SourceMapMode.Inline) {
            return '';
        }

        return this.sourceMap;
    }
}
