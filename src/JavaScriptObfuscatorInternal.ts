import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import * as esprima from 'esprima';
import * as escodegen from 'escodegen-wallaby';
import * as esmangle from 'esmangle';
import * as ESTree from 'estree';

import { IGeneratorOutput } from './interfaces/IGeneratorOutput';
import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { ILogger } from './interfaces/logger/ILogger';
import { IObfuscationResult } from './interfaces/IObfuscationResult';
import { IObfuscator } from './interfaces/IObfuscator';
import { IOptions } from './interfaces/options/IOptions';
import { IRandomGenerator } from './interfaces/utils/IRandomGenerator';
import { ISourceMapCorrector } from './interfaces/ISourceMapCorrector';

import { LoggingMessage } from './enums/logger/LoggingMessage';

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
     * @type {ILogger}
     */
    private readonly logger: ILogger;

    /**
     * @type {IObfuscator}
     */
    private readonly obfuscator: IObfuscator;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @type {ISourceMapCorrector}
     */
    private readonly sourceMapCorrector: ISourceMapCorrector;

    /**
     * @param {IObfuscator} obfuscator
     * @param {ISourceMapCorrector} sourceMapCorrector
     * @param {IRandomGenerator} randomGenerator
     * @param {ILogger} logger
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IObfuscator) obfuscator: IObfuscator,
        @inject(ServiceIdentifiers.ISourceMapCorrector) sourceMapCorrector: ISourceMapCorrector,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.ILogger) logger: ILogger,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.obfuscator = obfuscator;
        this.sourceMapCorrector = sourceMapCorrector;
        this.randomGenerator = randomGenerator;
        this.logger = logger;
        this.options = options;
    }

    /**
     * @param {string} sourceCode
     * @returns {IObfuscationResult}
     */
    public obfuscate (sourceCode: string): IObfuscationResult {
        const timeStart: number = Date.now();
        this.logger.info(LoggingMessage.ObfuscationStarted);
        this.logger.info(LoggingMessage.RandomGeneratorSeed, this.randomGenerator.getSeed());

        // parse AST tree
        const astTree: ESTree.Program = this.parseCode(sourceCode);

        // obfuscate AST tree
        const obfuscatedAstTree: ESTree.Program = this.obfuscator.obfuscateAstTree(astTree);

        // generate code
        const generatorOutput: IGeneratorOutput = this.generateCode(sourceCode, obfuscatedAstTree);

        const obfuscationTime: number = (Date.now() - timeStart) / 1000;
        this.logger.success(LoggingMessage.ObfuscationCompleted, obfuscationTime);

        return this.getObfuscationResult(generatorOutput);
    }

    /**
     * @param {string} sourceCode
     * @returns {Program}
     */
    private parseCode (sourceCode: string): ESTree.Program {
        return esprima.parse(sourceCode, {
            loc: this.options.sourceMap
        });
    }

    /**
     * @param {string} sourceCode
     * @param {Program} astTree
     * @returns {IGeneratorOutput}
     */
    private generateCode (sourceCode: string, astTree: ESTree.Program): IGeneratorOutput {
        const escodegenParams: escodegen.GenerateOptions = {
            ...JavaScriptObfuscatorInternal.escodegenParams
        };

        if (this.options.sourceMap) {
            escodegenParams.sourceMap = 'sourceMap';
            escodegenParams.sourceContent = sourceCode;
        }

        if (this.options.mangle) {
            astTree = esmangle.mangle(astTree);
        }

        const generatorOutput: IGeneratorOutput = escodegen.generate(astTree, {
            ...escodegenParams,
            format: {
                compact: this.options.compact
            }
        });

        generatorOutput.map = generatorOutput.map ? generatorOutput.map.toString() : '';

        return generatorOutput;
    }

    /**
     * @param {IGeneratorOutput} generatorOutput
     * @returns {IObfuscationResult}
     */
    private getObfuscationResult (generatorOutput: IGeneratorOutput): IObfuscationResult {
        return this.sourceMapCorrector.correct(
            generatorOutput.code,
            generatorOutput.map
        );
    }
}
