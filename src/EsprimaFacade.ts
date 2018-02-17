import * as esprima from 'esprima';
import * as ESTree from 'estree';

import chalk, { Chalk } from 'chalk';

/**
 * Facade over `esprima` to handle parsing errors and provide more detailed error messages
 */
export class EsprimaFacade {
    /**
     * @type {Chalk}
     */
    private static readonly colorError: Chalk = chalk.red;

    /**
     * @type {number}
     */
    private static readonly nearestSymbolsCount: number = 10;

    /**
     * @param {string} input
     * @param {ParseOptions} config
     * @returns {Program}
     */
    public static parseScript (input: string, config: esprima.ParseOptions): ESTree.Program {
        let lastMeta: esprima.NodeMeta | null = null;

        try {
            return esprima.parseScript(input, config, (node: ESTree.Node, meta: any) => lastMeta = meta);
        } catch (error) {
            return EsprimaFacade.processParsingError(input, error.message, lastMeta);
        }
    }

    /**
     * @param {string} sourceCode
     * @param {string} errorMessage
     * @param {"esprima".NodeMeta | null} meta
     * @returns {never}
     */
    private static processParsingError (sourceCode: string, errorMessage: string, meta: esprima.NodeMeta | null): never {
        if (!meta || !meta.start || !meta.end || !meta.start.column || !meta.end.column) {
            throw new Error(errorMessage);
        }

        const lineNumberMatch: RegExpMatchArray | null = errorMessage.match(/Line *(\d*)/);

        if (!lineNumberMatch) {
            throw new Error(errorMessage);
        }

        const lineNumber: number = parseInt(lineNumberMatch[1], 10);
        const sourceCodeLines: string[] = sourceCode.split(/\r?\n/);
        const errorLine: string | undefined = sourceCodeLines[lineNumber - 1];

        if (!errorLine) {
            throw new Error(errorMessage);
        }

        const startErrorIndex: number = Math.max(0, meta.start.column - EsprimaFacade.nearestSymbolsCount);
        const endErrorIndex: number = Math.min(errorLine.length, meta.end.column + EsprimaFacade.nearestSymbolsCount);

        const formattedPointer: string = EsprimaFacade.colorError('>');
        const formattedCodeSlice: string = `...${
            errorLine.substring(startErrorIndex, endErrorIndex).replace(/^\s+/, '')
        }...`;

        throw new Error(`${errorMessage}\n${formattedPointer} ${formattedCodeSlice}`);
    }
}
