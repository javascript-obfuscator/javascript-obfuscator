import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../types/node/TNodeWithLexicalScope';

import { NodeGuards } from './NodeGuards';

export class NodeLexicalScopeUtils {
    /**
     * @param {Node} node
     * @returns {TNodeWithLexicalScope}
     */
    public static getLexicalScope (node: ESTree.Node): TNodeWithLexicalScope | undefined {
        return NodeLexicalScopeUtils.getLexicalScopesRecursive(node, 1)[0];
    }

    /**
     * @param {Node} node
     * @returns {TNodeWithLexicalScope[]}
     */
    public static getLexicalScopes (node: ESTree.Node): TNodeWithLexicalScope[] {
        return NodeLexicalScopeUtils.getLexicalScopesRecursive(node);
    }

    /***
     * @param {Node} node
     * @param {number} maxSize
     * @param {TNodeWithLexicalScope[]} nodesWithLexicalScope
     * @param {number} depth
     * @returns {TNodeWithLexicalScope[]}
     */
    private static getLexicalScopesRecursive (
        node: ESTree.Node,
        maxSize: number = Infinity,
        nodesWithLexicalScope: TNodeWithLexicalScope[] = [],
        depth: number = 0
    ): TNodeWithLexicalScope[] {
        if (nodesWithLexicalScope.length >= maxSize) {
            return nodesWithLexicalScope;
        }

        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (NodeGuards.isNodeWithLexicalScope(node)) {
            nodesWithLexicalScope.push(node);
        }

        if (node !== parentNode) {
            return NodeLexicalScopeUtils.getLexicalScopesRecursive(parentNode, maxSize, nodesWithLexicalScope, ++depth);
        }

        return nodesWithLexicalScope;
    }
}
