import { TIdentifierNamesCache } from '../../types/TIdentifierNamesCache';

import { IInitializable } from '../IInitializable';
import { IOptions } from '../options/IOptions';

export interface IObfuscationResult extends IInitializable <[string, string]> {
    /**
     * @returns {TIdentifierNamesCache}
     */
    getIdentifierNamesCache (): TIdentifierNamesCache;

    /**
     * @return {string}
     */
    getObfuscatedCode (): string;

    /**
     * @return {IOptions}
     */
    getOptions (): IOptions;

    /**
     * @return {string}
     */
    getSourceMap (): string;
}
