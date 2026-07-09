import * as ESTree from 'estree';

import { IMapStorage } from '../IMapStorage';
import { IStringArrayStorageItemData } from './IStringArrayStorageItem';

export interface ILiteralNodesCacheStorage extends IMapStorage<string, ESTree.Node> {
    /**
     * @param {Literal} literalNode
     * @param {IStringArrayStorageItemData | undefined} stringArrayStorageItemData
     * @returns {string}
     */
    buildKey(
        literalNode: ESTree.Literal,
        stringArrayStorageItemData: IStringArrayStorageItemData | undefined
    ): string;

    /**
     * @param {string} key
     * @param {IStringArrayStorageItemData | undefined} stringArrayStorageItemData
     * @returns {boolean}
     */
    shouldUseCachedValue(key: string, stringArrayStorageItemData: IStringArrayStorageItemData | undefined): boolean;
}
