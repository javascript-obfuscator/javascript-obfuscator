import { IObfuscationResult } from './interfaces/IObfuscationResult';

export class ObfuscationResult implements IObfuscationResult {
    /**
     * @type {string}
     */
    private obfuscatedCode: string;

    /**
     * @type {string}
     */
    private sourceMap: string;

    /**
     * @param obfuscatedCode
     * @param sourceMap
     */
    constructor (obfuscatedCode: string, sourceMap: string) {
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
