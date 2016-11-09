import { TSourceMapMode } from '../types/TSourceMapMode';
import { TStringsArrayEncoding } from '../types/TStringsArrayEncoding';

export interface IObfuscatorOptions {
    compact?: boolean;
    debugProtection?: boolean;
    debugProtectionInterval?: boolean;
    disableConsoleOutput?: boolean;
    domainLock?: string[];
    reservedNames?: string[];
    rotateStringsArray?: boolean;
    selfDefending?: boolean;
    sourceMap?: boolean;
    sourceMapBaseUrl?: string;
    sourceMapFileName?: string;
    sourceMapMode?: TSourceMapMode;
    stringsArray?: boolean;
    stringsArrayEncoding?: TStringsArrayEncoding;
    stringsArrayThreshold?: number;
    unicodeEscapeSequence?: boolean;
    [key: string]: any;
}
