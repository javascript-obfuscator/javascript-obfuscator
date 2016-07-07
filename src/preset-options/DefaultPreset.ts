import { IOptionsPreset } from "../interfaces/IOptionsPreset";

import { SourceMapMode } from "../enums/SourceMapMode";

export const DEFAULT_PRESET: IOptionsPreset = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    encodeUnicodeLiterals: false,
    reservedNames: [],
    rotateUnicodeArray: true,
    selfDefending: true,
    sourceMap: false,
    sourceMapMode: SourceMapMode.Separate,
    unicodeArray: true,
    unicodeArrayThreshold: 0.8,
    wrapUnicodeArrayCalls: true
});
