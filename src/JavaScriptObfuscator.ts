"use strict";

import kernel from "./Kernel";

import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

import { INode } from './interfaces/nodes/INode';
import { IObfuscator } from "./interfaces/IObfuscator";
import { IOptions } from './interfaces/IOptions';

import { DEFAULT_PRESET } from './preset-options/DefaultPreset';

import { Obfuscator } from './Obfuscator';
import { OptionsNormalizer } from "./OptionsNormalizer";

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
    public static obfuscate (sourceCode: string, customOptions?: IOptions): string {
        let astTree: INode = esprima.parse(sourceCode),
            options: IOptions = OptionsNormalizer.normalize(Object.assign({}, DEFAULT_PRESET, customOptions)),
            obfuscator: Obfuscator = kernel.get<IObfuscator>('IObfuscator');

        astTree = obfuscator.obfuscateNode(astTree);

        return JavaScriptObfuscator.generateCode(astTree, options);
    }

    /**
     * @param astTree
     * @param options
     */
    private static generateCode (astTree: INode, options: IOptions): string {
        let escodegenParams: escodegen.GenerateOptions = Object.assign({}, JavaScriptObfuscator.escodegenParams);

        if (options.hasOwnProperty('compact')) {
            escodegenParams.format = {
                compact: options.compact
            };
        }

        return escodegen.generate(astTree, escodegenParams);
    }
}
