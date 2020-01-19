import { IInitializable } from '../IInitializable';

export interface IObfuscatedCode extends IInitializable <[string, string]> {
    /**
     * @return {string}
     */
    getObfuscatedCode (): string;

    /**
     * @return {string}
     */
    getSourceMap (): string;
}
