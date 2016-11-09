import { TSourceMapMode } from '../types/TSourceMapMode';
import { TStringArrayEncoding } from '../types/TStringArrayEncoding';

export interface IObfuscatorOptions {
    compact?: boolean;
    debugProtection?: boolean;
    debugProtectionInterval?: boolean;
    disableConsoleOutput?: boolean;
    domainLock?: string[];
    reservedNames?: string[];
    rotateStringArray?: boolean;
    selfDefending?: boolean;
    sourceMap?: boolean;
    sourceMapBaseUrl?: string;
    sourceMapFileName?: string;
    sourceMapMode?: TSourceMapMode;
    stringArray?: boolean;
    stringArrayEncoding?: TStringArrayEncoding;
    stringArrayThreshold?: number;
    unicodeEscapeSequence?: boolean;
    [key: string]: any;
}
