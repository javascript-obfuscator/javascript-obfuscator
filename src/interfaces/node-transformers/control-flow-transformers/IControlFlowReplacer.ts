import * as ESTree from 'estree';

import { IControlFlowStorage } from '../../storages/control-flow-transformers/IControlFlowStorage';

export interface IControlFlowReplacer {
    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @param {IControlFlowStorage} controlFlowStorage
     * @returns {Node}
     */
    replace (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorage: IControlFlowStorage
    ): ESTree.Node;

    /**
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {string}
     */
    generateStorageKey (controlFlowStorage: IControlFlowStorage): string;
}
