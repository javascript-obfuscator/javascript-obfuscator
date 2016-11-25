import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { BooleanLiteralReplacer } from './replacers/BooleanLiteralReplacer';
import { Node } from '../../node/Node';
import { NumberLiteralReplacer } from './replacers/NumberLiteralReplacer';
import { StringLiteralReplacer } from './replacers/StringLiteralReplacer';

export class LiteralObfuscator extends AbstractNodeTransformer {
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
