import * as ESTree from 'estree';

import { NodeGuards } from './NodeGuards';

export class NodeLiteralUtils {
    /**
     * @param {Literal} literalNode
     * @returns {string}
     */
    public static getUnwrappedLiteralNodeRawValue (literalNode: ESTree.Literal): string {
        if (typeof literalNode.value !== 'string') {
            throw new Error('Allowed only literal nodes with `string` values');
        }

        return literalNode.raw
            ? literalNode.raw.slice(1, -1)
            : literalNode.value;
    }

    /**
     * @param {Literal} literalNode
     * @param {Node} parentNode
     * @returns {boolean}
     */
    public static isProhibitedLiteralNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): boolean {
        if (NodeGuards.isPropertyNode(parentNode) && !parentNode.computed && parentNode.key === literalNode) {
            return true;
        }

        if (NodeGuards.isImportDeclarationNode(parentNode)) {
            return true;
        }

        if (NodeGuards.isExportAllDeclarationNode(parentNode) || NodeGuards.isExportNamedDeclarationNode(parentNode)) {
            return true;
        }

        return false;
    }
}
