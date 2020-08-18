import * as ESTree from 'estree';

import { TScopeIdentifiersTraverserCallback } from '../../types/node/TScopeIdentifiersTraverserCallback';
import { IScopeIdentifiersTraverserCallbackData } from './IScopeIdentifiersTraverserCallbackData';
import { IScopeThroughIdentifiersTraverserCallbackData } from './IScopeThroughIdentifiersTraverserCallbackData';

export interface IScopeIdentifiersTraverser {
    /**
     * @param {Program} programNode
     * @param {Node | null} parentNode
     * @param {TScopeIdentifiersTraverserCallback<IScopeIdentifiersTraverserCallbackData>} callback
     */
    traverseScopeIdentifiers (
        programNode: ESTree.Program,
        parentNode: ESTree.Node | null,
        callback: TScopeIdentifiersTraverserCallback<IScopeIdentifiersTraverserCallbackData>
    ): void;

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     * @param {TScopeIdentifiersTraverserCallback<IScopeThroughIdentifiersTraverserCallbackData>} callback
     */
    traverseScopeThroughIdentifiers (
        node: ESTree.Node,
        parentNode: ESTree.Node | null,
        callback: TScopeIdentifiersTraverserCallback<IScopeThroughIdentifiersTraverserCallbackData>
    ): void;

}
