import { IOptions } from "../interfaces/IOptions";

export const DEFAULT_PRESET: IOptions = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    encodeUnicodeLiterals: false,
    reservedNames: [],
    rotateUnicodeArray: true,
    selfDefending: true,
    unicodeArray: true,
    wrapUnicodeArrayCalls: true
});
