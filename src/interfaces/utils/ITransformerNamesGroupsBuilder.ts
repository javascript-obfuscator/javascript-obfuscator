import { TObject } from '../../types/TObject';

export interface ITransformerNamesGroupsBuilder <
    TTransformerName extends string,
    TTransformer
> {
    /**
     * @param {TObject<TTransformer>} normalizedTransformers
     * @returns {TTransformerName[][]}
     */
    build (normalizedTransformers: TObject<TTransformer>): TTransformerName[][];
}
