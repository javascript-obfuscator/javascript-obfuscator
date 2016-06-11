"use strict";

import kernel from "./Kernel";

import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

import { INode } from './interfaces/nodes/INode';
import { IObfuscator } from "./interfaces/IObfuscator";
import { IOptions } from './interfaces/IOptions';
import { IOptionsPreset } from "./interfaces/IOptionsPreset";

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
            options: IOptions = kernel.get<IOptions>('IOptions'),
            obfuscator: IObfuscator = kernel.get<IObfuscator>('IObfuscator');

        options.assign(customOptions);

        astTree = obfuscator.obfuscateNode(astTree);

        return JavaScriptObfuscator.generateCode(astTree, options);
    }

    /**
     * @param astTree
     * @param options
     */
    private static generateCode (astTree: INode, options: IOptions): string {
        let escodegenParams: escodegen.GenerateOptions = Object.assign({}, JavaScriptObfuscator.escodegenParams);

        escodegenParams.format = {
            compact: options.getOption('compact')
        };

        return escodegen.generate(astTree, escodegenParams);
    }
}
