import { TSourceMapMode } from '../types/TSourceMapMode';
import { TStringsArrayEncoding } from '../types/TStringsArrayEncoding';

export interface IOptions {
    readonly compact: boolean;
    readonly debugProtection: boolean;
    readonly debugProtectionInterval: boolean;
    readonly disableConsoleOutput: boolean;
    readonly domainLock: string[];
    readonly reservedNames: string[];
    readonly rotateStringsArray: boolean;
    readonly selfDefending: boolean;
    readonly sourceMap: boolean;
    readonly sourceMapBaseUrl: string;
    readonly sourceMapFileName: string;
    readonly sourceMapMode: TSourceMapMode;
    readonly stringsArray: boolean;
    readonly stringsArrayEncoding: TStringsArrayEncoding;
    readonly stringsArrayThreshold: number;
    readonly unicodeEscapeSequence: boolean;
}
