import { IInitializable } from '../IInitializable';

export interface IObfuscatedCode extends IInitializable {
    /**
     * @return {string}
     */
    getObfuscatedCode (): string;

    /**
     * @return {string}
     */
    getSourceMap (): string;
}
