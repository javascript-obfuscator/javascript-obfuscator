import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeTransformerFactory } from '../types/container/node-transformers/TNodeTransformerFactory';
import { TVisitorDirection } from '../types/node-transformers/TVisitorDirection';
import { TVisitorFunction } from '../types/node-transformers/TVisitorFunction';
import { TVisitorResult } from '../types/node-transformers/TVisitorResult';

import { ITransformersRunner } from '../interfaces/node-transformers/ITransformersRunner';
import { IVisitor } from '../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../enums/node-transformers/NodeTransformer';
import { TransformationStage } from '../enums/node-transformers/TransformationStage';
import { VisitorDirection } from '../enums/node-transformers/VisitorDirection';

import { NodeGuards } from '../node/NodeGuards';
import { NodeMetadata } from '../node/NodeMetadata';

@injectable()
export class TransformersRunner implements ITransformersRunner {
    /**
     * @type {TNodeTransformerFactory}
     */
    private readonly nodeTransformerFactory: TNodeTransformerFactory;

    /**
     * @param {TNodeTransformerFactory} nodeTransformerFactory
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__INodeTransformer) nodeTransformerFactory: TNodeTransformerFactory,
    ) {
        this.nodeTransformerFactory = nodeTransformerFactory;
    }

    /**
     * @param {T} astTree
     * @param {NodeTransformer[]} nodeTransformers
     * @param {TransformationStage} transformationStage
     * @returns {T}
     */
    public transform <T extends ESTree.Node = ESTree.Program> (
        astTree: T,
        nodeTransformers: NodeTransformer[],
        transformationStage: TransformationStage
    ): T {
        if (!nodeTransformers.length) {
            return astTree;
        }

        const enterVisitors: IVisitor[] = [];
        const leaveVisitors: IVisitor[] = [];
        const nodeTransformersLength: number = nodeTransformers.length;

        let visitor: IVisitor | null;

        for (let i: number = 0; i < nodeTransformersLength; i++) {
            visitor = this.nodeTransformerFactory(nodeTransformers[i]).getVisitor(transformationStage);

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
            return astTree;
        }

        estraverse.replace(astTree, {
            enter: this.mergeVisitorsForDirection(enterVisitors, VisitorDirection.Enter),
            leave: this.mergeVisitorsForDirection(leaveVisitors, VisitorDirection.Leave)
        });

        return astTree;
    }

    /**
     * @param {IVisitor[]} visitors
     * @param {TVisitorDirection} direction
     * @returns {TVisitorFunction}
     */
    private mergeVisitorsForDirection (visitors: IVisitor[], direction: TVisitorDirection): TVisitorFunction {
        const visitorsLength: number = visitors.length;

        if (!visitorsLength) {
            return (node: ESTree.Node, parentNode: ESTree.Node | null) => node;
        }

        return (node: ESTree.Node, parentNode: ESTree.Node | null) => {
            if (NodeMetadata.isIgnoredNode(node)) {
                return estraverse.VisitorOption.Skip;
            }

            for (let i: number = 0; i < visitorsLength; i++) {
                const visitorFunction: TVisitorFunction | undefined = visitors[i][direction];

                if (!visitorFunction) {
                    continue;
                }

                const visitorResult: TVisitorResult = visitorFunction(node, parentNode);

                if (!visitorResult || !NodeGuards.isNode(visitorResult)) {
                    continue;
                }

                node = visitorResult;
            }

            return node;
        };
    }
}
