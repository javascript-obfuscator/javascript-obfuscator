import { IObfuscationResult } from './IObfuscationResult';

export interface IJavaScriptObfuscator {
    obfuscate (sourceCode: string): IObfuscationResult;
}
