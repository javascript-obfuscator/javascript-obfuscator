import { IObfuscationResult } from './IObfuscationResult';

export interface ISourceMapCorrector {
    correct (obfuscatedCode: string, sourceMap: string): IObfuscationResult;
}
