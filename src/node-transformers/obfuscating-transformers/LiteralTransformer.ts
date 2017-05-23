import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TObfuscationReplacerFactory } from '../../types/container/TObfuscationReplacerFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IVisitor } from '../../interfaces/IVisitor';

import { ObfuscationReplacers } from '../../enums/container/ObfuscationReplacers';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

@injectable()
export class LiteralTransformer extends AbstractNodeTransformer {
    /**
     * @type {TObfuscationReplacerFactory}
     */
    private readonly obfuscationReplacerFactory: TObfuscationReplacerFactory;

    /**
     * @param obfuscatingReplacerFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObfuscationReplacer) obfuscatingReplacerFactory: TObfuscationReplacerFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.obfuscationReplacerFactory = obfuscatingReplacerFactory;
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
                return this.obfuscationReplacerFactory(ObfuscationReplacers.BooleanReplacer)
                    .replace(<boolean>literalNode.value);

            case 'number':
                return this.obfuscationReplacerFactory(ObfuscationReplacers.NumberLiteralReplacer)
                    .replace(<number>literalNode.value);

            case 'string':
                return this.obfuscationReplacerFactory(ObfuscationReplacers.StringLiteralReplacer)
                    .replace(<string>literalNode.value);

            default:
                return literalNode;
        }
    }
}
