import { IObfuscatorOptions } from '../interfaces/IObfuscatorOptions';

import { SourceMapMode } from '../enums/SourceMapMode';

export const DEFAULT_PRESET: IObfuscatorOptions = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: [],
    reservedNames: [],
    rotateUnicodeArray: true,
    selfDefending: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    unicodeArray: true,
    unicodeArrayEncoding: false,
    unicodeArrayThreshold: 0.8
});
