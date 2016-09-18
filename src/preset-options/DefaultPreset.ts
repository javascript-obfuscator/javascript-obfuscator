import { IObfuscatorOptions } from "../interfaces/IObfuscatorOptions";

import { SourceMapMode } from "../enums/SourceMapMode";

export const DEFAULT_PRESET: IObfuscatorOptions = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: [],
    encodeUnicodeLiterals: false,
    reservedNames: [],
    rotateUnicodeArray: true,
    selfDefending: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapMode: SourceMapMode.Separate,
    unicodeArray: true,
    unicodeArrayThreshold: 0.8,
    wrapUnicodeArrayCalls: true
});
