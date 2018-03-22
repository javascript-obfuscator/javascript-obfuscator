import * as ESTree from 'estree';

import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';

export interface IControlFlowReplacer {
    /**
     * @param node
     * @param parentNode
     * @param controlFlowStorage
     * @returns ESTree.Node
     */
    replace (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorage: TControlFlowStorage
    ): ESTree.Node;
}
