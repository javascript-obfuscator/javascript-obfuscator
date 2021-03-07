import * as acorn from 'acorn';
import * as ESTree from 'estree';
import chalk, { Chalk } from 'chalk';

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
     * @param {string} sourceCode
     * @param {Options} config
     * @returns {Program}
     */
    public static parse (sourceCode: string, config: acorn.Options): ESTree.Program | never {
        const sourceTypeLength: number = ASTParserFacade.sourceTypes.length;

        for (let i: number = 0; i < sourceTypeLength; i++) {
            try {
                return ASTParserFacade.parseType(sourceCode, config, ASTParserFacade.sourceTypes[i]);
            } catch (error) {
                if (i < sourceTypeLength - 1) {
                    continue;
                }

                throw new Error(ASTParserFacade.processParsingError(
                    sourceCode,
                    error.message,
                    error.loc
                ));
            }
        }

        throw new Error('Acorn parsing error');
    }

    /**
     * @param {string} sourceCode
     * @param {acorn.Options} inputConfig
     * @param {acorn.Options["sourceType"]} sourceType
     * @returns {Program}
     */
    private static parseType (
        sourceCode: string,
        inputConfig: acorn.Options,
        sourceType: acorn.Options['sourceType']
    ): ESTree.Program {
        const comments: ESTree.Comment[] = [];
        const config: acorn.Options = {
            ...inputConfig,
            allowAwaitOutsideFunction: true,
            onComment: comments,
            sourceType
        };

        const program: ESTree.Program = <any>acorn
            .parse(sourceCode, config);

        if (comments.length) {
            program.comments = comments;
        }

        return program;
    }

    /**
     * @param {string} sourceCode
     * @param {string} errorMessage
     * @param {Position | null} position
     * @returns {never}
     */
    private static processParsingError (
        sourceCode: string,
        errorMessage: string,
        position: ESTree.Position | null
    ): never {
        if (!position || !position.line || !position.column) {
            throw new Error(errorMessage);
        }

        const sourceCodeLines: string[] = sourceCode.split(/\r?\n/);
        const errorLine: string | undefined = sourceCodeLines[position.line - 1];

        if (!errorLine) {
            throw new Error(errorMessage);
        }

        const startErrorIndex: number = Math.max(0, position.column - ASTParserFacade.nearestSymbolsCount);
        const endErrorIndex: number = Math.min(errorLine.length, position.column + ASTParserFacade.nearestSymbolsCount);

        const formattedPointer: string = ASTParserFacade.colorError('>');
        const formattedCodeSlice: string = `...${
            errorLine.slice(startErrorIndex, endErrorIndex).replace(/^\s+/, '')
        }...`;

        throw new Error(
            `ERROR at line ${position.line}: ${errorMessage}\n${formattedPointer} ${formattedCodeSlice}`
        );
    }
}
