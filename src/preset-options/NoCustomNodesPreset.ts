import { IObfuscatorOptions } from 'app/interfaces/IObfuscatorOptions';

import { SourceMapMode } from 'app/enums/SourceMapMode';

export const NO_CUSTOM_NODES_PRESET: IObfuscatorOptions = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    encodeUnicodeLiterals: false,
    reservedNames: [],
    rotateUnicodeArray: false,
    selfDefending: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    unicodeArray: false,
    unicodeArrayThreshold: 0,
    wrapUnicodeArrayCalls: false
});
