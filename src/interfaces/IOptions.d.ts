import { TSourceMapMode } from '../types/TSourceMapMode';
import { TUnicodeArrayEncoding } from '../types/TUnicodeArrayEncoding';

export interface IOptions {
    readonly compact: boolean;
    readonly debugProtection: boolean;
    readonly debugProtectionInterval: boolean;
    readonly disableConsoleOutput: boolean;
    readonly domainLock: string[];
    readonly reservedNames: string[];
    readonly rotateUnicodeArray: boolean;
    readonly selfDefending: boolean;
    readonly sourceMap: boolean;
    readonly sourceMapBaseUrl: string;
    readonly sourceMapFileName: string;
    readonly sourceMapMode: TSourceMapMode;
    readonly unicodeArray: boolean;
    readonly unicodeArrayEncoding: TUnicodeArrayEncoding;
    readonly unicodeArrayThreshold: number;
}
