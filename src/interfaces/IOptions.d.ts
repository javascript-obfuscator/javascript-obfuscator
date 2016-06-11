import { IOptionsPreset } from "./IOptionsPreset";

export interface IOptions {
    /**
     * @param options
     */
    assign (options: IOptionsPreset): void;

    /**
     * @param optionName
     */
    getOption (optionName: string): any;

    getOptions (): IOptionsPreset;
}
