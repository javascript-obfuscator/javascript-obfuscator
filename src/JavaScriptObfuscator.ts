"use strict";

import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

import { INode } from './interfaces/nodes/INode';
import { IObfuscator } from "./interfaces/IObfuscator";
import { IOptions } from './interfaces/IOptions';
import { IOptionsPreset } from "./interfaces/IOptionsPreset";

import { JavaScriptObfuscatorCLI } from "./cli/JavaScriptObfuscatorCLI";
import { Obfuscator } from "./Obfuscator";
import { Options } from "./Options";

export class JavaScriptObfuscator {
    /**
     * @type {GenerateOptions}
     */
    private static escodegenParams: escodegen.GenerateOptions = {
        verbatim: 'x-verbatim-property'
    };

    /**
     * @param sourceCode
     * @param customOptions
     */
    public static obfuscate (sourceCode: string, customOptions?: IOptionsPreset): string {
        let astTree: INode = esprima.parse(sourceCode),
            options: IOptions = new Options(customOptions),
            obfuscator: IObfuscator = new Obfuscator(options);

        astTree = obfuscator.obfuscateNode(astTree);

        return JavaScriptObfuscator.generateCode(astTree, options);
    }

    public static runCLI (): void {
        new JavaScriptObfuscatorCLI().run();
    }

    /**
     * @param astTree
     * @param options
     */
    private static generateCode (astTree: INode, options: IOptions): string {
        let escodegenParams: escodegen.GenerateOptions = Object.assign({}, JavaScriptObfuscator.escodegenParams);

        escodegenParams.format = {
            compact: options.get<boolean>('compact')
        };

        return escodegen.generate(astTree, escodegenParams);
    }
}
