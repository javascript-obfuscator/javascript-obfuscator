import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/IOptions';
import { IStorage } from '../../interfaces/IStorage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { BooleanLiteralReplacer } from './replacers/BooleanLiteralReplacer';
import { Node } from '../../node/Node';
import { NumberLiteralReplacer } from './replacers/NumberLiteralReplacer';
import { StringLiteralReplacer } from './replacers/StringLiteralReplacer';

@injectable()
export class LiteralObfuscator extends AbstractNodeTransformer {
    /**
     * @param customNodesStorage
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);
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
                content = new BooleanLiteralReplacer(this.customNodesStorage, this.options)
                    .replace(<boolean>literalNode.value);

                break;

            case 'number':
                content = new NumberLiteralReplacer(this.customNodesStorage, this.options)
                    .replace(<number>literalNode.value);

                break;

            case 'string':
                content = new StringLiteralReplacer(this.customNodesStorage, this.options)
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
