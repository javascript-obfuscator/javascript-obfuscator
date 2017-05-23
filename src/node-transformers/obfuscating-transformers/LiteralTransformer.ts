import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TObfuscatingReplacerFactory } from '../../types/container/TObfuscatingReplacerFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IVisitor } from '../../interfaces/IVisitor';

import { ObfuscatingReplacers } from '../../enums/container/ObfuscatingReplacers';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

@injectable()
export class LiteralTransformer extends AbstractNodeTransformer {
    /**
     * @type {TObfuscatingReplacerFactory}
     */
    private readonly obfuscatingReplacerFactory: TObfuscatingReplacerFactory;

    /**
     * @param obfuscatingReplacerFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObfuscatingReplacer) obfuscatingReplacerFactory: TObfuscatingReplacerFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.obfuscatingReplacerFactory = obfuscatingReplacerFactory;
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isLiteralNode(node) && !node.obfuscatedNode) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param literalNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Node {
        if (Node.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return literalNode;
        }

        switch (typeof literalNode.value) {
            case 'boolean':
                return this.obfuscatingReplacerFactory(ObfuscatingReplacers.BooleanReplacer)
                    .replace(<boolean>literalNode.value);

            case 'number':
                return this.obfuscatingReplacerFactory(ObfuscatingReplacers.NumberLiteralReplacer)
                    .replace(<number>literalNode.value);

            case 'string':
                return this.obfuscatingReplacerFactory(ObfuscatingReplacers.StringLiteralReplacer)
                    .replace(<string>literalNode.value);

            default:
                return literalNode;
        }
    }
}
