import { TIdentifierNamesCache } from '../../types/caches/TIdentifierNamesCache';
import { IInitializable } from '../IInitializable';

export interface IObfuscatedCode extends IInitializable <[string, string]> {
    /**
     * @returns {TIdentifierNamesCache}
     */
    getIdentifierNamesCache (): TIdentifierNamesCache;

    /**
     * @return {string}
     */
    getObfuscatedCode (): string;

    /**
     * @return {string}
     */
    getSourceMap (): string;
}
