import { inject, injectable } from 'inversify';

import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';

import { TNodeTransformerFactory } from '../types/container/node-transformers/TNodeTransformerFactory';
import { TDictionary } from '../types/TDictionary';
import { TVisitorDirection } from '../types/node-transformers/TVisitorDirection';
import { TVisitorFunction } from '../types/node-transformers/TVisitorFunction';
import { TVisitorResult } from '../types/node-transformers/TVisitorResult';

import { INodeTransformer } from '../interfaces/node-transformers/INodeTransformer';
import { INodeTransformersRunner } from '../interfaces/node-transformers/INodeTransformersRunner';
import { ITransformerNamesGroupsBuilder } from '../interfaces/utils/ITransformerNamesGroupsBuilder';
import { IVisitor } from '../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../enums/node-transformers/NodeTransformationStage';
import { VisitorDirection } from '../enums/node-transformers/VisitorDirection';

import { NodeGuards } from '../node/NodeGuards';
import { NodeMetadata } from '../node/NodeMetadata';

import ProgressBar from 'progress';

@injectable()
export class NodeTransformersRunner implements INodeTransformersRunner {
    /**
     * @type {TNodeTransformerFactory}
     */
    private readonly nodeTransformerFactory: TNodeTransformerFactory;

    /**
     * @type {ITransformerNamesGroupsBuilder}
     */
    private readonly nodeTransformerNamesGroupsBuilder: ITransformerNamesGroupsBuilder<
        NodeTransformer,
        INodeTransformer
    >;

    /**
     * @param {TNodeTransformerFactory} nodeTransformerFactory
     * @param {ITransformerNamesGroupsBuilder} nodeTransformerNamesGroupsBuilder
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__INodeTransformer)
            nodeTransformerFactory: TNodeTransformerFactory,
        @inject(ServiceIdentifiers.INodeTransformerNamesGroupsBuilder)
            nodeTransformerNamesGroupsBuilder: ITransformerNamesGroupsBuilder<
                NodeTransformer,
                INodeTransformer
            >,
    ) {
        this.nodeTransformerFactory = nodeTransformerFactory;
        this.nodeTransformerNamesGroupsBuilder = nodeTransformerNamesGroupsBuilder;
    }

    /**
     * @param {T} astTree
     * @param {NodeTransformer[]} nodeTransformerNames
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {T}
     */
    public transform <T extends ESTree.Node = ESTree.Program> (
        astTree: T,
        nodeTransformerNames: NodeTransformer[],
        nodeTransformationStage: NodeTransformationStage
    ): T {
        if (!nodeTransformerNames.length) {
            return astTree;
        }

        const normalizedNodeTransformers: TDictionary<INodeTransformer> =
            this.buildNormalizedNodeTransformers(nodeTransformerNames, nodeTransformationStage);
        const nodeTransformerNamesGroups: NodeTransformer[][] =
            this.nodeTransformerNamesGroupsBuilder.build(normalizedNodeTransformers);
        const nodeTransformerEntries = nodeTransformerNamesGroups.entries();

        for (const [i, nodeTransformerNamesGroup] of nodeTransformerEntries) {
            const enterVisitors: IVisitor[] = [];
            const leaveVisitors: IVisitor[] = [];

            for (const nodeTransformerName of nodeTransformerNamesGroup) {
                const nodeTransformer: INodeTransformer = normalizedNodeTransformers[nodeTransformerName];
                const visitor: IVisitor | null = nodeTransformer.getVisitor(nodeTransformationStage);

                if (!visitor) {
                    continue;
                }

                if (visitor.enter) {
                    enterVisitors.push({ enter: visitor.enter });
                }

                if (visitor.leave) {
                    leaveVisitors.push({ leave: visitor.leave });
                }
            }

            if (!enterVisitors.length && !leaveVisitors.length) {
                continue;
            }

            let totalNodes = 0;
            estraverse.traverse(astTree, {enter: () => totalNodes++});
            const nodeBar = new ProgressBar(
                `Node Progress ${i + 1}/${nodeTransformerNamesGroups.length} [:bar] :current/:total (:percent) :etas`,
                {
                    total: totalNodes,
                    width: 40,
                    clear: true
                }
            );

            estraverse.replace(astTree, {
                enter: (node, parentNode) => {
                    // Ensure that the progress bar is not at 100% after the last node
                    if (nodeBar.curr >= totalNodes) {
                        totalNodes++;
                        nodeBar.total = totalNodes;
                        nodeBar.complete = false;
                        nodeBar.update(nodeBar.curr / nodeBar.total);
                    } else {
                        nodeBar.tick();
                    }
                    
                    return  this.mergeVisitorsForDirection(enterVisitors, VisitorDirection.Enter)(node, parentNode);
                },
                leave: (node, parentNode) => this.mergeVisitorsForDirection(leaveVisitors, VisitorDirection.Leave)(node, parentNode)
            });

            // Ensure that the progress bar is at 100% after the last node
            nodeBar.update(1);
            nodeBar.terminate();
        }

        return astTree;
    }

    /**
     * @param {NodeTransformer[]} nodeTransformerNames
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {TDictionary<INodeTransformer>}
     */
    private buildNormalizedNodeTransformers (
        nodeTransformerNames: NodeTransformer[],
        nodeTransformationStage: NodeTransformationStage
    ): TDictionary<INodeTransformer> {
        return nodeTransformerNames
            .reduce<TDictionary<INodeTransformer>>(
                (acc: TDictionary<INodeTransformer>, nodeTransformerName: NodeTransformer) => {
                    const nodeTransformer: INodeTransformer = this.nodeTransformerFactory(nodeTransformerName);

                    if (!nodeTransformer.getVisitor(nodeTransformationStage)) {
                        return acc;
                    }

                    return <TDictionary<INodeTransformer>>{
                        ...acc,
                        [nodeTransformerName]: nodeTransformer
                    };
                },
                {}
            );
    }

    /**
     * @param {IVisitor[]} visitors
     * @param {TVisitorDirection} direction
     * @returns {TVisitorFunction}
     */
    private mergeVisitorsForDirection (visitors: IVisitor[], direction: TVisitorDirection): TVisitorFunction {
        const visitorsLength: number = visitors.length;

        if (!visitorsLength) {
            return (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node => node;
        }

        return (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | estraverse.VisitorOption => {
            if (NodeMetadata.isIgnoredNode(node)) {
                return estraverse.VisitorOption.Skip;
            }

            for (let i: number = 0; i < visitorsLength; i++) {
                const visitorFunction: TVisitorFunction | undefined = visitors[i][direction];

                if (!visitorFunction) {
                    continue;
                }

                const visitorResult: TVisitorResult = visitorFunction(node, parentNode);
                const isValidVisitorResult = visitorResult && NodeGuards.isNode(visitorResult);

                if (!isValidVisitorResult) {
                    continue;
                }

                node = visitorResult;
            }

            return node;
        };
    }
}
