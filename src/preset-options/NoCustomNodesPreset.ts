import { IObfuscatorOptions } from '../interfaces/IObfuscatorOptions';

import { SourceMapMode } from '../enums/SourceMapMode';

export const NO_CUSTOM_NODES_PRESET: IObfuscatorOptions = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    reservedNames: [],
    rotateStringsArray: false,
    selfDefending: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    stringsArray: false,
    stringsArrayEncoding: false,
    stringsArrayThreshold: 0,
    unicodeEscapeSequence: true
});
