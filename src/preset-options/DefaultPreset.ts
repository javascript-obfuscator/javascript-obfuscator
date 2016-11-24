import { IInputOptions } from '../interfaces/IInputOptions';

import { SourceMapMode } from '../enums/SourceMapMode';

export const DEFAULT_PRESET: IInputOptions = Object.freeze({
    compact: true,
    controlFlowFlattening: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: [],
    reservedNames: [],
    rotateStringArray: true,
    seed: 0,
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
