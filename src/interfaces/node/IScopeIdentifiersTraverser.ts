import * as ESTree from 'estree';

import { TScopeIdentifiersTraverserCallback } from '../../types/node/TScopeIdentifiersTraverserCallback';

export interface IScopeIdentifiersTraverser {
    /**
     * @param {Program} programNode
     * @param {Node | null} parentNode
     * @param {TScopeIdentifiersTraverserCallback} callback
     */
    traverse (
        programNode: ESTree.Program,
        parentNode: ESTree.Node | null,
        callback: TScopeIdentifiersTraverserCallback
    ): void;

}
