import { IObfuscatorOptions } from "./interfaces/IObfuscatorOptions";
import { IOptions } from "./interfaces/IOptions";

import { TSourceMapMode } from "./types/TSourceMapMode";

import { OptionsNormalizer } from "./OptionsNormalizer";

import { DEFAULT_PRESET } from "./preset-options/DefaultPreset";

export class Options implements IOptions {
    /**
     * @type {boolean}
     */
    public readonly compact: boolean;

    /**
     * @type {boolean}
     */
    public readonly debugProtection: boolean;

    /**
     * @type {boolean}
     */
    public readonly debugProtectionInterval: boolean;

    /**
     * @type {boolean}
     */
    public readonly disableConsoleOutput: boolean;

    /**
     * @type {boolean}
     */
    public readonly encodeUnicodeLiterals: boolean;

    /**
     * @type {string[]}
     */
    public readonly reservedNames: string[];

    /**
     * @type {boolean}
     */
    public readonly rotateUnicodeArray: boolean;

    /**
     * @type {boolean}
     */
    public readonly selfDefending: boolean;

    /**
     * @type {boolean}
     */
    public readonly sourceMap?: boolean;

    /**
     * @type {TSourceMapMode}
     */
    public readonly sourceMapMode: TSourceMapMode;

    /**
     * @type {boolean}
     */
    public readonly unicodeArray: boolean;

    /**
     * @type {number}
     */
    public readonly unicodeArrayThreshold: number;

    /**
     * @type {boolean}
     */
    public readonly wrapUnicodeArrayCalls: boolean;

    /**
     * @param obfuscatorOptions
     */
    constructor (obfuscatorOptions: IObfuscatorOptions) {
        let options: IObfuscatorOptions = Object.assign({}, DEFAULT_PRESET, obfuscatorOptions);

        for (let option in options) {
            if (!options.hasOwnProperty(option) || !this.hasOwnProperty(option)) {
                continue;
            }

            this[option] = options[option];
        }
    }
}
