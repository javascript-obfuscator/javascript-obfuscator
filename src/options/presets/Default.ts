import { TInputOptions } from '../../types/options/TInputOptions';

import { SourceMapMode } from '../../enums/SourceMapMode';

export const DEFAULT_PRESET: TInputOptions = Object.freeze({
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: [],
    reservedNames: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.8,
    unicodeEscapeSequence: true
});
