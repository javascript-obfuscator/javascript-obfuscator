import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScopeAndStatements } from '../../types/node/TNodeWithLexicalScopeAndStatements';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitedLexicalScopeNodesStackStorage } from '../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';

import { ArrayStorage } from '../ArrayStorage';

@injectable()
export class VisitedLexicalScopeNodesStackStorage extends ArrayStorage <TNodeWithLexicalScopeAndStatements> implements IVisitedLexicalScopeNodesStackStorage {
    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IArrayUtils} arrayUtils
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
    ) {
        super(randomGenerator, options);

        this.arrayUtils = arrayUtils;
    }

    /**
     * @returns {TNodeWithLexicalScopeAndStatements | undefined}
     */
    public getLastElement (): TNodeWithLexicalScopeAndStatements | undefined {
        return this.arrayUtils.getLastElement(this.getStorage());
    }

    /**
     * @param {TNodeWithLexicalScopeAndStatements} lexicalScopeNode
     */
    public push (lexicalScopeNode: TNodeWithLexicalScopeAndStatements): void {
        this.storage.push(lexicalScopeNode);
    }

    /**
     * @returns {TNodeWithLexicalScopeAndStatements | undefined}
     */
    public pop (): TNodeWithLexicalScopeAndStatements | undefined {
        return this.storage.pop();
    }
}
