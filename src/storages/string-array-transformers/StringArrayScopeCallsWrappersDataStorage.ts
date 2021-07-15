import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { TStringArrayScopeCallsWrappersDataByEncoding } from '../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrappersDataByEncoding';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrappersDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrappersDataStorage';

import { MapStorage } from '../MapStorage';

@injectable()
export class StringArrayScopeCallsWrappersDataStorage extends MapStorage <
    TNodeWithLexicalScopeStatements,
    TStringArrayScopeCallsWrappersDataByEncoding
> implements IStringArrayScopeCallsWrappersDataStorage {
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
}
