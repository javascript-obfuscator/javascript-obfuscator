import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TObfuscatingGuardFactory } from '../../types/container/node-transformers/TObfuscatingGuardFactory';

import { IObfuscatingGuard } from '../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { ObfuscatingGuard } from '../../enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';

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
        const obfuscationAllowed: boolean = this.obfuscatingGuards.every((nodeGuard: IObfuscatingGuard) => nodeGuard.check(node));

        node.ignoredNode = !obfuscationAllowed;

        return node;
    }
}
