import * as acorn from 'acorn';
import acornImportMeta from 'acorn-import-meta';
import * as ESTree from 'estree';
import chalk, { Chalk } from 'chalk';

import { IASTParserFacadeInputData } from './interfaces/IASTParserFacadeInputData';

/**
 * Facade over AST parser `acorn`
 */
export class ASTParserFacade {
    /**
     * @type {Chalk}
     */
    private static readonly colorError: Chalk = chalk.red;

    /**
     * @type {number}
     */
    private static readonly nearestSymbolsCount: number = 15;

    /**
     * @type {acorn.Options['sourceType'][]}
     */
    private static readonly sourceTypes: acorn.Options['sourceType'][] = [
        'script',
        'module'
    ];

    /**
     * @param {string} inputData
     * @param {Options} config
     * @returns {Program}
     */
    public static parse (inputData: IASTParserFacadeInputData, config: acorn.Options): ESTree.Program | never {
        const sourceTypeLength: number = ASTParserFacade.sourceTypes.length;

        for (let i: number = 0; i < sourceTypeLength; i++) {
            try {
                return ASTParserFacade.parseType(inputData, config, ASTParserFacade.sourceTypes[i]);
            } catch (error) {
                if (i < sourceTypeLength - 1) {
                    continue;
                }

                throw new Error(ASTParserFacade.processParsingError(
                    inputData,
                    error.message,
                    error.loc
                ));
            }
        }

        throw new Error('Acorn parsing error');
    }

    /**
     * @param {IASTParserFacadeInputData} inputData
     * @param {acorn.Options} inputConfig
     * @param {acorn.Options["sourceType"]} sourceType
     * @returns {Program}
     */
    private static parseType (
        inputData: IASTParserFacadeInputData,
        inputConfig: acorn.Options,
        sourceType: acorn.Options['sourceType']
    ): ESTree.Program {
        const { sourceCode } = inputData;
        const comments: ESTree.Comment[] = [];
        const config: acorn.Options = {
            ...inputConfig,
            onComment: comments,
            sourceType
        };

        const program: ESTree.Program = <any>acorn
            .Parser.extend(acornImportMeta)
            .parse(sourceCode, config);

        if (comments.length) {
            program.comments = comments;
        }

        return program;
    }

    /**
     * @param {IASTParserFacadeInputData} inputData
     * @param {string} errorMessage
     * @param {Position | null} position
     * @returns {never}
     */
    private static processParsingError (
        inputData: IASTParserFacadeInputData,
        errorMessage: string,
        position: ESTree.Position | null
    ): never {
        if (!position || !position.line || !position.column) {
            throw new Error(errorMessage);
        }

        const { sourceCode, inputFilePath } = inputData;

        const sourceCodeLines: string[] = sourceCode.split(/\r?\n/);
        const errorLine: string | undefined = sourceCodeLines[position.line - 1];

        if (!errorLine) {
            throw new Error(errorMessage);
        }

        const formattedInputFilePath: string = inputFilePath
            ? `${inputFilePath}, `
            : '';

        const startErrorIndex: number = Math.max(0, position.column - ASTParserFacade.nearestSymbolsCount);
        const endErrorIndex: number = Math.min(errorLine.length, position.column + ASTParserFacade.nearestSymbolsCount);

        const formattedPointer: string = ASTParserFacade.colorError('>');
        const formattedCodeSlice: string = `...${
            errorLine.substring(startErrorIndex, endErrorIndex).replace(/^\s+/, '')
        }...`;

        throw new Error(
            `ERROR in ${formattedInputFilePath}line ${position.line}: ${errorMessage}\n${formattedPointer} ${formattedCodeSlice}`
        );
    }
}
