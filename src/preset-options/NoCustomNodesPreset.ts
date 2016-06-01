import { IOptions } from "../interfaces/IOptions";

export const NO_CUSTOM_NODES_PRESET: IOptions = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    encodeUnicodeArray: false,
    rotateUnicodeArray: false,
    unicodeArray: false,
    wrapUnicodeArrayCalls: false
});
