import { TDictionary } from '../../types/TDictionary';

export interface ITransformerNamesGroupsBuilder <
    TTransformerName extends string,
    TTransformer
> {
    /**
     * @param {TDictionary<TTransformer>} normalizedTransformers
     * @returns {TTransformerName[][]}
     */
    build (normalizedTransformers: TDictionary<TTransformer>): TTransformerName[][];
}
