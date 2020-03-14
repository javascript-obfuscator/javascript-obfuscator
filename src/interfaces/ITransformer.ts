export interface ITransformer <TTransformerName extends string> {
    /**
     * @type {TTransformerName[] | undefined}
     */
    runAfter?: TTransformerName[];
}
