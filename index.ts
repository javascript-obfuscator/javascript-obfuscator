"use strict";

import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

import { Obfuscator } from './src/Obfuscator';

export class JavaScriptObfuscator {
    /**
     * @type any
     */
    private static escodegenParams: any = {
        format: {
            compact: true
        },
        verbatim: 'x-verbatim-property'
    };

    /**
     * @param sourceCode
     * @param options
     */
    public static obfuscate (sourceCode: string, options: any = {}): string {
        let astTree: any = esprima.parse(sourceCode),
            obfuscator: Obfuscator = new Obfuscator(options);

        obfuscator.obfuscateNode(astTree);

        return JavaScriptObfuscator.generateCode(astTree, options);
    }

    /**
     * @param astTree
     * @param options
     */
    private static generateCode (astTree: any, options: any = {}): string {
        let escodegenParams: any = Object.assign({}, JavaScriptObfuscator.escodegenParams);

        if (options.hasOwnProperty('compact')) {
            escodegenParams.format.compact = options.compact;
        }

        return escodegen.generate(astTree, escodegenParams);
    }
}

module.exports = JavaScriptObfuscator;