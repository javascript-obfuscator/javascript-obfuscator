import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';
import { IStringArrayScopeCallsWrapperDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperDataStorage';

import { MapStorage } from '../MapStorage';

@injectable()
export class StringArrayScopeCallsWrapperDataStorage extends MapStorage <
    TNodeWithLexicalScopeStatements,
    IStringArrayScopeCallsWrapperData
> implements IStringArrayScopeCallsWrapperDataStorage {
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
