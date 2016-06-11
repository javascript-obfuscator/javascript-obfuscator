import { IOptionsPreset } from "./IOptionsPreset";

export interface IOptions {
    /**
     * @param optionName
     */
    get <T> (optionName: string): T;
}
