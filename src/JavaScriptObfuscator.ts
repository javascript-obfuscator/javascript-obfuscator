import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import * as esprima from 'esprima';
import * as escodegen from 'escodegen-wallaby';
import * as ESTree from 'estree';
import * as packageJson from 'pjson';

import { ICustomNodeGroup } from './interfaces/custom-nodes/ICustomNodeGroup';
import { IGeneratorOutput } from './interfaces/IGeneratorOutput';
import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { ILogger } from './interfaces/logger/ILogger';
import { IObfuscationEventEmitter } from './interfaces/event-emitters/IObfuscationEventEmitter';
import { IObfuscationResult } from './interfaces/IObfuscationResult';
import { IOptions } from './interfaces/options/IOptions';
import { IRandomGenerator } from './interfaces/utils/IRandomGenerator';
import { ISourceMapCorrector } from './interfaces/source-map/ISourceMapCorrector';
import { IStackTraceAnalyzer } from './interfaces/analyzers/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from './interfaces/analyzers/stack-trace-analyzer/IStackTraceData';
import { IStorage } from './interfaces/storages/IStorage';
import { ITransformersRunner } from './interfaces/node-transformers/ITransformersRunner';

import { LoggingMessage } from './enums/logger/LoggingMessage';
import { NodeTransformer } from './enums/node-transformers/NodeTransformer';
import { ObfuscationEvent } from './enums/event-emitters/ObfuscationEvent';

import { NodeGuards } from './node/NodeGuards';

@injectable()
export class JavaScriptObfuscator implements IJavaScriptObfuscator {
    /**
     * @type {GenerateOptions}
     */
    private static readonly escodegenParams: escodegen.GenerateOptions = {
        verbatim: 'x-verbatim-property',
        sourceMapWithCode: true
    };

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly controlFlowTransformersList: NodeTransformer[] = [
        NodeTransformer.BlockStatementControlFlowTransformer,
        NodeTransformer.FunctionControlFlowTransformer
    ];

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly convertingTransformersList: NodeTransformer[] = [
        NodeTransformer.MemberExpressionTransformer,
        NodeTransformer.MethodDefinitionTransformer,
        NodeTransformer.TemplateLiteralTransformer
    ];

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly deadCodeInjectionTransformersList: NodeTransformer[] = [
        NodeTransformer.DeadCodeInjectionTransformer
    ];

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly obfuscatingTransformersList: NodeTransformer[] = [
        NodeTransformer.CatchClauseTransformer,
        NodeTransformer.ClassDeclarationTransformer,
        NodeTransformer.FunctionDeclarationTransformer,
        NodeTransformer.FunctionTransformer,
        NodeTransformer.LabeledStatementTransformer,
        NodeTransformer.LiteralTransformer,
        NodeTransformer.ObjectExpressionTransformer,
        NodeTransformer.VariableDeclarationTransformer
    ];

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly preparingTransformersList: NodeTransformer[] = [
        NodeTransformer.ObfuscatingGuardsTransformer,
        NodeTransformer.ParentificationTransformer
    ];

    /**
     * @type {IStorage<ICustomNodeGroup>}
     */
    private readonly customNodeGroupStorage: IStorage<ICustomNodeGroup>;

    /**
     * @type {ILogger}
     */
    private readonly logger: ILogger;

    /**
     * @type {IObfuscationEventEmitter}
     */
    private readonly obfuscationEventEmitter: IObfuscationEventEmitter;

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
     * @type {IStackTraceAnalyzer}
     */
    private readonly stackTraceAnalyzer: IStackTraceAnalyzer;

    /**
     * @type {ITransformersRunner}
     */
    private readonly transformersRunner: ITransformersRunner;

