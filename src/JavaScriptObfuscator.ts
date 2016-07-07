"use strict";

import { IObfuscationResult } from "./interfaces/IObfuscationResult";
import { IOptionsPreset } from "./interfaces/IOptionsPreset";

import { JavaScriptObfuscatorCLI } from "./cli/JavaScriptObfuscatorCLI";
import { JavaScriptObfuscatorInstance } from "./JavaScriptObfuscatorInstance";
import { ObfuscationResult } from "./ObfuscationResult";

export class JavaScriptObfuscator {
    /**
     * @param sourceCode
     * @param options
     * @returns {string}
     */
    public static obfuscate (sourceCode: string, options: IOptionsPreset = {}): string {
        let javaScriptObfuscator: JavaScriptObfuscatorInstance = new JavaScriptObfuscatorInstance(sourceCode, options);

        javaScriptObfuscator.obfuscate();

        return javaScriptObfuscator.getObfuscatedCode();
    }

    /**
     * @param sourceCode
     * @param options
     * @param sourceMapUrl
     * @returns {string}
     */
    public static obfuscateWithSourceMap (
        sourceCode: string,
        options: IOptionsPreset = {},
        sourceMapUrl?: string
    ): IObfuscationResult {
        let javaScriptObfuscator: JavaScriptObfuscatorInstance = new JavaScriptObfuscatorInstance(sourceCode, options);

        javaScriptObfuscator.obfuscate();

        if (sourceMapUrl) {
            javaScriptObfuscator.setSourceMapUrl(sourceMapUrl);
        }

        return new ObfuscationResult(
            javaScriptObfuscator.getObfuscatedCode(),
            javaScriptObfuscator.getSourceMap()
        );
    }

    /**
     * @param argv
     */
    public static runCLI (argv: string[]): void {
        new JavaScriptObfuscatorCLI(argv).run();
    }
}
