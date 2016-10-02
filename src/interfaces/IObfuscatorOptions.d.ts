import { TSourceMapMode } from '../types/TSourceMapMode';

export interface IObfuscatorOptions {
    compact?: boolean;
    debugProtection?: boolean;
    debugProtectionInterval?: boolean;
    disableConsoleOutput?: boolean;
    domainLock?: string[];
    encodeUnicodeLiterals?: boolean;
    reservedNames?: string[];
    rotateUnicodeArray?: boolean;
    selfDefending?: boolean;
    sourceMap?: boolean;
    sourceMapBaseUrl?: string;
    sourceMapFileName?: string;
    sourceMapMode?: TSourceMapMode;
    unicodeArray?: boolean;
    unicodeArrayThreshold?: number;
    wrapUnicodeArrayCalls?: boolean;
    [key: string]: any;
}
