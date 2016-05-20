"use strict";

import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

import { IProgramNode } from './src/interfaces/nodes/IProgramNode';

import { Obfuscator } from './src/Obfuscator';

export class JavaScriptObfuscator {
    /**
     * @type any
     */
    private static defaultOptions: any = {
        compact: true,
        rotateUnicodeArray: true
    };

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
    public static obfuscate (sourceCode: string, customOptions: any): string {
        let astTree: IProgramNode = esprima.parse(sourceCode),
            options: any = Object.assign(JavaScriptObfuscator.defaultOptions, customOptions),
            obfuscator: Obfuscator = new Obfuscator(options);

        obfuscator.obfuscateNode(astTree);

        return JavaScriptObfuscator.generateCode(astTree, options);
    }

    /**
     * @param astTree
     * @param options
     */
    private static generateCode (astTree: IProgramNode, options: any): string {
        let escodegenParams: any = Object.assign({}, JavaScriptObfuscator.escodegenParams);

        if (options.hasOwnProperty('compact')) {
            escodegenParams.format = {};
            escodegenParams.format.compact = options.compact;
        }

        return escodegen.generate(astTree, escodegenParams);
    }
}

module.exports = JavaScriptObfuscator;
