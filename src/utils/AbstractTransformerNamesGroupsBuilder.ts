import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TDictionary } from '../types/TDictionary';
import { TTransformersRelationEdge } from '../types/utils/TTransformersRelationEdge';

import { ILevelledTopologicalSorter } from '../interfaces/utils/ILevelledTopologicalSorter';
import { ITransformer } from '../interfaces/ITransformer';
import { ITransformerNamesGroupsBuilder } from '../interfaces/utils/ITransformerNamesGroupsBuilder';

@injectable()
export abstract class AbstractTransformerNamesGroupsBuilder <
    TTransformerName extends string,
    TTransformer extends ITransformer<TTransformerName>
> implements ITransformerNamesGroupsBuilder <
    TTransformerName,
    TTransformer
> {
    /**
     * @type {ILevelledTopologicalSorter<TTransformerName>}
     */
    private readonly levelledTopologicalSorter: ILevelledTopologicalSorter<TTransformerName>;

    public constructor (
        @inject(ServiceIdentifiers.ILevelledTopologicalSorter)
            levelledTopologicalSorter: ILevelledTopologicalSorter<TTransformerName>
    ) {
        this.levelledTopologicalSorter = levelledTopologicalSorter;
    }

    /**
     * Builds sorted transformer names by topological sort with levels
     *
     * For example, if SplitString transformer has following dependencies inside `runAfter` property:
     *  - NodeTransformer.ObjectExpressionKeysTransformer,
     *  - NodeTransformer.TemplateLiteralTransformer
     *
     *  Than result node transformer names groups will be like:
     *  [
     *      [
     *          SomeTransformerA,
     *          ObjectExpressionKeysTransformer,
     *          TemplateLiteralTransformer,
     *          SomeTransformerB
     *      ],
     *      [
     *          SplitStringTransformer
     *      ]
     *  ]
     *
     * @param {TDictionary<TTransformer>} normalizedTransformers
     * @returns {TTransformerName[][]}
     */
    public build (normalizedTransformers: TDictionary<TTransformer>): TTransformerName[][] {
        const transformerNames: TTransformerName[] = <TTransformerName[]>Object.keys(normalizedTransformers);
        const relationEdges: TTransformersRelationEdge<TTransformerName>[] = this.buildTransformersRelationEdges(
            transformerNames,
            normalizedTransformers
        );

        for (const [precedent, consequent] of relationEdges) {
            this.levelledTopologicalSorter.add(precedent, consequent);
        }

        return this.levelledTopologicalSorter.sortByGroups();
    }

    /**
     * @param {TTransformerName[]} transformerNames
     * @param {TDictionary<TTransformer>} normalizedTransformers
     * @returns {TTransformersRelationEdge<TTransformerName>[]}
     */
    private buildTransformersRelationEdges (
        transformerNames: TTransformerName[],
        normalizedTransformers: TDictionary<TTransformer>
    ): TTransformersRelationEdge<TTransformerName>[] {
        const relationEdges: TTransformersRelationEdge<TTransformerName>[] = [];

        for (const transformerName of transformerNames) {
            const transformer: TTransformer = normalizedTransformers[transformerName];
            const runAfterRelations: TTransformerName[] | undefined = transformer.runAfter;

            if (!runAfterRelations || !runAfterRelations.length) {
                relationEdges.push([transformerName, null]);
                continue;
            }

            for (const runAfterRelation of runAfterRelations) {
                const isUnknownRelation: boolean = normalizedTransformers[runAfterRelation] === undefined;

                if (isUnknownRelation) {
                    relationEdges.push([transformerName, null]);
                    continue;
                }

                relationEdges.push([runAfterRelation, transformerName]);
            }
        }

        return relationEdges;
    }
}
