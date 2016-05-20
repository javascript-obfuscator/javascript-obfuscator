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

        switch (typeof literalNode.value) {
            case 'string':
                if (literalNode['x-verbatim-property']) {
                    break;
                }

                literalNode['x-verbatim-property'] = {
                    content : this.replaceLiteralStringByArrayElement(<string>literalNode.value),
                    precedence: escodegen.Precedence.Primary
                };

                break;

            default:
                break;
        }
    }
}
