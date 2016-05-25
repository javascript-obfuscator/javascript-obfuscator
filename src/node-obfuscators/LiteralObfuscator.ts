import * as escodegen from 'escodegen';

import { ILiteralNode } from "../interfaces/nodes/ILiteralNode";

import { INode } from "../interfaces/nodes/INode";
import { NodeObfuscator } from './NodeObfuscator';
import { NodeUtils } from "../NodeUtils";

export class LiteralObfuscator extends NodeObfuscator {
    /**
     * @param literalNode
     * @param parentNode
     */
    public obfuscateNode (literalNode: ILiteralNode, parentNode: INode): void {
        if (NodeUtils.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return;
        }

        if (literalNode['x-verbatim-property']) {
            return;
        }

        let content: string;

        switch (typeof literalNode.value) {
            case 'boolean':
                content = this.replaceLiteralBooleanByJSFuck(<boolean>literalNode.value);

                break;

            case 'number':
                content = this.replaceLiteralNumberByHexadecimalValue(<number>literalNode.value);

                break;


            case 'string':
                content = this.replaceLiteralStringByUnicodeArrayTranslatorCall(<string>literalNode.value);

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
