import { IOptions } from './IOptions';

export interface ICLIOptions extends IOptions {
    readonly config: string;
    readonly exclude: string[];
    readonly output: string;
    readonly version: string;
}
