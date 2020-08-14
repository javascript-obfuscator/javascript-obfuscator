import * as ESTree from 'estree';

import { NodeGuards } from './NodeGuards';

export class NodeLiteralUtils {
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
