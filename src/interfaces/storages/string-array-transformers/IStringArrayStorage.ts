import { TStringArrayEncoding } from '../../../types/options/TStringArrayEncoding';

import { IMapStorage } from '../IMapStorage';
import { IStringArrayCallsWrapperNames } from '../../node-transformers/string-array-transformers/IStringArrayCallsWrapperNames';
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
     * @returns {IStringArrayCallsWrapperNames}
     */
    getStorageCallsWrapperNames (stringArrayEncoding: TStringArrayEncoding | null): IStringArrayCallsWrapperNames;

    rotateStorage (): void;

    shuffleStorage (): void;
}
