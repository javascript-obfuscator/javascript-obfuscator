import { IObfuscatorOptions } from '../interfaces/IObfuscatorOptions';

import { SourceMapMode } from '../enums/SourceMapMode';

export const DEFAULT_PRESET: IObfuscatorOptions = Object.freeze({
    compact: true,
    controlFlow: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: [],
    reservedNames: [],
    rotateStringArray: true,
    selfDefending: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.8,
    unicodeEscapeSequence: true
});
