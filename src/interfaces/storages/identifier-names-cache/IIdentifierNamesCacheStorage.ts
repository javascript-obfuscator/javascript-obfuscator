import { TIdentifierNamesCache } from '../../../types/caches/TIdentifierNamesCache';

import { IMapStorage } from '../IMapStorage';

export interface IIdentifierNamesCacheStorage extends Omit<IMapStorage <string, string>, 'getStorage'> {
    /**
     * @returns {TIdentifierNamesCache}
     */
    getCache (): TIdentifierNamesCache;
}
