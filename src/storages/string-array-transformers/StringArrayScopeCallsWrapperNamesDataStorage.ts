import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { TStringArrayScopeCallsWrapperNamesDataByEncoding } from '../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrapperNamesDataByEncoding';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperNamesDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperNamesDataStorage';

import { MapStorage } from '../MapStorage';

@injectable()
export class StringArrayScopeCallsWrapperNamesDataStorage extends MapStorage <
    TNodeWithLexicalScopeStatements,
    TStringArrayScopeCallsWrapperNamesDataByEncoding
> implements IStringArrayScopeCallsWrapperNamesDataStorage {
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
