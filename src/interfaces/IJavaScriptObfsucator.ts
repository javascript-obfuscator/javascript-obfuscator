import { IObfuscatedCode } from './source-code/IObfuscatedCode';

export interface IJavaScriptObfuscator {
    /**
     * @param sourceCode
     * @returns IObfuscatedCode
     */
    obfuscate (sourceCode: string): IObfuscatedCode;
}
