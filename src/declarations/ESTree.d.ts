/* tslint:disable:interface-name */

import * as ESTree from 'estree';

declare module 'estree' {
    interface BaseNode {
        obfuscatedNode?: boolean;
        parentNode?: ESTree.Node;
    }

    interface ExpressionStatement extends ESTree.BaseStatement {
        directive?: 'use strict';
    }

    interface SimpleLiteral extends ESTree.BaseNode, ESTree.BaseExpression {
        'x-verbatim-property'?: any;
    }

    interface RegExpLiteral extends ESTree.BaseNode, ESTree.BaseExpression {
        'x-verbatim-property'?: any;
    }
}
