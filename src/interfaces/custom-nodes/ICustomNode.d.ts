import { TStatement } from '../../types/node/TStatement';

import { IInitializable } from '../IInitializable';

export interface ICustomNode extends IInitializable {
    /**
     * @returns {string}
     */
    getCode (): string;

    /**
     * @returns ESTree.Node[]
     */
    getNode (): TStatement[];
}