    /**
     * @param {IStackTraceAnalyzer} stackTraceAnalyzer
     * @param {IObfuscationEventEmitter} obfuscationEventEmitter
     * @param {IStorage<ICustomNodeGroup>} customNodeGroupStorage
     * @param {ITransformersRunner} transformersRunner
     * @param {ISourceMapCorrector} sourceMapCorrector
     * @param {IRandomGenerator} randomGenerator
     * @param {ILogger} logger
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IStackTraceAnalyzer) stackTraceAnalyzer: IStackTraceAnalyzer,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.TCustomNodeGroupStorage) customNodeGroupStorage: IStorage<ICustomNodeGroup>,
        @inject(ServiceIdentifiers.ITransformersRunner) transformersRunner: ITransformersRunner,
        @inject(ServiceIdentifiers.ISourceMapCorrector) sourceMapCorrector: ISourceMapCorrector,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.ILogger) logger: ILogger,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.stackTraceAnalyzer = stackTraceAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.customNodeGroupStorage = customNodeGroupStorage;
        this.transformersRunner = transformersRunner;
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
        this.logger.info(LoggingMessage.Version, packageJson.version);
        this.logger.info(LoggingMessage.ObfuscationStarted);
        this.logger.info(LoggingMessage.RandomGeneratorSeed, this.randomGenerator.getSeed());

        // parse AST tree
        const astTree: ESTree.Program = this.parseCode(sourceCode);

        // obfuscate AST tree
        const obfuscatedAstTree: ESTree.Program = this.transformAstTree(astTree);

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
        return esprima.parseScript(sourceCode, {
            attachComment: true,
            loc: this.options.sourceMap
        });
    }

    /**
     * @param {Program} astTree
     * @returns {Program}
     */
    private transformAstTree (astTree: ESTree.Program): ESTree.Program {
        if (NodeGuards.isProgramNode(astTree) && !astTree.body.length) {
            this.logger.warn(LoggingMessage.EmptySourceCode);

            return astTree;
        }

        // first pass: AST-tree preparation
        this.logger.info(LoggingMessage.StagePreparingASTTree);
        astTree = this.transformersRunner.transform(
            astTree,
            JavaScriptObfuscator.preparingTransformersList
        );

        // second pass: AST-tree analyzing
        this.logger.info(LoggingMessage.StageAnalyzingASTTree);
        const stackTraceData: IStackTraceData[] = this.stackTraceAnalyzer.analyze(astTree);

        // initialize custom node groups and configure custom nodes
        this.customNodeGroupStorage
            .getStorage()
            .forEach((customNodeGroup: ICustomNodeGroup) => {
                customNodeGroup.initialize();

                this.obfuscationEventEmitter.once(
                    customNodeGroup.getAppendEvent(),
                    customNodeGroup.appendCustomNodes.bind(customNodeGroup)
                );
            });

        this.obfuscationEventEmitter.emit(ObfuscationEvent.BeforeObfuscation, astTree, stackTraceData);

        // third pass: dead code injection transformer
        if (this.options.deadCodeInjection) {
            this.logger.info(LoggingMessage.StageDeadCodeInjection);

            astTree = this.transformersRunner.transform(
                astTree,
                JavaScriptObfuscator.deadCodeInjectionTransformersList
            );
        }

        // fourth pass: control flow flattening transformers
        if (this.options.controlFlowFlattening) {
            this.logger.info(LoggingMessage.StageControlFlowFlattening);

            astTree = this.transformersRunner.transform(
                astTree,
                JavaScriptObfuscator.controlFlowTransformersList
            );
        }

        // fifth pass: converting and obfuscating transformers
        this.logger.info(LoggingMessage.StageObfuscation);
        astTree = this.transformersRunner.transform(astTree, [
            ...JavaScriptObfuscator.convertingTransformersList,
            ...JavaScriptObfuscator.obfuscatingTransformersList
        ]);

        this.obfuscationEventEmitter.emit(ObfuscationEvent.AfterObfuscation, astTree, stackTraceData);

        return astTree;
    }

    /**
     * @param {string} sourceCode
     * @param {Program} astTree
     * @returns {IGeneratorOutput}
     */
    private generateCode (sourceCode: string, astTree: ESTree.Program): IGeneratorOutput {
        const escodegenParams: escodegen.GenerateOptions = {
            ...JavaScriptObfuscator.escodegenParams
        };

        if (this.options.sourceMap) {
            escodegenParams.sourceMap = 'sourceMap';
            escodegenParams.sourceContent = sourceCode;
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
