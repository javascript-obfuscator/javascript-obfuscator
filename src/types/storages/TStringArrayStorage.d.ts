import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-storage/IStringArrayStorageItem';

import { IMapStorage } from '../../interfaces/storages/IMapStorage';

export type TStringArrayStorage = IMapStorage <string, IStringArrayStorageItemData>;
