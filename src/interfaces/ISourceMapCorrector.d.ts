import { IObfuscationResult } from './IObfuscationResult';

export interface ISourceMapCorrector {
    /**
     * @param obfuscatedCode
     * @param sourceMap
     * @returns IObfuscationResult
     */
    correct (obfuscatedCode: string, sourceMap: string): IObfuscationResult;
}
