import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesCache } from '../../types/caches/TIdentifierNamesCache';

import { IIdentifierNamesCacheStorage } from '../../interfaces/storages/identifier-names-cache/IIdentifierNamesCacheStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { MapStorage } from '../MapStorage';

@injectable()
export class IdentifierNamesCacheStorage extends MapStorage <string, string> implements IIdentifierNamesCacheStorage {
    /**
     * @type {boolean}
     */
    private readonly shouldUseCache: boolean;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.shouldUseCache = !!options.identifierNamesCache;
    }

    @postConstruct()
    public override initialize (): void {
       super.initialize();

       if (this.options.identifierNamesCache) {
           this.storage = new Map(Object.entries(this.options.identifierNamesCache));
       }
    }

    /**
     * @param {string} key
     * @returns {string | undefined}
     */
    public override get (key: string): string | undefined {
        if (!this.shouldUseCache) {
            return undefined;
        }

        return super.get(key);
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
    public override has (key: string): boolean {
        if (!this.shouldUseCache) {
            return false;
        }

        return super.has(key);
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    public override set (key: string, value: string): void {
        if (!this.shouldUseCache) {
            return;
        }

        super.set(key, value);
    }

    /**
     * @returns {TIdentifierNamesCache}
     */
    public getCache (): TIdentifierNamesCache {
        if (!this.shouldUseCache) {
            return null;
        }

        return this.getAsDictionary();
    }
}
