/* eslint-disable */

import * as acorn from 'acorn';
import * as escodegen from '@javascript-obfuscator/escodegen';
import * as eslintScope from 'eslint-scope';

declare module 'estree' {
    /**
     * Nodes metadata
     */
    export interface BaseNodeMetadata {
        forceTransformNode?: boolean;
        ignoredNode?: boolean;
    }

    export interface FunctionExpressionNodeMetadata extends BaseNodeMetadata {
        evalHostNode?: boolean;
    }

    export interface IdentifierNodeMetadata extends BaseNodeMetadata {
        propertyKeyToRenameNode?: boolean
    }

    export interface LiteralNodeMetadata extends BaseNodeMetadata {
        stringArrayCallLiteralNode?: boolean;
        propertyKeyToRenameNode?: boolean
    }

    /**
     * Nodes
     */
    interface BaseNode {
        metadata?: BaseNodeMetadata;
        parentNode?: Node;
    }

    interface BigIntLiteral extends SimpleLiteral {
        bigint: string;
    }

    export interface Comment {
        start: number;
        end: number;
        loc?: acorn.SourceLocation;
    }

    interface FunctionExpression extends BaseFunction, BaseExpression {
        metadata?: FunctionExpressionNodeMetadata;
    }

    interface Program extends BaseNode {
        scope?: eslintScope.Scope | null;
    }

    interface Identifier extends BaseNode {
        metadata?: IdentifierNodeMetadata;
    }

    interface BigIntLiteral extends BaseNode {
        metadata?: LiteralNodeMetadata;
        'x-verbatim-property'?: escodegen.XVerbatimProperty;
    }

    interface RegExpLiteral extends BaseNode {
        metadata?: LiteralNodeMetadata;
        'x-verbatim-property'?: escodegen.XVerbatimProperty;
    }

    interface SimpleLiteral extends BaseNode {
        metadata?: LiteralNodeMetadata;
        'x-verbatim-property'?: escodegen.XVerbatimProperty;
    }
}
