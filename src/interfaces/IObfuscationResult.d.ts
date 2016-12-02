import { IInitializable } from './IInitializable';

export interface IObfuscationResult extends IInitializable {
    /**
     * @return {string}
     */
    getObfuscatedCode (): string;

    /**
     * @return {string}
     */
    getSourceMap (): string;
}
