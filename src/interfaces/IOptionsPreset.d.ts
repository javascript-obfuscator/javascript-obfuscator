export interface IOptionsPreset {
    compact?: boolean;
    debugProtection?: boolean;
    debugProtectionInterval?: boolean;
    disableConsoleOutput?: boolean;
    encodeUnicodeLiterals?: boolean;
    reservedNames?: string[];
    rotateUnicodeArray?: boolean;
    selfDefending?: boolean;
    unicodeArray?: boolean;
    unicodeArrayThreshold?: number;
    wrapUnicodeArrayCalls?: boolean;
    [key: string]: any;
}
