import { TIdentifierNamesCache } from '../types/TIdentifierNamesCache';
import { IProObfuscationResult, IProObfuscationResultInit } from '../interfaces/pro-api/IProApiClient';

/**
 * Pro API Obfuscation Result
 * Simplified result type for Pro API responses
 */
export class ProApiObfuscationResult implements IProObfuscationResult {
    private readonly obfuscatedCode: string;
    private readonly sourceMapValue: string;
    private readonly identifierNamesCache: TIdentifierNamesCache;

    public constructor({ code, sourceMap = '', identifierNamesCache = null }: IProObfuscationResultInit) {
        this.obfuscatedCode = code;
        this.sourceMapValue = sourceMap;
        this.identifierNamesCache = identifierNamesCache;
    }

    public getObfuscatedCode(): string {
        return this.obfuscatedCode;
    }

    public getSourceMap(): string {
        return this.sourceMapValue;
    }

    public getIdentifierNamesCache(): TIdentifierNamesCache {
        return this.identifierNamesCache;
    }

    public toString(): string {
        return this.obfuscatedCode;
    }
}
