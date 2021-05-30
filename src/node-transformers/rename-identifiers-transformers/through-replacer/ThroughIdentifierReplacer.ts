import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IGlobalIdentifierNamesCacheStorage } from '../../../interfaces/storages/identifier-names-cache/IGlobalIdentifierNamesCacheStorage';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IThroughIdentifierReplacer } from '../../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IThroughIdentifierReplacer';

import { NodeFactory } from '../../../node/NodeFactory';

@injectable()
export class ThroughIdentifierReplacer implements IThroughIdentifierReplacer {
    /**
     * @type {IGlobalIdentifierNamesCacheStorage}
     */
    private readonly identifierNamesCacheStorage: IGlobalIdentifierNamesCacheStorage;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param {IGlobalIdentifierNamesCacheStorage} identifierNamesCacheStorage
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IGlobalIdentifierNamesCacheStorage)
            identifierNamesCacheStorage: IGlobalIdentifierNamesCacheStorage,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.identifierNamesCacheStorage = identifierNamesCacheStorage;
        this.options = options;
    }

    /**
     * @param {Identifier} identifierNode
     * @returns {Identifier}
     */
    public replace (identifierNode: ESTree.Identifier): ESTree.Identifier {
        const identifierName: string = identifierNode.name;
        const newIdentifierName: string = this.options.identifierNamesCache && !this.isReservedName(identifierName)
            ? this.identifierNamesCacheStorage.get(identifierName) ?? identifierName
            : identifierName;

        return NodeFactory.identifierNode(newIdentifierName);
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedName (name: string): boolean {
        if (!this.options.reservedNames.length) {
            return false;
        }

        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').exec(name) !== null;
            });
    }
}
