import { IObfuscatorOptions } from '../interfaces/IObfuscatorOptions';

import { SourceMapMode } from '../enums/SourceMapMode';

export const DEFAULT_PRESET: IObfuscatorOptions = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: [],
    reservedNames: [],
    rotateStringsArray: true,
    selfDefending: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    stringsArray: true,
    stringsArrayEncoding: false,
    stringsArrayThreshold: 0.8,
    unicodeEscapeSequence: true
});
