import { TSourceMapMode } from '../types/TSourceMapMode';
import { TUnicodeArrayEncoding } from '../types/TUnicodeArrayEncoding';

export interface IObfuscatorOptions {
    compact?: boolean;
    debugProtection?: boolean;
    debugProtectionInterval?: boolean;
    disableConsoleOutput?: boolean;
    domainLock?: string[];
    reservedNames?: string[];
    rotateUnicodeArray?: boolean;
    selfDefending?: boolean;
    sourceMap?: boolean;
    sourceMapBaseUrl?: string;
    sourceMapFileName?: string;
    sourceMapMode?: TSourceMapMode;
    unicodeArray?: boolean;
    unicodeArrayEncoding?: TUnicodeArrayEncoding;
    unicodeArrayThreshold?: number;
    [key: string]: any;
}
