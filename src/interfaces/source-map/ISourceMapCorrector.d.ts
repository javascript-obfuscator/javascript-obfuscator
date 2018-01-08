import * as ESTree from 'estree';

import { IObfuscationResult } from '../IObfuscationResult';

export interface ISourceMapCorrector {
    /**
     * @param {Program} obfuscatedAst
     * @param {string} obfuscatedCode
     * @param {string} sourceMap
     * @returns {IObfuscationResult}
     */
    correct (obfuscatedAst: ESTree.Program, obfuscatedCode: string, sourceMap: string): IObfuscationResult;
}
