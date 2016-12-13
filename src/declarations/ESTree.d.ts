/* tslint:disable:interface-name */

import * as ESTree from 'estree';

declare module 'estree' {
    interface BaseNode {
        controlFlowId?: string;
        obfuscated?: boolean;
        parentNode?: ESTree.Node;
        skipByControlFlow?: boolean;
    }

    interface SimpleLiteral extends ESTree.BaseNode, ESTree.BaseExpression {
        'x-verbatim-property'?: any;
    }

    interface RegExpLiteral extends ESTree.BaseNode, ESTree.BaseExpression {
        'x-verbatim-property'?: any;
    }
}
