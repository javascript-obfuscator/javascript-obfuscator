import * as ESTree from 'estree';

import { TScopeIdentifiersTraverserCallback } from '../../types/node/TScopeIdentifiersTraverserCallback';
import { IScopeIdentifiersTraverserCallbackData } from './IScopeIdentifiersTraverserCallbackData';
import { IScopeThroughIdentifiersTraverserCallbackData } from './IScopeThroughIdentifiersTraverserCallbackData';

export interface IScopeIdentifiersTraverser {
    /**
     * @param {Program} programNode
     * @param {TScopeIdentifiersTraverserCallback<IScopeIdentifiersTraverserCallbackData>} callback
     * @param {boolean} analyzeScope
     */
    traverseScopeIdentifiers(
        programNode: ESTree.Program,
        callback: TScopeIdentifiersTraverserCallback<IScopeIdentifiersTraverserCallbackData>,
        analyzeScope?: boolean
    ): void;

    /**
     * @param {Node} node
     * @param {TScopeIdentifiersTraverserCallback<IScopeThroughIdentifiersTraverserCallbackData>} callback
     * @param {boolean} analyzeScope
     */
    traverseScopeThroughIdentifiers(
        node: ESTree.Node,
        callback: TScopeIdentifiersTraverserCallback<IScopeThroughIdentifiersTraverserCallbackData>,
        analyzeScope?: boolean
    ): void;
}
