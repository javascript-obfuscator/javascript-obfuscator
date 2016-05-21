import * as escodegen from 'escodegen';

import { ILiteralNode } from "../interfaces/nodes/ILiteralNode";

import { ITreeNode } from "../interfaces/nodes/ITreeNode";
import { NodeObfuscator } from './NodeObfuscator';
import { NodeUtils } from "../NodeUtils";

export class LiteralObfuscator extends NodeObfuscator {
    /**
     * @param literalNode
     * @param parentNode
     */
    public obfuscateNode (literalNode: ILiteralNode, parentNode: ITreeNode): void {
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
                content = this.replaceLiteralStringByArrayElement(<string>literalNode.value);

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
