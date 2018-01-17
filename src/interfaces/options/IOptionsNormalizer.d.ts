import { IOptions } from './IOptions';

export interface IOptionsNormalizer {
    /**
     * @param {IOptions} options
     * @returns {IOptions}
     */
    normalize (options: IOptions): IOptions;
}
