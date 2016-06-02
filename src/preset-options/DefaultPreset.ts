import { IOptions } from "../interfaces/IOptions";

export const DEFAULT_PRESET: IOptions = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    reservedNames: [],
    rotateUnicodeArray: true,
    encodeUnicodeLiterals: false,
    unicodeArray: true,
    wrapUnicodeArrayCalls: true
});
