import { IOptions } from './IOptions';

export interface ICLIOptions extends IOptions {
    readonly dangerouslyOverwrite: boolean;
    readonly config: string;
    readonly exclude: string[];
    readonly identifierNamesCachePath: string;
    readonly output: string;
    readonly version: string;
}
