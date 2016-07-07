import { IObfuscationResult } from "./interfaces/IObfuscationResult";

export class ObfuscationResult implements IObfuscationResult {
    /**
     * @type {string}
     */
    public obfuscatedCode: string;

    /**
     * @type {string}
     */
    public sourceMap: string;

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
    public toString (): string {
        return this.obfuscatedCode;
    }
}
