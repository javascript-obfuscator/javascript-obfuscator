import { injectable } from 'inversify';

import { Program } from 'estree';

import { IObfuscationResult } from './interfaces/IObfuscationResult';

import { initializable } from './decorators/Initializable';

@injectable()
export class ObfuscationResult implements IObfuscationResult {
    /**
     * @type {Program}
     */
    @initializable()
    private obfuscatedAst: Program;

    /**
     * @type {string}
     */
    @initializable()
    private obfuscatedCode: string;

    /**
     * @type {string}
     */
    @initializable()
    private sourceMap: string;

    /**
     * @param {Program} obfuscatedAst
     * @param {string} obfuscatedCode
     * @param {string} sourceMap
     */
    public initialize (obfuscatedAst: Program, obfuscatedCode: string, sourceMap: string): void {
        this.obfuscatedAst = obfuscatedAst;
        this.obfuscatedCode = obfuscatedCode;
        this.sourceMap = sourceMap;
    }

    /**
     * @returns {Program}
     */
    public getObfuscatedAst (): Program {
        return this.obfuscatedAst;
    }

    /**
     * @returns {string}
     */
    public getObfuscatedCode (): string {
        return this.obfuscatedCode;
    }

    /**
     * @returns {string}
     */
    public getSourceMap (): string {
        return this.sourceMap;
    }

    /**
     * @returns {string}
     */
    public toString (): string {
        return this.obfuscatedCode;
    }
}
