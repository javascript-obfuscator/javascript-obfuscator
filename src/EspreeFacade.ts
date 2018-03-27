import * as espree from 'espree';
import * as ESTree from 'estree';

import chalk, { Chalk } from 'chalk';

/**
 * Facade over `espree`
 */
export class EspreeFacade {
    /**
     * @type {Chalk}
     */
    private static readonly colorError: Chalk = chalk.red;

    /**
     * @type {number}
     */
    private static readonly nearestSymbolsCount: number = 15;

    /**
     * @type {SourceType[]}
     */
    private static readonly sourceTypes: espree.SourceType[] = [
        'script',
        'module'
    ];

    /**
     * @param {string} input
     * @param {Options} config
     * @returns {Program}
     */
    public static parse (input: string, config: espree.ParseOptions): ESTree.Program | never {
        const sourceTypeLength: number = EspreeFacade.sourceTypes.length;

        for (let i: number = 0; i < sourceTypeLength; i++) {
            try {
                return EspreeFacade.parseType(input, config, EspreeFacade.sourceTypes[i]);
            } catch (error) {
                if (i < sourceTypeLength - 1) {
                    continue;
                }

                throw new Error(EspreeFacade.processParsingError(
                    input,
                    error.message,
                    {
                        line: error.lineNumber,
                        column: error.column,
                    }
                ));
            }
        }

        throw new Error(`Espree parsing error`);
    }

    /**
     * @param {string} input
     * @param {ParseOptions} inputConfig
     * @param {SourceType} sourceType
     * @returns {Program}
     */
    private static parseType (
        input: string,
        inputConfig: espree.ParseOptions,
        sourceType: espree.SourceType
    ): ESTree.Program {
        const config: espree.ParseOptions = { ...inputConfig, sourceType };

        return espree.parse(input, config);
    }

    /**
     * @param {string} sourceCode
     * @param {string} errorMessage
     * @param {Position} position
     * @returns {never}
     */
    private static processParsingError (sourceCode: string, errorMessage: string, position: ESTree.Position | null): never {
        if (!position || !position.line || !position.column) {
            throw new Error(errorMessage);
        }

        const sourceCodeLines: string[] = sourceCode.split(/\r?\n/);
        const errorLine: string | undefined = sourceCodeLines[position.line - 1];

        if (!errorLine) {
            throw new Error(errorMessage);
        }

        const startErrorIndex: number = Math.max(0, position.column - EspreeFacade.nearestSymbolsCount);
        const endErrorIndex: number = Math.min(errorLine.length, position.column + EspreeFacade.nearestSymbolsCount);

        const formattedPointer: string = EspreeFacade.colorError('>');
        const formattedCodeSlice: string = `...${
            errorLine.substring(startErrorIndex, endErrorIndex).replace(/^\s+/, '')
        }...`;

        throw new Error(`Line ${position.line}: ${errorMessage}\n${formattedPointer} ${formattedCodeSlice}`);
    }
}
