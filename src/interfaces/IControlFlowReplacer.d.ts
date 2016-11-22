import * as ESTree from 'estree';

import { ICustomNode } from './custom-nodes/ICustomNode';
import { ControlFlowStorage } from '../storages/ControlFlowStorage';

export interface IControlFlowReplacer {
    replace (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorage: ControlFlowStorage,
        controlFlowStorageCustomNodeName: string
    ): ICustomNode | undefined;
}
