import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitedLexicalScopeNodesStackStorage } from '../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';

import { ArrayStorage } from '../ArrayStorage';

@injectable()
export class VisitedLexicalScopeNodesStackStorage extends ArrayStorage <TNodeWithLexicalScopeStatements> implements IVisitedLexicalScopeNodesStackStorage {
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
     * @returns {TNodeWithLexicalScopeStatements | undefined}
     */
    public getLastElement (): TNodeWithLexicalScopeStatements | undefined {
        return this.arrayUtils.getLastElement(this.getStorage());
    }

    /**
     * @param {TNodeWithLexicalScopeStatements} nodeWithLexicalScopeStatements
     */
    public push (nodeWithLexicalScopeStatements: TNodeWithLexicalScopeStatements): void {
        this.storage.push(nodeWithLexicalScopeStatements);
    }

    /**
     * @returns {TNodeWithLexicalScopeStatements| undefined}
     */
    public pop (): TNodeWithLexicalScopeStatements | undefined {
        return this.storage.pop();
    }
}
