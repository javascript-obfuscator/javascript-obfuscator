export type TTransformersRelationEdge<TTransformerName extends string> = [
    transformerNameA: TTransformerName,
    transformerNameB: TTransformerName | null
];
