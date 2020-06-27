import { TStatement } from '../../types/node/TStatement';

import { IInitializable } from '../IInitializable';

export interface ICustomNode <
    TInitialData extends unknown[] = unknown[]
> extends IInitializable<TInitialData> {
    /**
     * @returns ESTree.Node[]
     */
    getNode (): TStatement[];
}
