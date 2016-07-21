import { IObfuscationResult } from "./IObfuscationResult";

export interface ISourceMapCorrector {
    correct (): IObfuscationResult;
}
