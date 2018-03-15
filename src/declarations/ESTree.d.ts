/* tslint:disable:interface-name */

import * as escodegen from 'escodegen-wallaby';
import * as ESTree from 'estree';

declare module 'estree' {
    export interface BaseNodeMetadata {
        ignoredNode?: boolean;
        obfuscatedNode?: boolean;
    }

    export interface IdentifierNodeMetadata extends BaseNodeMetadata {
        renamedIdentifier?: boolean;
    }

    interface BaseNode {
        metadata?: BaseNodeMetadata;
        parentNode?: ESTree.Node;
    }

    interface Identifier extends BaseNode {
        metadata?: IdentifierNodeMetadata;
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
