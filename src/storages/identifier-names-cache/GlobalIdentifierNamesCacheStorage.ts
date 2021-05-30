import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IGlobalIdentifierNamesCacheStorage } from '../../interfaces/storages/identifier-names-cache/IGlobalIdentifierNamesCacheStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { MapStorage } from '../MapStorage';

@injectable()
export class GlobalIdentifierNamesCacheStorage extends MapStorage <string, string> implements IGlobalIdentifierNamesCacheStorage {
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

        this.storage = new Map(Object.entries(this.options.identifierNamesCache?.globalIdentifiers ?? {}));
    }
}
