import { injectable } from 'inversify';

import { IObfuscationResult } from './interfaces/IObfuscationResult';

import { initializable } from './decorators/Initializable';

@injectable()
export class ObfuscationResult implements IObfuscationResult {
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
     * @param {string} obfuscatedCode
     * @param {string} sourceMap
     */
    public initialize (obfuscatedCode: string, sourceMap: string): void {
        this.obfuscatedCode = obfuscatedCode;
        this.sourceMap = sourceMap;
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
