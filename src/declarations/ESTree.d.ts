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

    export interface FunctionNodeMetadata extends BaseNodeMetadata {
        directiveNode?: Directive | null;
    }

    export interface LiteralNodeMetadata extends BaseNodeMetadata {
        replacedLiteral?: boolean;
    }

    export interface ProgramNodeMetadata extends BaseNodeMetadata {
        directiveNode?: Directive | null;
    }

    /**
     * Nodes
     */
    interface ArrowFunctionExpression extends BaseNode {
        metadata?: FunctionNodeMetadata;
    }

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

    interface FunctionExpression extends BaseNode {
        metadata?: FunctionNodeMetadata;
    }

    interface FunctionDeclaration extends BaseNode {
        metadata?: FunctionNodeMetadata;
    }

    interface Program extends BaseNode {
        metadata?: ProgramNodeMetadata;
        scope?: eslintScope.Scope | null;
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
