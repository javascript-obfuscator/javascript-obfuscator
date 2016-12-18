import { IObfuscationResult } from './IObfuscationResult';

export interface IJavaScriptObfuscator {
    /**
     * @param sourceCode
     * @returns IObfuscationResult
     */
    obfuscate (sourceCode: string): IObfuscationResult;
}
