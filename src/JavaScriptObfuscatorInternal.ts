import { InversifyContainerFacade } from "./container/InversifyContainerFacade";
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import * as esprima from 'esprima';
import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { Chance } from 'chance';

import { ICustomNode } from './interfaces/custom-nodes/ICustomNode';
import { IObfuscationResult } from './interfaces/IObfuscationResult';
import { IObfuscator } from './interfaces/IObfuscator';
import { IGeneratorOutput } from './interfaces/IGeneratorOutput';
import { IInputOptions } from './interfaces/IInputOptions';
import { IOptions } from './interfaces/IOptions';
import { IStorage } from './interfaces/IStorage';

import { ObfuscationResult } from './ObfuscationResult';
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
     * @types {IStorage<ICustomNode>}
     */
    private readonly customNodesStorage: IStorage<ICustomNode>;

    /**
     * @types {InversifyContainerFacade}
     */
    private readonly inversifyContainerFacade: InversifyContainerFacade;

    /**
     * @types {IObfuscator}
     */
    private readonly obfuscator: IObfuscator;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param inputOptions
     */
    constructor (inputOptions: IInputOptions) {
        this.inversifyContainerFacade = new InversifyContainerFacade(inputOptions);

        this.obfuscator = this.inversifyContainerFacade
            .get<IObfuscator>(ServiceIdentifiers.IObfuscator);

        this.customNodesStorage = this.inversifyContainerFacade
            .get<IStorage<ICustomNode>>(ServiceIdentifiers['IStorage<ICustomNode>']);

        this.options = this.inversifyContainerFacade
            .get<IOptions>(ServiceIdentifiers.IOptions);
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

        // parse AST tree
        const astTree: ESTree.Program = esprima.parse(sourceCode, JavaScriptObfuscatorInternal.esprimaParams);

        // obfuscate AST tree
        const obfuscatedAstTree: ESTree.Program = this.obfuscator.obfuscateAstTree(astTree, this.customNodesStorage);

        // generate code
        const generatorOutput: IGeneratorOutput = this.generateCode(sourceCode, obfuscatedAstTree);

        return this.getObfuscationResult(generatorOutput);
    }
}
