import * as esprima from 'esprima';
import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { Chance } from 'chance';

import { IGeneratorOutput } from './interfaces/IGeneratorOutput';
import { IObfuscationResult } from './interfaces/IObfuscationResult';
import { IOptions } from './interfaces/IOptions';

import { ObfuscationResult } from './ObfuscationResult';
import { Obfuscator } from './Obfuscator';
import { SourceMapCorrector } from './SourceMapCorrector';
import { Utils } from './Utils';

export class JavaScriptObfuscatorInternal {
    /**
     * @type {GenerateOptions}
     */
    private static readonly escodegenParams: escodegen.GenerateOptions = {
        verbatim: 'x-verbatim-property',
        sourceMapWithCode: true
    };

    /**
     * @type {esprima.Options}
     */
    private static readonly esprimaParams: esprima.Options = {
        loc: true
    };

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param options
     */
    constructor (options: IOptions) {
        this.options = options;
    }

    /**
     * @param sourceCode
     * @param astTree
     * @param options
     */
    private static generateCode (sourceCode: string, astTree: ESTree.Program, options: IOptions): IGeneratorOutput {
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
     * @param generatorOutput
     * @returns {IObfuscationResult}
     */
    public getObfuscationResult (generatorOutput: IGeneratorOutput): IObfuscationResult {
        return new SourceMapCorrector(
            new ObfuscationResult(
                generatorOutput.code,
                generatorOutput.map
            ),
            this.options.sourceMapBaseUrl + this.options.sourceMapFileName,
            this.options.sourceMapMode
        ).correct();
    }

    /**
     * @param sourceCode
     * @returns {IObfuscationResult}
     */
    public obfuscate (sourceCode: string): IObfuscationResult {
        if (this.options.seed !== 0) {
            Utils.setRandomGenerator(new Chance(this.options.seed));
        }

        const astTree: ESTree.Program = esprima.parse(sourceCode, JavaScriptObfuscatorInternal.esprimaParams);
        const obfuscatedAstTree: ESTree.Program = new Obfuscator(this.options).obfuscateAstTree(astTree);
        const generatorOutput: IGeneratorOutput = JavaScriptObfuscatorInternal.generateCode(
            sourceCode,
            obfuscatedAstTree,
            this.options
        );

        return this.getObfuscationResult(generatorOutput);
    }
}
