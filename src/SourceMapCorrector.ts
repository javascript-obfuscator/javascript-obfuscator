import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import { TObfuscationResultFactory } from './types/container/TObfuscationResultFactory';

import { IObfuscationResult } from './interfaces/IObfuscationResult';
import { IOptions } from './interfaces/options/IOptions';
import { ISourceMapCorrector } from './interfaces/ISourceMapCorrector';

import { SourceMapMode } from './enums/SourceMapMode';

import { CryptUtils } from './utils/CryptUtils';

@injectable()
export class SourceMapCorrector implements ISourceMapCorrector {
    /**
     * @type {TObfuscationResultFactory}
     */
    private readonly obfuscationResultFactory: TObfuscationResultFactory;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param obfuscationResultFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObfuscationResult) obfuscationResultFactory: TObfuscationResultFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.obfuscationResultFactory = obfuscationResultFactory;
        this.options = options;
    }

    /**
     * @returns {ObfuscationResult}
     * @param obfuscatedCode
     * @param sourceMap
     */
    public correct (obfuscatedCode: string, sourceMap: string): IObfuscationResult {
        return this.obfuscationResultFactory(
            this.correctObfuscatedCode(obfuscatedCode, sourceMap),
            sourceMap
        );
    }

    /**
     * @param obfuscatedCode
     * @param sourceMap
     * @returns {string}
     */
    private correctObfuscatedCode (obfuscatedCode: string, sourceMap: string): string {
        if (!sourceMap) {
            return obfuscatedCode;
        }

        const sourceMapUrl: string = this.options.sourceMapBaseUrl + this.options.sourceMapFileName;

        let sourceMappingUrl: string = '//# sourceMappingURL=';

        switch (this.options.sourceMapMode) {
            case SourceMapMode.Inline:
                sourceMappingUrl += `data:application/json;base64,${CryptUtils.btoa(sourceMap)}`;

                break;

            case SourceMapMode.Separate:
            default:
                if (!sourceMapUrl) {
                    return obfuscatedCode;
                }

                sourceMappingUrl += sourceMapUrl;

                break;
        }

        return `${obfuscatedCode}\n${sourceMappingUrl}`;
    };
}
