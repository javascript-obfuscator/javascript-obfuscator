import { IObfuscatorOptions } from 'app/interfaces/IObfuscatorOptions';

import { SourceMapMode } from 'app/enums/SourceMapMode';

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
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    unicodeArray: true,
    unicodeArrayThreshold: 0.8,
    wrapUnicodeArrayCalls: true
});
