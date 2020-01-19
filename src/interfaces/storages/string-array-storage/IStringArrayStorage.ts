import { IStringArrayStorageItemData } from './IStringArrayStorageItem';

import { IMapStorage } from '../IMapStorage';

export interface IStringArrayStorage extends IMapStorage <string, IStringArrayStorageItemData> {
    /**
     * @returns {number}
     */
    getRotationAmount (): number;

    /**
     * @returns {string}
     */
    getStorageName (): string;

    /**
     * @returns {string}
     */
    getStorageCallsWrapperName (): string;

    rotateStorage (): void;

    shuffleStorage (): void;
}
