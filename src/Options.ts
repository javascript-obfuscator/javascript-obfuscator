import { IOptions } from "./interfaces/IOptions";
import { IOptionsPreset } from "./interfaces/IOptionsPreset";

import { OptionsNormalizer } from "./OptionsNormalizer";

import { DEFAULT_PRESET } from "./preset-options/DefaultPreset";

export class Options implements IOptions {
    /**
     * @type {IOptionsPreset}
     */
    private options: IOptionsPreset;

    /**
     * @param options
     */
    constructor (options: IOptionsPreset) {
        this.options = Object.freeze(
            OptionsNormalizer.normalizeOptionsPreset(
                Object.assign({}, DEFAULT_PRESET, options)
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
