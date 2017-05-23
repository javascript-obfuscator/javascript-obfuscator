import * as ESTree from 'estree';

import { ICustomNode } from '../../custom-nodes/ICustomNode';
import { IStorage } from '../../storages/IStorage';

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
        controlFlowStorage: IStorage <ICustomNode>
    ): ESTree.Node;
}
