import { TIdentifierNamesCache } from '../types/TIdentifierNamesCache';
import { IProObfuscationResult } from '../interfaces/pro-api/IProApiClient';

/**
 * Pro API Obfuscation Result
 * Simplified result type for Pro API responses
 */
export class ProApiObfuscationResult implements IProObfuscationResult {
    private readonly obfuscatedCode: string;
    private readonly sourceMapValue: string;

    public constructor(code: string, sourceMap: string = '') {
        this.obfuscatedCode = code;
        this.sourceMapValue = sourceMap;
    }

    public getObfuscatedCode(): string {
        return this.obfuscatedCode;
    }

    public getSourceMap(): string {
        return this.sourceMapValue;
    }

    public getIdentifierNamesCache(): TIdentifierNamesCache {
        return null;
    }

    public toString(): string {
        return this.obfuscatedCode;
    }
}
