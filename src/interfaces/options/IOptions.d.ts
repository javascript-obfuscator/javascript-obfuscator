import { TSourceMapMode } from '../../types/TSourceMapMode';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';

export interface IOptions {
    readonly compact: boolean;
    readonly controlFlowFlattening: boolean;
    readonly debugProtection: boolean;
    readonly debugProtectionInterval: boolean;
    readonly disableConsoleOutput: boolean;
    readonly domainLock: string[];
    readonly reservedNames: string[];
    readonly rotateStringArray: boolean;
    readonly seed: number;
    readonly selfDefending: boolean;
    readonly sourceMap: boolean;
    readonly sourceMapBaseUrl: string;
    readonly sourceMapFileName: string;
    readonly sourceMapMode: TSourceMapMode;
    readonly stringArray: boolean;
    readonly stringArrayEncoding: TStringArrayEncoding;
    readonly stringArrayThreshold: number;
    readonly unicodeEscapeSequence: boolean;
}
