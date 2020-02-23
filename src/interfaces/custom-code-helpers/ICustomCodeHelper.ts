import { TStatement } from '../../types/node/TStatement';

import { IInitializable } from '../IInitializable';

export interface ICustomCodeHelper <
    TInitialData extends any[] = any[]
> extends IInitializable<TInitialData> {
    /**
     * @returns ESTree.Node[]
     */
    getNode (): TStatement[];
}
