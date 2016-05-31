"use strict";

import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

import { INode } from './interfaces/nodes/INode';
import { IOptions } from './interfaces/IOptions';

import { DEFAULT_PRESET } from './preset-options/DefaultPreset';

import { Obfuscator } from './Obfuscator';

export class JavaScriptObfuscator {
    /**
     * @type any
     */
    private static escodegenParams: any = {
        verbatim: 'x-verbatim-property'
    };

    /**
     * @param sourceCode
     * @param customOptions
     */
    public static obfuscate (sourceCode: string, customOptions?: IOptions): string {
        let astTree: INode = esprima.parse(sourceCode),
            options: any = Object.assign({}, DEFAULT_PRESET, customOptions),
            obfuscator: Obfuscator = new Obfuscator(options);

        astTree = obfuscator.obfuscateNode(astTree);

        return JavaScriptObfuscator.generateCode(astTree, options);
    }

    /**
     * @param astTree
     * @param options
     */
    private static generateCode (astTree: INode, options: IOptions): string {
        let escodegenParams: any = Object.assign({}, JavaScriptObfuscator.escodegenParams);

        if (options.hasOwnProperty('compact')) {
            escodegenParams.format = {};
            escodegenParams.format.compact = options.compact;
        }

        return escodegen.generate(astTree, escodegenParams);
    }
}
