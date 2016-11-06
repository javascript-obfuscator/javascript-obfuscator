import * as esprima from 'esprima';
import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { IObfuscatorOptions } from './interfaces/IObfuscatorOptions';
import { IGeneratorOutput } from './interfaces/IGeneratorOutput';
import { IObfuscationResult } from './interfaces/IObfuscationResult';
import { IOptions } from './interfaces/IOptions';

import { ObfuscationResult } from './ObfuscationResult';
import { Obfuscator } from './Obfuscator';
import { Options } from './options/Options';
import { SourceMapCorrector } from './SourceMapCorrector';

export class JavaScriptObfuscatorInternal {
    /**
     * @type {GenerateOptions}
     */
    private static escodegenParams: escodegen.GenerateOptions = {
        verbatim: 'x-verbatim-property',
        sourceMapWithCode: true
    };

    /**
     * @type {IGeneratorOutput}
     */
    private generatorOutput: IGeneratorOutput;

    /**
     * @type {IOptions}
     */
    private options: IOptions;

    /**
     * @type {string}
     */
    private sourceCode: string;

    /**
     * @param sourceCode
     * @param obfuscatorOptions
     */
    constructor (sourceCode: string, obfuscatorOptions: IObfuscatorOptions = {}) {
        this.sourceCode = sourceCode;
        this.options = new Options(obfuscatorOptions);
    }

    /**
     * @param sourceCode
     * @param astTree
     * @param options
     */
    private static generateCode (sourceCode: string, astTree: ESTree.Node, options: IOptions): IGeneratorOutput {
        const escodegenParams: escodegen.GenerateOptions = Object.assign(
            {},
            JavaScriptObfuscatorInternal.escodegenParams
        );

        if (options.sourceMap) {
            escodegenParams.sourceMap = 'sourceMap';
            escodegenParams.sourceContent = sourceCode;
        }

        escodegenParams.format = {
            compact: options.compact
        };

        const generatorOutput: IGeneratorOutput = escodegen.generate(astTree, escodegenParams);

        generatorOutput.map = generatorOutput.map ? generatorOutput.map.toString() : '';

        return generatorOutput;
    }

    /**
     * @returns {IObfuscationResult}
     */
    public getObfuscationResult (): IObfuscationResult {
        return new SourceMapCorrector(
            new ObfuscationResult(
                this.generatorOutput.code,
                this.generatorOutput.map
            ),
            this.options.sourceMapBaseUrl + this.options.sourceMapFileName,
            this.options.sourceMapMode
        ).correct();
    }

    public obfuscate (): void {
        let astTree: ESTree.Node = esprima.parse(this.sourceCode, {
            loc: true
        });

        astTree = new Obfuscator(this.options).obfuscateNode(astTree);

        this.generatorOutput = JavaScriptObfuscatorInternal.generateCode(this.sourceCode, astTree, this.options);
    }
}
