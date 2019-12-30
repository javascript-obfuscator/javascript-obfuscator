import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TNodeTransformersRelationEdge } from '../types/node-transformers/TNodeTransformersRelationEdge';
import { TNormalizedNodeTransformers } from '../types/node-transformers/TNormalizedNodeTransformers';

import { ILevelledTopologicalSorter } from '../interfaces/utils/ILevelledTopologicalSorter';
import { INodeTransformer } from '../interfaces/node-transformers/INodeTransformer';
import { INodeTransformerNamesGroupsBuilder } from '../interfaces/utils/INodeTransformerNamesGroupsBuilder';

import { NodeTransformer } from '../enums/node-transformers/NodeTransformer';

@injectable()
export class NodeTransformerNamesGroupsBuilder implements INodeTransformerNamesGroupsBuilder {
    /**
     * @type {ILevelledTopologicalSorter<NodeTransformer>}
     */
    private readonly levelledTopologicalSorter: ILevelledTopologicalSorter<NodeTransformer>;

    constructor (
        @inject(ServiceIdentifiers.ILevelledTopologicalSorter)
            levelledTopologicalSorter: ILevelledTopologicalSorter<NodeTransformer>
    ) {
        this.levelledTopologicalSorter = levelledTopologicalSorter;
    }

    /**
     * Builds sorted NodeTransformer names by topological sort with levels
     *
     * @param {TNormalizedNodeTransformers} normalizedNodeTransformers
     * @returns {NodeTransformer[][]}
     */
    public build (normalizedNodeTransformers: TNormalizedNodeTransformers): NodeTransformer[][] {
        const nodeTransformerNames: NodeTransformer[] = <NodeTransformer[]>Object.keys(normalizedNodeTransformers);
        const relationEdges: TNodeTransformersRelationEdge[] = this.buildNodeTransformersRelationEdges(
            nodeTransformerNames,
            normalizedNodeTransformers
        );

        for (const [precedent, consequent] of relationEdges) {
            this.levelledTopologicalSorter.add(precedent, consequent);
        }

        return this.levelledTopologicalSorter.sortByGroups();
    }

    /**
     * @param {NodeTransformer[]} nodeTransformerNames
     * @param {TNormalizedNodeTransformers} normalizedNodeTransformers
     * @returns {[NodeTransformer, NodeTransformer][]}
     */
    private buildNodeTransformersRelationEdges (
        nodeTransformerNames: NodeTransformer[],
        normalizedNodeTransformers: TNormalizedNodeTransformers
    ): TNodeTransformersRelationEdge[] {
        const relationEdges: TNodeTransformersRelationEdge[] = [];

        for (const nodeTransformerName of nodeTransformerNames) {
            const nodeTransformer: INodeTransformer = normalizedNodeTransformers[nodeTransformerName];
            const runAfterRelations: NodeTransformer[] | undefined = nodeTransformer.runAfter;

            if (!runAfterRelations || !runAfterRelations.length) {
                relationEdges.push([nodeTransformerName, null]);
                continue;
            }

            for (const runAfterRelation of runAfterRelations) {
                const isUnknownRelation: boolean = !normalizedNodeTransformers[runAfterRelation];

                if (isUnknownRelation) {
                    relationEdges.push([nodeTransformerName, null]);
                    continue;
                }

                relationEdges.push([runAfterRelation, nodeTransformerName]);
            }
        }

        return relationEdges;
    }
}
