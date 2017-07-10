import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TLiteralObfuscatingReplacerFactory } from '../../types/container/node-transformers/TLiteralObfuscatingReplacerFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/IVisitor';

import { LiteralObfuscatingReplacer } from '../../enums/container/node-transformers/LiteralObfuscatingReplacer';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

@injectable()
export class LiteralTransformer extends AbstractNodeTransformer {
    /**
     * @type {TLiteralObfuscatingReplacerFactory}
     */
    private readonly literalObfuscatingReplacerFactory: TLiteralObfuscatingReplacerFactory;

    /**
     * @param literalObfuscatingReplacerFactory
     * @param randomGenerator
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObfuscatingReplacer)
            literalObfuscatingReplacerFactory: TLiteralObfuscatingReplacerFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.literalObfuscatingReplacerFactory = literalObfuscatingReplacerFactory;
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
                return this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer)
                    .replace(<boolean>literalNode.value);

            case 'number':
                return this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer)
                    .replace(<number>literalNode.value);

            case 'string':
                return this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer.StringLiteralObfuscatingReplacer)
                    .replace(<string>literalNode.value);

            default:
                return literalNode;
        }
    }
}
