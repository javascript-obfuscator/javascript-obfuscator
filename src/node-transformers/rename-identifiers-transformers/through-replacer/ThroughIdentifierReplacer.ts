import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IIdentifierNamesCacheStorage } from '../../../interfaces/storages/identifier-names-cache/IIdentifierNamesCacheStorage';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IThroughIdentifierReplacer } from '../../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IThroughIdentifierReplacer';

import { NodeFactory } from '../../../node/NodeFactory';

@injectable()
export class ThroughIdentifierReplacer implements IThroughIdentifierReplacer {
    /**
     * @type {IIdentifierNamesCacheStorage}
     */
    private readonly identifierNamesCacheStorage: IIdentifierNamesCacheStorage;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param {IIdentifierNamesCacheStorage} identifierNamesCacheStorage
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IIdentifierNamesCacheStorage)
            identifierNamesCacheStorage: IIdentifierNamesCacheStorage,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.identifierNamesCacheStorage = identifierNamesCacheStorage;
        this.options = options;
    }

    /**
     * Store identifier node `name` of `through` identifiers as key in map with value from identifier names cache.
     * Reserved name will be ignored.
     *
     * @param {Node} identifierNode
     */
    public store (identifierNode: ESTree.Identifier): void {
        const identifierName: string = identifierNode.name;

        if (this.isReservedName(identifierName)) {
            return;
        }

        const newIdentifierName: string | null = this.identifierNamesCacheStorage.get(identifierName) ?? null;

        if (!newIdentifierName) {
            return;
        }

        this.identifierNamesCacheStorage.set(identifierName, newIdentifierName);
    }

    /**
     * @param {Identifier} identifierNode
     * @returns {Identifier}
     */
    public replace (identifierNode: ESTree.Identifier): ESTree.Identifier {
        const identifierName: string = this.identifierNamesCacheStorage.get(identifierNode.name)
            ?? identifierNode.name;

        return NodeFactory.identifierNode(identifierName);
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
