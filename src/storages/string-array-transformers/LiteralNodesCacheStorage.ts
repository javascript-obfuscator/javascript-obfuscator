import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { ILiteralNodesCacheStorage } from '../../interfaces/storages/string-array-transformers/ILiteralNodesCacheStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';

import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';

import { MapStorage } from '../MapStorage';

@injectable()
export class LiteralNodesCacheStorage extends MapStorage <string, ESTree.Node> implements ILiteralNodesCacheStorage {
    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {string} literalValue
     * @param {IStringArrayStorageItemData | undefined} stringArrayStorageItemData
     * @returns {string}
     */
    public buildKey (
        literalValue: string,
        stringArrayStorageItemData: IStringArrayStorageItemData | undefined,
    ): string {
        return `${literalValue}-${Boolean(stringArrayStorageItemData)}`;
    }

    /**
     * @param {string} key
     * @param {IStringArrayStorageItemData | undefined} stringArrayStorageItemData
     * @returns {boolean}
     */
    public shouldUseCachedValue (
        key: string,
        stringArrayStorageItemData: IStringArrayStorageItemData | undefined
    ): boolean {
        // for each function scope different nodes will be created, so cache have no sense
        return !this.options.stringArrayWrappersCount
            // different nodes will be created with different rc4 keys, so cache have no sense
            && stringArrayStorageItemData?.encoding !== StringArrayEncoding.Rc4
            && this.storage.has(key);
    }
}
