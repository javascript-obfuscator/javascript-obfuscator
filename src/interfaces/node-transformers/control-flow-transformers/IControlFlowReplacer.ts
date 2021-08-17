import * as ESTree from 'estree';

import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';

export interface IControlFlowReplacer {
    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {Node}
     */
    replace (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorage: TControlFlowStorage
    ): ESTree.Node;

    /**
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {string}
     */
    generateStorageKey (controlFlowStorage: TControlFlowStorage): string;
}
