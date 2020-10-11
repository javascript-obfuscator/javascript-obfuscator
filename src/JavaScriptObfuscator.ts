import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import * as acorn from 'acorn';
import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { TObfuscatedCodeFactory } from './types/container/source-code/TObfuscatedCodeFactory';

import { ICodeTransformersRunner } from './interfaces/code-transformers/ICodeTransformersRunner';
import { IGeneratorOutput } from './interfaces/IGeneratorOutput';
import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { ILogger } from './interfaces/logger/ILogger';
import { IObfuscatedCode } from './interfaces/source-code/IObfuscatedCode';
import { IOptions } from './interfaces/options/IOptions';
import { IRandomGenerator } from './interfaces/utils/IRandomGenerator';
import { INodeTransformersRunner } from './interfaces/node-transformers/INodeTransformersRunner';

import { CodeTransformer } from './enums/code-transformers/CodeTransformer';
import { CodeTransformationStage } from './enums/code-transformers/CodeTransformationStage';
import { LoggingMessage } from './enums/logger/LoggingMessage';
import { NodeTransformer } from './enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from './enums/node-transformers/NodeTransformationStage';

import { ecmaVersion } from './constants/EcmaVersion';

import { ASTParserFacade } from './ASTParserFacade';
import { NodeGuards } from './node/NodeGuards';
import { Utils } from './utils/Utils';

@injectable()
export class JavaScriptObfuscator implements IJavaScriptObfuscator {
    /**
     * @type {Options}
     */
    private static readonly parseOptions: acorn.Options = {
        ecmaVersion,
        allowHashBang: true,
        allowImportExportEverywhere: true,
        allowReturnOutsideFunction: true,
        locations: true,
        ranges: true
    };

    /**
     * @type {GenerateOptions}
     */
    private static readonly escodegenParams: escodegen.GenerateOptions = {
        comment: true,
        verbatim: 'x-verbatim-property',
        sourceMapWithCode: true
    };

    /**
     * @type {CodeTransformer[]}
     */
    private static readonly codeTransformersList: CodeTransformer[] = [
        CodeTransformer.HashbangOperatorTransformer
    ];

    /**
     * @type {NodeTransformer[]}
     */
    private static readonly nodeTransformersList: NodeTransformer[] = [
        NodeTransformer.BooleanLiteralTransformer,
        NodeTransformer.BlockStatementControlFlowTransformer,
        NodeTransformer.BlockStatementSimplifyTransformer,
        NodeTransformer.CommentsTransformer,
        NodeTransformer.CustomCodeHelpersTransformer,
        NodeTransformer.DeadCodeInjectionTransformer,
        NodeTransformer.EscapeSequenceTransformer,
        NodeTransformer.EvalCallExpressionTransformer,
        NodeTransformer.ExpressionStatementsMergeTransformer,
        NodeTransformer.FunctionControlFlowTransformer,
        NodeTransformer.IfStatementSimplifyTransformer,
        NodeTransformer.LabeledStatementTransformer,
        NodeTransformer.RenamePropertiesTransformer,
        NodeTransformer.MemberExpressionTransformer,
        NodeTransformer.MetadataTransformer,
        NodeTransformer.MethodDefinitionTransformer,
        NodeTransformer.NumberLiteralTransformer,
        NodeTransformer.NumberToNumericalExpressionTransformer,
        NodeTransformer.ObfuscatingGuardsTransformer,
        NodeTransformer.ObjectExpressionKeysTransformer,
        NodeTransformer.ObjectExpressionTransformer,
        NodeTransformer.ObjectPatternPropertiesTransformer,
        NodeTransformer.ParentificationTransformer,
        NodeTransformer.ScopeIdentifiersTransformer,
        NodeTransformer.SplitStringTransformer,
        NodeTransformer.StringArrayScopeCallsWrapperTransformer,
        NodeTransformer.StringArrayTransformer,
        NodeTransformer.TemplateLiteralTransformer,
        NodeTransformer.VariableDeclarationsMergeTransformer,
        NodeTransformer.VariablePreserveTransformer
    ];

    /**
     * @type {ICodeTransformersRunner}
     */
    private readonly codeTransformersRunner: ICodeTransformersRunner;

    /**
     * @type {ILogger}
     */
    private readonly logger: ILogger;

    /**
     * @type {TObfuscatedCodeFactory}
     */
    private readonly obfuscatedCodeFactory: TObfuscatedCodeFactory;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @type {INodeTransformersRunner}
     */
    private readonly nodeTransformersRunner: INodeTransformersRunner;

