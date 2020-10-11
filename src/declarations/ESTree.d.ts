/* eslint-disable */

import * as acorn from 'acorn';
import * as escodegen from 'escodegen';
import * as eslintScope from 'eslint-scope';

declare module 'estree' {
    export interface BaseNodeMetadata {
        forceTransformNode?: boolean;
        ignoredNode?: boolean;
    }

    export interface Comment {
        start: number;
        end: number;
        loc?: acorn.SourceLocation;
    }

    export interface LiteralNodeMetadata extends BaseNodeMetadata {
        replacedLiteral?: boolean;
    }

    interface BaseNode {
        metadata?: BaseNodeMetadata;
        parentNode?: Node;
    }

    interface Program extends BaseNode {
        scope?: eslintScope.Scope | null;
    }

    interface SimpleLiteral extends BaseNode {
        metadata?: LiteralNodeMetadata;
        'x-verbatim-property'?: escodegen.XVerbatimProperty;
    }

    interface BigIntLiteral extends SimpleLiteral {
        bigint: string;
    }

    interface RegExpLiteral extends BaseNode {
        metadata?: LiteralNodeMetadata;
        'x-verbatim-property'?: escodegen.XVerbatimProperty;
    }
}
