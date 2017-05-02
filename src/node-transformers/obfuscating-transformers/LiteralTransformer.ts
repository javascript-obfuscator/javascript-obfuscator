import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen-wallaby';
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
     * @param obfuscationReplacerFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObfuscationReplacer) obfuscationReplacerFactory: TObfuscationReplacerFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.obfuscationReplacerFactory = obfuscationReplacerFactory;
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isLiteralNode(node)) {
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

        let content: string;

        switch (typeof literalNode.value) {
            case 'boolean':
                content = this.obfuscationReplacerFactory(ObfuscationReplacers.BooleanReplacer)
                    .replace(<boolean>literalNode.value);

                break;

            case 'number':
                content = this.obfuscationReplacerFactory(ObfuscationReplacers.NumberLiteralReplacer)
                    .replace(<number>literalNode.value);

                break;

            case 'string':
                content = this.obfuscationReplacerFactory(ObfuscationReplacers.StringLiteralReplacer)
                    .replace(<string>literalNode.value);

                break;

            default:
                return literalNode;
        }

        literalNode['x-verbatim-property'] = {
            content : content,
            precedence: escodegen.Precedence.Primary
        };

        return literalNode;
    }
}
