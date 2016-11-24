import { IInputOptions } from './interfaces/IInputOptions';
import { IObfuscationResult } from './interfaces/IObfuscationResult';

import { JavaScriptObfuscatorCLI } from './cli/JavaScriptObfuscatorCLI';
import { JavaScriptObfuscatorInternal } from './JavaScriptObfuscatorInternal';
import { Options } from './options/Options';

export class JavaScriptObfuscator {
    /**
     * @param sourceCode
     * @param inputOptions
     * @returns {string}
     */
    public static obfuscate (sourceCode: string, inputOptions: IInputOptions = {}): IObfuscationResult {
        const javaScriptObfuscator: JavaScriptObfuscatorInternal = new JavaScriptObfuscatorInternal(
            new Options(inputOptions)
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
