"use strict";

import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

import { IGeneratorOutput } from "./interfaces/IGeneratorOutput";
import { INode } from './interfaces/nodes/INode';
import { IObfuscator } from "./interfaces/IObfuscator";
import { IOptions } from './interfaces/IOptions';
import { IOptionsPreset } from "./interfaces/IOptionsPreset";

import { JavaScriptObfuscatorCLI } from "./cli/JavaScriptObfuscatorCLI";
import { Obfuscator } from "./Obfuscator";
import { Options } from "./Options";
import { SourceMapInjector } from "./SourceMapInjector";

export class JavaScriptObfuscator {
    /**
     * @type {string}
     */
    public static obfuscatedCode: string;

    /**
     * @type {string}
     */
    public static sourceMap: string;

    /**
     * @type {GenerateOptions}
     */
    private static escodegenParams: escodegen.GenerateOptions = {
        verbatim: 'x-verbatim-property',
        sourceMapWithCode: true
    };

    /**
     * @param sourceCode
     * @param customOptions
     */
    public static obfuscate (sourceCode: string, customOptions?: IOptionsPreset): string {
        let astTree: INode = esprima.parse(sourceCode, {
                loc: true
            }),
            options: IOptions = new Options(customOptions),
            obfuscator: IObfuscator = new Obfuscator(options);

        astTree = obfuscator.obfuscateNode(astTree);

        let output: IGeneratorOutput = JavaScriptObfuscator.generateCode(astTree, sourceCode, options);

        JavaScriptObfuscator.obfuscatedCode = output.code;

        if (output.map) {
            JavaScriptObfuscator.sourceMap = output.map.toString();
            JavaScriptObfuscator.obfuscatedCode = new SourceMapInjector(
                JavaScriptObfuscator.obfuscatedCode,
                JavaScriptObfuscator.sourceMap,
                options
            ).inject();
        }

        return JavaScriptObfuscator.obfuscatedCode;
    }

    /**
     * @param argv
     */
    public static runCLI (argv: string[]): void {
        new JavaScriptObfuscatorCLI(argv).run();
    }

    /**
     * @param astTree
     * @param sourceCode
     * @param options
     */
    private static generateCode (astTree: INode, sourceCode: string, options: IOptions): IGeneratorOutput {
        let escodegenParams: escodegen.GenerateOptions = Object.assign({}, JavaScriptObfuscator.escodegenParams);

        if (options.get<boolean>('sourceMap')) {
            escodegenParams.sourceMap = 'sourceMap';
            escodegenParams.sourceContent = sourceCode;
        }

        escodegenParams.format = {
            compact: options.get<boolean>('compact')
        };

        return escodegen.generate(astTree, escodegenParams);
    }
}
