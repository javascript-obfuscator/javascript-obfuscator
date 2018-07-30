import { TStatement } from '../../types/node/TStatement';

import { IInitializable } from '../IInitializable';

export interface ICustomNode extends IInitializable<any[]> {
    /**
     * @returns ESTree.Node[]
     */
    getNode (): TStatement[];
}
