import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscatorReplacer } from '../../interfaces/node-transformers/IObfuscatorReplacer';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

@injectable()
export class LiteralObfuscator extends AbstractNodeTransformer {
    /**
     * @type {(replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer}
     */
    private readonly replacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer;

    /**
     * @param replacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers.Factory__IObfuscatorReplacer) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.replacersFactory = replacersFactory;
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
                content = this.replacersFactory(NodeObfuscatorsReplacers.BooleanReplacer)
                    .replace(<boolean>literalNode.value);

                break;

            case 'number':
                content = this.replacersFactory(NodeObfuscatorsReplacers.NumberLiteralReplacer)
                    .replace(<number>literalNode.value);

                break;

            case 'string':
                content = this.replacersFactory(NodeObfuscatorsReplacers.StringLiteralReplacer)
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
