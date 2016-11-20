import { IObfuscatorOptions } from '../interfaces/IObfuscatorOptions';

import { SourceMapMode } from '../enums/SourceMapMode';

export const NO_CUSTOM_NODES_PRESET: IObfuscatorOptions = Object.freeze({
    compact: true,
    controlFlow: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    reservedNames: [],
    rotateStringArray: false,
    selfDefending: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    stringArray: false,
    stringArrayEncoding: false,
    stringArrayThreshold: 0,
    unicodeEscapeSequence: true
});
