import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesCache } from '../../types/storages/TIdentifierNamesCache';

import { IIdentifierNamesCacheStorage } from '../../interfaces/storages/identifier-names-cache/IIdentifierNamesCacheStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { MapStorage } from '../MapStorage';

@injectable()
export class IdentifierNamesCacheStorage extends MapStorage <string, string> implements IIdentifierNamesCacheStorage {
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

    @postConstruct()
    public override initialize (): void {
       super.initialize();

        this.storage = new Map(Object.entries(this.options.identifierNamesCache ?? {}));
    }

    /**
     * @returns {TIdentifierNamesCache}
     */
    public getCache (): TIdentifierNamesCache {
        if (!this.options.identifierNamesCache) {
            return null;
        }

        return this.getStorageAsDictionary();
    }
}
