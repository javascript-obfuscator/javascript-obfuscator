import { TStringArrayEncoding } from '../../../types/options/TStringArrayEncoding';

import { IMapStorage } from '../IMapStorage';
import { IStringArrayStorageItemData } from './IStringArrayStorageItem';

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
     * @param {TStringArrayEncoding | null} stringArrayEncoding
     * @returns {string}
     */
    getStorageCallsWrapperName (stringArrayEncoding: TStringArrayEncoding | null): string;

    rotateStorage (): void;

    shuffleStorage (): void;
}
