import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperLexicalScopeData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperLexicalScopeData';
import { IStringArrayScopeCallsWrapperLexicalScopeDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperLexicalScopeDataStorage';

import { MapStorage } from '../MapStorage';

@injectable()
export class StringArrayScopeCallsWrapperLexicalScopeDataStorage extends MapStorage <
    TNodeWithLexicalScopeStatements,
    IStringArrayScopeCallsWrapperLexicalScopeData
> implements IStringArrayScopeCallsWrapperLexicalScopeDataStorage {
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
