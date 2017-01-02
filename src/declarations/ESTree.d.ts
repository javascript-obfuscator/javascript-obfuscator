/* tslint:disable:interface-name */

import * as ESTree from 'estree';

declare module 'estree' {
    interface BaseNode {
        obfuscated?: boolean;
        parentNode?: ESTree.Node;
        skippedByControlFlow?: boolean;
    }

    interface SimpleLiteral extends ESTree.BaseNode, ESTree.BaseExpression {
        'x-verbatim-property'?: any;
    }

    interface RegExpLiteral extends ESTree.BaseNode, ESTree.BaseExpression {
        'x-verbatim-property'?: any;
    }
}
