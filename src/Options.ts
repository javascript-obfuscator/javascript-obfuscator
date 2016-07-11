import { IObfuscatorOptions } from "./interfaces/IObfuscatorOptions";
import { IOptions } from "./interfaces/IOptions";

import { OptionsNormalizer } from "./OptionsNormalizer";

import { DEFAULT_PRESET } from "./preset-options/DefaultPreset";

export class Options implements IOptions {
    /**
     * @type {IObfuscatorOptions}
     */
    private options: IObfuscatorOptions;

    /**
     * @param obfuscatorOptions
     */
    constructor (obfuscatorOptions: IObfuscatorOptions) {
        this.options = Object.freeze(
            OptionsNormalizer.normalizeOptionsPreset(
                Object.assign({}, DEFAULT_PRESET, obfuscatorOptions)
            )
        );
    }

    /**
     * @param optionName
     * @returns {T}
     */
    public get <T> (optionName: string): T {
        return this.options[optionName];
    }
}
