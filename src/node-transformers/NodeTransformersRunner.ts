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

interface IVisitorsData {
    enterVisitors: IVisitor[];
    leaveVisitors: IVisitor[];
    runOnProgramNodeOnly: boolean;
}

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
    public constructor(
        @inject(ServiceIdentifiers.Factory__INodeTransformer)
        nodeTransformerFactory: TNodeTransformerFactory,
        @inject(ServiceIdentifiers.INodeTransformerNamesGroupsBuilder)
        nodeTransformerNamesGroupsBuilder: ITransformerNamesGroupsBuilder<NodeTransformer, INodeTransformer>
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
    public transform<T extends ESTree.Node = ESTree.Program>(
        astTree: T,
        nodeTransformerNames: NodeTransformer[],
        nodeTransformationStage: NodeTransformationStage
    ): T {
        if (!nodeTransformerNames.length) {
            return astTree;
        }

        const normalizedNodeTransformers: TDictionary<INodeTransformer> = this.buildNormalizedNodeTransformers(
            nodeTransformerNames,
            nodeTransformationStage
        );
        const nodeTransformerNamesGroups: NodeTransformer[][] =
            this.nodeTransformerNamesGroupsBuilder.build(normalizedNodeTransformers);

        for (const nodeTransformerNamesGroup of nodeTransformerNamesGroups) {
            const visitorsData: IVisitorsData = this.buildVisitorsData(
                nodeTransformerNamesGroup,
                normalizedNodeTransformers,
                nodeTransformationStage
            );
            const { enterVisitors, leaveVisitors } = visitorsData;

            if (!enterVisitors.length && !leaveVisitors.length) {
                continue;
            }

            if (this.canRunOnProgramNodeOnly(visitorsData, astTree)) {
                astTree = this.runOnProgramNodeOnly(astTree, enterVisitors);

                continue;
            }

            estraverse.replace(astTree, {
                enter: this.mergeVisitorsForDirection(enterVisitors, VisitorDirection.Enter),
                leave: this.mergeVisitorsForDirection(leaveVisitors, VisitorDirection.Leave)
            });
        }

        return astTree;
    }

    /**
     * @param {NodeTransformer[]} nodeTransformerNamesGroup
     * @param {TDictionary<INodeTransformer>} normalizedNodeTransformers
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitorsData}
     */
    private buildVisitorsData(
        nodeTransformerNamesGroup: NodeTransformer[],
        normalizedNodeTransformers: TDictionary<INodeTransformer>,
        nodeTransformationStage: NodeTransformationStage
    ): IVisitorsData {
        const enterVisitors: IVisitor[] = [];
        const leaveVisitors: IVisitor[] = [];
        let runOnProgramNodeOnly: boolean = true;

        for (const nodeTransformerName of nodeTransformerNamesGroup) {
            const nodeTransformer: INodeTransformer = normalizedNodeTransformers[nodeTransformerName];
            const visitor: IVisitor | null = nodeTransformer.getVisitor(nodeTransformationStage);

            if (!visitor) {
                continue;
            }

            if (!nodeTransformer.runOnProgramNodeOnly) {
                runOnProgramNodeOnly = false;
            }

            if (visitor.enter) {
                enterVisitors.push({ enter: visitor.enter });
            }

            if (visitor.leave) {
                leaveVisitors.push({ leave: visitor.leave });
            }
        }

        return { enterVisitors, leaveVisitors, runOnProgramNodeOnly };
    }

    /**
     * @param {IVisitorsData} visitorsData
     * @param {Node} astTree
     * @returns {boolean}
     */
    private canRunOnProgramNodeOnly(visitorsData: IVisitorsData, astTree: ESTree.Node): boolean {
        return (
            visitorsData.runOnProgramNodeOnly &&
            !visitorsData.leaveVisitors.length &&
            NodeGuards.isProgramNode(astTree)
        );
    }

    /**
     * @param {T} astTree
     * @param {IVisitor[]} enterVisitors
     * @returns {T}
     */
    private runOnProgramNodeOnly<T extends ESTree.Node>(astTree: T, enterVisitors: IVisitor[]): T {
        const visitorResult: TVisitorResult = this.mergeVisitorsForDirection(
            enterVisitors,
            VisitorDirection.Enter
        )(astTree, astTree.parentNode ?? null);

        return visitorResult && NodeGuards.isNode(visitorResult) ? <T>visitorResult : astTree;
    }

    /**
     * @param {NodeTransformer[]} nodeTransformerNames
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {TDictionary<INodeTransformer>}
     */
    private buildNormalizedNodeTransformers(
        nodeTransformerNames: NodeTransformer[],
        nodeTransformationStage: NodeTransformationStage
    ): TDictionary<INodeTransformer> {
        return nodeTransformerNames.reduce<TDictionary<INodeTransformer>>(
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
    private mergeVisitorsForDirection(visitors: IVisitor[], direction: TVisitorDirection): TVisitorFunction {
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
