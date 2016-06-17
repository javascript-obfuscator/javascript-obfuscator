import * as escodegen from 'escodegen';

import { ILiteralNode } from "../interfaces/nodes/ILiteralNode";

import { INode } from "../interfaces/nodes/INode";
import { NodeObfuscator } from './NodeObfuscator';
import { Nodes } from "../Nodes";

export class LiteralObfuscator extends NodeObfuscator {
    /**
     * @param literalNode
     * @param parentNode
     */
    public obfuscateNode (literalNode: ILiteralNode, parentNode: INode): void {
        if (Nodes.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return;
        }

        if (literalNode['x-verbatim-property']) {
            return;
        }

        let content: string;

        switch (typeof literalNode.value) {
            case 'boolean':
                content = this.replaceLiteralBooleanWithJSFuck(<boolean>literalNode.value);

                break;

            case 'number':
                content = this.replaceLiteralNumberWithHexadecimalValue(<number>literalNode.value);

                break;


            case 'string':
                content = this.replaceLiteralValueWithUnicodeValue(<string>literalNode.value);

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
