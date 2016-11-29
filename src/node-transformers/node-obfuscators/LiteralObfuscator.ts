import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/IOptions';
import { IReplacer } from '../../interfaces/IReplacer';
import { IStorage } from '../../interfaces/IStorage';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

@injectable()
export class LiteralObfuscator extends AbstractNodeTransformer {
    /**
     * @type {(replacer: NodeObfuscatorsReplacers) => IReplacer}
     */
    private readonly replacersFactory: (replacer: NodeObfuscatorsReplacers) => IReplacer;

    /**
     * @param customNodesStorage
     * @param replacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers['Factory<IReplacer>']) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);

        this.replacersFactory = replacersFactory;
    }

    /**
     * @param literalNode
     * @param parentNode
     */
    public transformNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): void {
        if (Node.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return;
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
                return;
        }

        literalNode['x-verbatim-property'] = {
            content : content,
            precedence: escodegen.Precedence.Primary
        };
    }
}
