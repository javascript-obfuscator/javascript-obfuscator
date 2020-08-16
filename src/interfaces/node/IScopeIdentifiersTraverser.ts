import * as ESTree from 'estree';

import { TScopeIdentifiersTraverserVariableCallback } from '../../types/node/TScopeIdentifiersTraverserVariableCallback';

export interface IScopeIdentifiersTraverser {
    /**
     * @param {Program} programNode
     * @param {Node | null} parentNode
     * @param {TScopeIdentifiersTraverserVariableCallback} callback
     */
    traverseScopeVariables (
        programNode: ESTree.Program,
        parentNode: ESTree.Node | null,
        callback: TScopeIdentifiersTraverserVariableCallback
    ): void;

}
