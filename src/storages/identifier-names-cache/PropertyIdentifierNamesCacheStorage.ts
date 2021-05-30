import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IOptions } from '../../interfaces/options/IOptions';
import { IPropertyIdentifierNamesCacheStorage } from '../../interfaces/storages/identifier-names-cache/IPropertyIdentifierNamesCacheStorage';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { MapStorage } from '../MapStorage';

@injectable()
export class PropertyIdentifierNamesCacheStorage extends MapStorage <string, string> implements IPropertyIdentifierNamesCacheStorage {
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

        this.storage = new Map(Object.entries(this.options.identifierNamesCache?.propertyIdentifiers ?? {}));
    }
}
