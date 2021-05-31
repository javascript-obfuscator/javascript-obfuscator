import { IObfuscationResult } from './source-code/IObfuscationResult';

export interface IJavaScriptObfuscator {
    /**
     * @param sourceCode
     * @returns IObfuscationResult
     */
    obfuscate (sourceCode: string): IObfuscationResult;
}
