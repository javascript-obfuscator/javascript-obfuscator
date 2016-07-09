import { TSourceMapMode } from "../types/TSourceMapMode";

export interface IOptionsPreset {
    compact?: boolean;
    debugProtection?: boolean;
    debugProtectionInterval?: boolean;
    disableConsoleOutput?: boolean;
    encodeUnicodeLiterals?: boolean;
    reservedNames?: string[];
    rotateUnicodeArray?: boolean;
    selfDefending?: boolean;
    sourceMap?: boolean;
    sourceMapMode?: TSourceMapMode;
    unicodeArray?: boolean;
    unicodeArrayThreshold?: number;
    wrapUnicodeArrayCalls?: boolean;
    [key: string]: any;
}
