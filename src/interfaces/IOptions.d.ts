import { TSourceMapMode } from "../types/TSourceMapMode";

export interface IOptions {
    readonly compact: boolean;
    readonly debugProtection: boolean;
    readonly debugProtectionInterval: boolean;
    readonly disableConsoleOutput: boolean;
    readonly encodeUnicodeLiterals: boolean;
    readonly reservedNames: string[];
    readonly rotateUnicodeArray: boolean;
    readonly selfDefending: boolean;
    readonly sourceMap: boolean;
    readonly sourceMapBaseUrl: string;
    readonly sourceMapMode: TSourceMapMode;
    readonly unicodeArray: boolean;
    readonly unicodeArrayThreshold: number;
    readonly wrapUnicodeArrayCalls: boolean;
    readonly domainLock: string[];
}
