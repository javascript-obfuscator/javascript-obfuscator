import * as ESTree from 'estree';

import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';
import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';

export interface IControlFlowReplacer {
    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @param {TNodeWithLexicalScope} controlFlowStorageLexicalScopeNode
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {Node}
     */
    replace (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorageLexicalScopeNode: TNodeWithLexicalScope,
        controlFlowStorage: TControlFlowStorage
    ): ESTree.Node;
}
