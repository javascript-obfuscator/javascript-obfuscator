import * as escodegen from 'escodegen';

import { NodeObfuscator } from './NodeObfuscator';

export class LiteralObfuscator extends NodeObfuscator {
    /**
     * @param literalNode
     * @param parentNode
     */
    public obfuscateNode (literalNode: any, parentNode: any): void {
        if (parentNode.type === 'Property' && parentNode.key === literalNode) {
            return;
        }

        switch (typeof literalNode.value) {
            case 'string':
                if (literalNode['x-verbatim-property']) {
                    break;
                }

                literalNode['x-verbatim-property'] = {
                    content : this.replaceLiteralStringByArrayElement(literalNode.value),
                    precedence: escodegen.Precedence.Primary
                };

                break;
        }
    }
}