import { IObfuscationResult } from "./interfaces/IObfuscationResult";
import { IOptionsPreset } from "./interfaces/IOptionsPreset";

import { JavaScriptObfuscatorCLI } from "./cli/JavaScriptObfuscatorCLI";
import { JavaScriptObfuscatorInstance } from "./JavaScriptObfuscatorInstance";

export class JavaScriptObfuscator {
    /**
     * @param sourceCode
     * @param options
     * @returns {string}
     */
    public static obfuscate (sourceCode: string, options: IOptionsPreset = {}): string {
        let javaScriptObfuscator: JavaScriptObfuscatorInstance = new JavaScriptObfuscatorInstance(sourceCode, options);

        javaScriptObfuscator.obfuscate();

        return javaScriptObfuscator.getObfuscationResult().obfuscatedCode;
    }

    /**
     * @param sourceCode
     * @param options
     * @returns {string}
     */
    public static obfuscateWithSourceMap (
        sourceCode: string,
        options: IOptionsPreset = {}
    ): IObfuscationResult {
        let javaScriptObfuscator: JavaScriptObfuscatorInstance = new JavaScriptObfuscatorInstance(sourceCode, options);

        javaScriptObfuscator.obfuscate();

        return javaScriptObfuscator.getObfuscationResult();
    }

    /**
     * @param argv
     */
    public static runCLI (argv: string[]): void {
        new JavaScriptObfuscatorCLI(argv).run();
    }
}
