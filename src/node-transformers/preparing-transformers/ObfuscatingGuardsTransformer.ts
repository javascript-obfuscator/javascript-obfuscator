import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TObfuscatingGuardFactory } from '../../types/container/node-transformers/TObfuscatingGuardFactory';

import { IObfuscatingGuard } from '../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { ObfuscatingGuard } from '../../enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard';
import { ObfuscatingGuardResult } from '../../enums/node/ObfuscatingGuardResult';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';

/**
 * Adds `ignoredNode` properties to each node
 */
@injectable()
export class ObfuscatingGuardsTransformer extends AbstractNodeTransformer {
    /**
     * @type {ObfuscatingGuard[]}
     */
    private static readonly obfuscatingGuardsList: ObfuscatingGuard[] = [
        ObfuscatingGuard.BlackListObfuscatingGuard,
        ObfuscatingGuard.ConditionalCommentObfuscatingGuard,
        ObfuscatingGuard.ForceTransformStringObfuscatingGuard,
        ObfuscatingGuard.IgnoredRequireImportObfuscatingGuard,
        ObfuscatingGuard.ReservedStringObfuscatingGuard
    ];

    /**
     * @type {NodeTransformer.ParentificationTransformer[]}
     */
    public readonly runAfter: NodeTransformer[] = [
        NodeTransformer.ParentificationTransformer,
        NodeTransformer.VariablePreserveTransformer
    ];

    /**
     * @type {IObfuscatingGuard[]}
     */
    private readonly obfuscatingGuards: IObfuscatingGuard[];

    /**
     * @param {TObfuscatingGuardFactory} obfuscatingGuardFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__INodeGuard) obfuscatingGuardFactory: TObfuscatingGuardFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.obfuscatingGuards = ObfuscatingGuardsTransformer.obfuscatingGuardsList.map(obfuscatingGuardFactory);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Preparing:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        return this.transformNode(node, parentNode);
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node {
        const obfuscatingGuardResults: ObfuscatingGuardResult[] = this.obfuscatingGuards
            .map((obfuscatingGuard: IObfuscatingGuard) => obfuscatingGuard.check(node));

        this.setNodeMetadata(node, obfuscatingGuardResults);

        return node;
    }

    /**
     * @param {Node} node
     * @param {ObfuscatingGuardResult[]} obfuscatingGuardResults
     */
    private setNodeMetadata (node: ESTree.Node, obfuscatingGuardResults: ObfuscatingGuardResult[]): void {
        const isTransformNode: boolean = obfuscatingGuardResults
            .every((obfuscatingGuardResult: ObfuscatingGuardResult) => obfuscatingGuardResult === ObfuscatingGuardResult.Transform);

        let isForceTransformNode: boolean = false;
        let isIgnoredNode: boolean = false;

        if (!isTransformNode) {
            isForceTransformNode = obfuscatingGuardResults
                .includes(ObfuscatingGuardResult.ForceTransform);
            isIgnoredNode = !isForceTransformNode && obfuscatingGuardResults
                .includes(ObfuscatingGuardResult.Ignore);
        }

        NodeMetadata.set(node, {
            forceTransformNode: isForceTransformNode && !NodeGuards.isProgramNode(node),
            ignoredNode: isIgnoredNode && !NodeGuards.isProgramNode(node)
        });
    }
}
