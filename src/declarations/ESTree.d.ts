/* tslint:disable:interface-name */

import * as escodegen from 'escodegen-wallaby';
import * as ESTree from 'estree';

declare module 'estree' {
    interface BaseNode {
        ignoredNode?: boolean;
        obfuscatedNode?: boolean;
        parentNode?: ESTree.Node;
    }

    interface ExpressionStatement extends ESTree.BaseStatement {
        directive?: 'use strict';
    }

    interface SimpleLiteral extends ESTree.BaseNode, ESTree.BaseExpression {
        'x-verbatim-property'?: escodegen.XVerbatimProperty;
    }

    interface RegExpLiteral extends ESTree.BaseNode, ESTree.BaseExpression {
        'x-verbatim-property'?: escodegen.XVerbatimProperty;
    }
}
