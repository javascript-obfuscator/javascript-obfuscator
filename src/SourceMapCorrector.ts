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
    constructor (obfuscationResult: IObfuscationResult, sourceMapUrl: string, sourceMapMode: TSourceMapMode) {
        this.obfuscatedCode = obfuscationResult.obfuscatedCode;
        this.sourceMap = obfuscationResult.sourceMap;

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

        let sourceMappingUrl: string = '//# sourceMappingURL=',
            sourceMappingUrlContent: string = this.sourceMapUrl || this.sourceMap;

        switch (this.sourceMapMode) {
            case SourceMapMode.Inline:
                sourceMappingUrl += `data:application/json;base64,${Utils.btoa(sourceMappingUrlContent, false)}`;

                break;

            case SourceMapMode.Separate:
            default:
                sourceMappingUrl += sourceMappingUrlContent;
        }

        return `${this.obfuscatedCode}\n${sourceMappingUrl}`;
    };

    /**
     * @returns {any}
     */
    private correctSourceMap (): string {
        if (!this.sourceMapUrl) {
            return '';
        }

        return this.sourceMap;
    }
}
