import { injectable } from "inversify";

import { IOptions } from "./interfaces/IOptions";
import { IOptionsPreset } from "./interfaces/IOptionsPreset";

import { DEFAULT_PRESET } from "./preset-options/DefaultPreset";

@injectable()
export class Options implements IOptions {
    /**
     * @type {IOptionsPreset}
     */
    private static DISABLED_UNICODE_ARRAY_OPTIONS: IOptionsPreset = {
        encodeUnicodeLiterals: false,
        rotateUnicodeArray: false,
        unicodeArray: false,
        unicodeArrayThreshold: 0,
        wrapUnicodeArrayCalls: false
    };

    /**
     * @type {IOptionsPreset}
     */
    private options: IOptionsPreset;

    /**
     * @type {IOptionsPreset}
     */
    public static SELF_DEFENDING_OPTIONS: IOptionsPreset = {
        compact: true,
        selfDefending: true
    };

    /**
     * @param options
     */
    public assign (options: IOptionsPreset): void {
        if (this.options) {
            throw new Error('Options can\'t be reassigned!');
        }

        this.options = Object.assign({}, DEFAULT_PRESET, options);

        this.normalizeOptions();
    }

    /**
     * @param optionName
     * @returns {any}
     */
    public getOption (optionName: string): any {
        return this.options[optionName];
    }

    /**
     * @returns {IOptionsPreset}
     */
    public getOptions (): IOptionsPreset {
        return this.options;
    }

    private normalizeOptions (): void {
        let normalizedOptions: IOptionsPreset = Object.assign({}, this.options);

        normalizedOptions = Options.unicodeArrayRule(normalizedOptions);
        normalizedOptions = Options.unicodeArrayThresholdRule(normalizedOptions);
        normalizedOptions = Options.selfDefendingRule(normalizedOptions);

        this.options = Object.freeze(normalizedOptions);
    }

    /**
     * @param options
     * @returns {IOptionsPreset}
     */
    private static selfDefendingRule (options: IOptionsPreset): IOptionsPreset {
        if (options['selfDefending']) {
            Object.assign(options, Options.SELF_DEFENDING_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptionsPreset}
     */
    private static unicodeArrayRule (options: IOptionsPreset): IOptionsPreset {
        if (!options['unicodeArray']) {
            Object.assign(options, Options.DISABLED_UNICODE_ARRAY_OPTIONS);
        }

        return options;
    }

    /**
     * @param options
     * @returns {IOptionsPreset}
     */
    private static unicodeArrayThresholdRule (options: IOptionsPreset): IOptionsPreset {
        const minValue: number = 0,
            maxValue: number = 1;

        options['unicodeArrayThreshold'] = Math.min(
            Math.max(
                options['unicodeArrayThreshold'],
                minValue
            ),
            maxValue
        );

        return options;
    }
}
