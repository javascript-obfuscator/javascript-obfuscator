import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/IVisitor';

import { NodeGuard } from '../../enums/container/node-guards/NodeGuard';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { TNodeGuardFactory } from '../../types/container/node-guards/TNodeGuardFactory';
import { INodeGuard } from '../../interfaces/node-guards/INodeGuard';

/**
 * Adds `parentNode` properties to each node
 */
@injectable()
export class NodeGuardTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeGuard[]}
     */
    private static readonly nodeGuardsList: NodeGuard[] = [
        NodeGuard.BlackListNodeGuard,
        NodeGuard.ConditionalCommentNodeGuard
    ];

    /**
     * @type {INodeGuard[]}
     */
    private readonly nodeGuards: INodeGuard[];

    /**
     * @param {TNodeGuardFactory} nodeGuardFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__INodeGuard) nodeGuardFactory: TNodeGuardFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.nodeGuards = NodeGuardTransformer.nodeGuardsList.map(nodeGuardFactory);
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                return this.transformNode(node, parentNode);
            }
        };
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node {
        const obfuscationAllowed: boolean = this.nodeGuards.every((nodeGuard: INodeGuard) => nodeGuard.check(node));

        node.ignoredNode = !obfuscationAllowed;

        return node;
    }
}
