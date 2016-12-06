import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import * as esprima from 'esprima';
import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { IObfuscationResult } from './interfaces/IObfuscationResult';
import { IObfuscator } from './interfaces/IObfuscator';
import { IGeneratorOutput } from './interfaces/IGeneratorOutput';
import { IOptions } from './interfaces/options/IOptions';
import { ISourceMapCorrector } from './interfaces/ISourceMapCorrector';

import { Utils } from './Utils';

@injectable()
export class JavaScriptObfuscatorInternal implements IJavaScriptObfuscator {
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
     * @type {IObfuscator}
     */
    private readonly obfuscator: IObfuscator;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {ISourceMapCorrector}
     */
    private readonly sourceMapCorrector: ISourceMapCorrector;

    /**
     * @param obfuscator
     * @param sourceMapCorrector
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IObfuscator) obfuscator: IObfuscator,
        @inject(ServiceIdentifiers.ISourceMapCorrector) sourceMapCorrector: ISourceMapCorrector,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.obfuscator = obfuscator;
        this.sourceMapCorrector = sourceMapCorrector;
        this.options = options;
    }

    /**
     * @param sourceCode
     * @param astTree
     */
    private generateCode (sourceCode: string, astTree: ESTree.Program): IGeneratorOutput {
        const escodegenParams: escodegen.GenerateOptions = Object.assign(
            {},
            JavaScriptObfuscatorInternal.escodegenParams
        );

        if (this.options.sourceMap) {
            escodegenParams.sourceMap = 'sourceMap';
            escodegenParams.sourceContent = sourceCode;
        }

        escodegenParams.format = {
            compact: this.options.compact
        };

        const generatorOutput: IGeneratorOutput = escodegen.generate(astTree, escodegenParams);

        generatorOutput.map = generatorOutput.map ? generatorOutput.map.toString() : '';

        return generatorOutput;
    }

    /**
     * @param generatorOutput
     * @returns {IObfuscationResult}
     */
    private getObfuscationResult (generatorOutput: IGeneratorOutput): IObfuscationResult {
        return this.sourceMapCorrector.correct(
            generatorOutput.code,
            generatorOutput.map
        );
    }

    /**
     * @param sourceCode
     * @returns {IObfuscationResult}
     */
    public obfuscate (sourceCode: string): IObfuscationResult {
        if (this.options.seed !== 0) {
            Utils.setRandomGeneratorSeed(this.options.seed);
        }

        // parse AST tree
        const astTree: ESTree.Program = esprima.parse(sourceCode, JavaScriptObfuscatorInternal.esprimaParams);

        // obfuscate AST tree
        const obfuscatedAstTree: ESTree.Program = this.obfuscator.obfuscateAstTree(astTree);

        // generate code
        const generatorOutput: IGeneratorOutput = this.generateCode(sourceCode, obfuscatedAstTree);

        return this.getObfuscationResult(generatorOutput);
    }
}
