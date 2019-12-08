/* tslint:disable:interface-name */

import * as escodegen from 'escodegen-wallaby';
import * as eslintScope from 'eslint-scope';

declare module 'estree' {
    export interface BaseNodeMetadata {
        ignoredNode?: boolean;
    }

    export interface IdentifierNodeMetadata extends BaseNodeMetadata {
        renamedIdentifier?: boolean;
    }

    export interface LiteralNodeMetadata extends BaseNodeMetadata {
        replacedLiteral?: boolean;
    }

    interface BaseNode {
        metadata?: BaseNodeMetadata;
        parentNode?: Node;
    }

    interface Identifier extends BaseNode {
        metadata?: IdentifierNodeMetadata;
        scope?: eslintScope.Scope | null;
    }

    export class Variable extends eslintScope.Variable {
        public isRenamed?: boolean;
    }

    interface SimpleLiteral extends BaseNode {
        metadata?: LiteralNodeMetadata;
    }

    interface RegExpLiteral extends BaseNode {
        metadata?: LiteralNodeMetadata;
    }

    interface ExpressionStatement extends BaseNode {
        directive?: 'use strict';
    }

    interface SimpleLiteral extends BaseNode {
        'x-verbatim-property'?: escodegen.XVerbatimProperty;
    }

    interface RegExpLiteral extends BaseNode {
        'x-verbatim-property'?: escodegen.XVerbatimProperty;
    }
}
