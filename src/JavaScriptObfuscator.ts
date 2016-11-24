import { IObfuscationResult } from './interfaces/IObfuscationResult';
import { IObfuscatorOptions } from './interfaces/IObfuscatorOptions';

import { JavaScriptObfuscatorCLI } from './cli/JavaScriptObfuscatorCLI';
import { JavaScriptObfuscatorInternal } from './JavaScriptObfuscatorInternal';
import { Options } from './options/Options';

export class JavaScriptObfuscator {
    /**
     * @param sourceCode
     * @param obfuscatorOptions
     * @returns {string}
     */
    public static obfuscate (sourceCode: string, obfuscatorOptions: IObfuscatorOptions = {}): IObfuscationResult {
        const javaScriptObfuscator: JavaScriptObfuscatorInternal = new JavaScriptObfuscatorInternal(
            new Options(obfuscatorOptions)
        );

        return javaScriptObfuscator.obfuscate(sourceCode);
    }

    /**
     * @param argv
     */
    public static runCLI (argv: string[]): void {
        new JavaScriptObfuscatorCLI(argv).run();
    }
}
