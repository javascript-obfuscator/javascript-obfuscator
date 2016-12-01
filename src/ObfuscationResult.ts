import { injectable } from 'inversify';

import { IObfuscationResult } from './interfaces/IObfuscationResult';

@injectable()
export class ObfuscationResult implements IObfuscationResult {
    /**
     * @type {boolean}
     */
    public initialized: boolean = false;

    /**
     * @type {string}
     */
    private obfuscatedCode: string;

    /**
     * @type {string}
     */
    private sourceMap: string;

    public checkInitialization (): void {
        if (!this.initialized) {
            throw new Error(`\`ObfuscationResult\` should be initialized first by calling \`initialize\` method!`);
        }
    }

    /**
     * @param obfuscatedCode
     * @param sourceMap
     */
    public initialize (obfuscatedCode: string, sourceMap: string): void {
        this.obfuscatedCode = obfuscatedCode;
        this.sourceMap = sourceMap;

        this.initialized = true;
    }

    /**
     * @returns {string}
     */
    public getObfuscatedCode (): string {
        this.checkInitialization();

        return this.obfuscatedCode;
    }

    /**
     * @returns {string}
     */
    public getSourceMap (): string {
        this.checkInitialization();

        return this.sourceMap;
    }

    /**
     * @returns {string}
     */
    public toString (): string {
        this.checkInitialization();

        return this.obfuscatedCode;
    }
}
