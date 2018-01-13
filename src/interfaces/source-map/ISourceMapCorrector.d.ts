import { IObfuscationResult } from '../IObfuscationResult';

export interface ISourceMapCorrector {
    /**
     * @param {string} obfuscatedCode
     * @param {string} sourceMap
     * @returns {IObfuscationResult}
     */
    correct (obfuscatedCode: string, sourceMap: string): IObfuscationResult;
}
