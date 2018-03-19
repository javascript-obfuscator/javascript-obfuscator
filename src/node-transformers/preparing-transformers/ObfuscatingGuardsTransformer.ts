import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TObfuscatingGuardFactory } from '../../types/container/node-transformers/TObfuscatingGuardFactory';

import { IObfuscatingGuard } from '../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { ObfuscatingGuard } from '../../enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
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
        ObfuscatingGuard.BlackListNodeGuard,
        ObfuscatingGuard.ConditionalCommentNodeGuard
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
    constructor (
        @inject(ServiceIdentifiers.Factory__INodeGuard) obfuscatingGuardFactory: TObfuscatingGuardFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.obfuscatingGuards = ObfuscatingGuardsTransformer.obfuscatingGuardsList.map(obfuscatingGuardFactory);
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Preparing:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
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
        const obfuscationAllowed: boolean = this.obfuscatingGuards
            .every((nodeGuard: IObfuscatingGuard) => nodeGuard.check(node));

        NodeMetadata.set(node, {
            ignoredNode: !obfuscationAllowed
        });

        return node;
    }
}
