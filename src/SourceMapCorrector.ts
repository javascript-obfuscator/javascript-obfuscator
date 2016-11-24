import { IObfuscationResult } from './interfaces/IObfuscationResult';
import { ISourceMapCorrector } from './interfaces/ISourceMapCorrector';

import { TSourceMapMode } from './types/TSourceMapMode';

import { SourceMapMode } from './enums/SourceMapMode';

import { ObfuscationResult } from './ObfuscationResult';
import { Utils } from './Utils';

export class SourceMapCorrector implements ISourceMapCorrector {
    /**
     * @type {string}
     */
    private readonly obfuscatedCode: string;

    /**
     * @type {string}
     */
    private readonly sourceMap: string;

    /**
     * @type {TSourceMapMode}
     */
    private readonly sourceMapMode: TSourceMapMode;

    /**
     * @type {string}
     */
    private readonly sourceMapUrl: string;

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
            this.sourceMap
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
                sourceMappingUrl += `data:application/json;base64,${Utils.btoa(this.sourceMap)}`;

                break;

            case SourceMapMode.Separate:
            default:
                if (!this.sourceMapUrl) {
                    return this.obfuscatedCode;
                }

                sourceMappingUrl += this.sourceMapUrl;

                break;
        }

        return `${this.obfuscatedCode}\n${sourceMappingUrl}`;
    };
}