    /**
     * @param {ICodeTransformersRunner} codeTransformersRunner
     * @param {INodeTransformersRunner} nodeTransformersRunner
     * @param {IRandomGenerator} randomGenerator
     * @param {TObfuscatedCodeFactory} obfuscatedCodeFactory
     * @param {ILogger} logger
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.ICodeTransformersRunner) codeTransformersRunner: ICodeTransformersRunner,
        @inject(ServiceIdentifiers.INodeTransformersRunner) nodeTransformersRunner: INodeTransformersRunner,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.Factory__IObfuscatedCode) obfuscatedCodeFactory: TObfuscatedCodeFactory,
        @inject(ServiceIdentifiers.ILogger) logger: ILogger,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.codeTransformersRunner = codeTransformersRunner;
        this.nodeTransformersRunner = nodeTransformersRunner;
        this.randomGenerator = randomGenerator;
        this.obfuscatedCodeFactory = obfuscatedCodeFactory;
        this.logger = logger;
        this.options = options;
    }

    /**
     * @param {string} sourceCode
     * @returns {IObfuscatedCode}
     */
    public obfuscate (sourceCode: string): IObfuscatedCode {
        if (typeof sourceCode !== 'string') {
            sourceCode = '';
        }

        const timeStart: number = Date.now();
        this.logger.info(LoggingMessage.Version, Utils.buildVersionMessage(process.env.VERSION, process.env.BUILD_TIMESTAMP));
        this.logger.info(LoggingMessage.ObfuscationStarted);
        this.logger.info(LoggingMessage.RandomGeneratorSeed, this.randomGenerator.getInputSeed());

        // preparing code transformations
        sourceCode = this.runCodeTransformationStage(sourceCode, CodeTransformationStage.PreparingTransformers);

        // parse AST tree
        const astTree: ESTree.Program = this.parseCode(sourceCode);

        // obfuscate AST tree
        const obfuscatedAstTree: ESTree.Program = this.transformAstTree(astTree);

        // generate code
        const generatorOutput: IGeneratorOutput = this.generateCode(sourceCode, obfuscatedAstTree);

        // finalizing code transformations
        generatorOutput.code = this.runCodeTransformationStage(generatorOutput.code, CodeTransformationStage.FinalizingTransformers);

        const obfuscationTime: number = (Date.now() - timeStart) / 1000;
        this.logger.success(LoggingMessage.ObfuscationCompleted, obfuscationTime);

        return this.getObfuscatedCode(generatorOutput);
    }

    /**
     * @param {string} sourceCode
     * @returns {Program}
     */
    private parseCode (sourceCode: string): ESTree.Program {
        return ASTParserFacade.parse(sourceCode, JavaScriptObfuscator.parseOptions);
    }

    /**
     * @param {Program} astTree
     * @returns {Program}
     */
    private transformAstTree (astTree: ESTree.Program): ESTree.Program {
        astTree = this.runNodeTransformationStage(astTree, NodeTransformationStage.Initializing);

        const isEmptyAstTree: boolean = NodeGuards.isProgramNode(astTree)
            && !astTree.body.length
            && !astTree.leadingComments
            && !astTree.trailingComments;

        if (isEmptyAstTree) {
            this.logger.warn(LoggingMessage.EmptySourceCode);

            return astTree;
        }

        astTree = this.runNodeTransformationStage(astTree, NodeTransformationStage.Preparing);

        if (this.options.deadCodeInjection) {
            astTree = this.runNodeTransformationStage(astTree, NodeTransformationStage.DeadCodeInjection);
        }

        if (this.options.controlFlowFlattening) {
            astTree = this.runNodeTransformationStage(astTree, NodeTransformationStage.ControlFlowFlattening);
        }

        if (this.options.renameProperties) {
            astTree = this.runNodeTransformationStage(astTree, NodeTransformationStage.RenameProperties);
        }

        astTree = this.runNodeTransformationStage(astTree, NodeTransformationStage.Converting);
        astTree = this.runNodeTransformationStage(astTree, NodeTransformationStage.RenameIdentifiers);
        astTree = this.runNodeTransformationStage(astTree, NodeTransformationStage.StringArray);

        if (this.options.simplify) {
            astTree = this.runNodeTransformationStage(astTree, NodeTransformationStage.Simplifying);
        }

        astTree = this.runNodeTransformationStage(astTree, NodeTransformationStage.Finalizing);

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
            escodegenParams.sourceMap = this.options.inputFileName || 'sourceMap';
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
     * @returns {IObfuscatedCode}
     */
    private getObfuscatedCode (generatorOutput: IGeneratorOutput): IObfuscatedCode {
        return this.obfuscatedCodeFactory(generatorOutput.code, generatorOutput.map);
    }

    /**
     * @param {string} code
     * @param {CodeTransformationStage} codeTransformationStage
     * @returns {string}
     */
    private runCodeTransformationStage (code: string, codeTransformationStage: CodeTransformationStage): string {
        this.logger.info(LoggingMessage.CodeTransformationStage, codeTransformationStage);

        return this.codeTransformersRunner.transform(
            code,
            JavaScriptObfuscator.codeTransformersList,
            codeTransformationStage
        );
    }

    /**
     * @param {Program} astTree
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {Program}
     */
    private runNodeTransformationStage (astTree: ESTree.Program, nodeTransformationStage: NodeTransformationStage): ESTree.Program {
        this.logger.info(LoggingMessage.NodeTransformationStage, nodeTransformationStage);

        return this.nodeTransformersRunner.transform(
            astTree,
            JavaScriptObfuscator.nodeTransformersList,
            nodeTransformationStage
        );
    }
}
