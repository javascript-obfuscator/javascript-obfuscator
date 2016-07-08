import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

import { IGeneratorOutput } from "./interfaces/IGeneratorOutput";
import { INode } from './interfaces/nodes/INode';
import { IOptions } from './interfaces/IOptions';
import { IOptionsPreset } from "./interfaces/IOptionsPreset";

import { TSourceMapModes } from "./types/TSourceMapModes";

import { Obfuscator } from "./Obfuscator";
import { Options } from "./Options";
import { SourceMapInjector } from "./SourceMapInjector";

export class JavaScriptObfuscatorInstance {
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
     * @type {string}
     */
    private sourceMapUrl: string;

    /**
     * @param sourceCode
     * @param customOptions
     */
    constructor (sourceCode: string, customOptions?: IOptionsPreset) {
        this.sourceCode = sourceCode;
        this.options = new Options(customOptions);
    }

    /**
     * @param sourceCode
     * @param astTree
     * @param options
     */
    private static generateCode (sourceCode: string, astTree: INode, options: IOptions): IGeneratorOutput {
        let escodegenParams: escodegen.GenerateOptions = Object.assign({}, JavaScriptObfuscatorInstance.escodegenParams);

        if (options.get<boolean>('sourceMap')) {
            escodegenParams.sourceMap = 'sourceMap';
            escodegenParams.sourceContent = sourceCode;
        }

        escodegenParams.format = {
            compact: options.get<boolean>('compact')
        };

        return escodegen.generate(astTree, escodegenParams);
    }

    /**
     * @returns {string}
     */
    public getObfuscatedCode (): string {
        if (this.generatorOutput.map) {
            return SourceMapInjector.inject(
                this.generatorOutput.code,
                this.sourceMapUrl || this.generatorOutput.map.toString(),
                this.options.get<TSourceMapModes>('sourceMapMode')
            );
        }

        return this.generatorOutput.code;
    }

    /**
     * @returns {string}
     */
    public getSourceMap (): string {
        return this.generatorOutput.map;
    }

    public obfuscate (): void {
        let astTree: INode = esprima.parse(this.sourceCode, {
            loc: true
        });

        astTree = new Obfuscator(this.options).obfuscateNode(astTree);

        this.generatorOutput = JavaScriptObfuscatorInstance.generateCode(this.sourceCode, astTree, this.options);
    }

    /**
     * @param url
     */
    public setSourceMapUrl (url: string): void {
        this.sourceMapUrl = url;
    }
}
