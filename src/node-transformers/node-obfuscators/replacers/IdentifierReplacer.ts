import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/IOptions';
import { IStorage } from '../../../interfaces/IStorage';

import { AbstractReplacer } from './AbstractReplacer';
import { Utils } from '../../../Utils';

@injectable()
export class IdentifierReplacer extends AbstractReplacer {
    /**
     * @type {Map<string, string>}
     */
    private readonly namesMap: Map<string, string> = new Map<string, string>();

    /**
     * @type {string}
     */
    private uniquePrefix: string;

    /**
     * @param customNodesStorage
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);
    }

    /**
     * @param nodeValue
     * @returns {string}
     */
    public replace (nodeValue: string): string {
        const obfuscatedIdentifierName: string|undefined = this.namesMap.get(`${nodeValue}-${this.uniquePrefix}`);

        if (!obfuscatedIdentifierName) {
            return nodeValue;
        }

        return obfuscatedIdentifierName;
    }

    /**
     * @param uniquePrefix
     */
    public setPrefix (uniquePrefix: string): void {
        this.uniquePrefix = uniquePrefix
    }

    /**
     * Store all identifiers names as keys in given `namesMap` with random names as value.
     * Reserved names will be ignored.
     *
     * @param nodeName
     */
    public storeNames (nodeName: string): void {
        if (!this.uniquePrefix) {
            throw new Error('`uniquePrefix` is `undefined`. Set it before `storeNames`');
        }

        if (!this.isReservedName(nodeName)) {
            this.namesMap.set(`${nodeName}-${this.uniquePrefix}`, Utils.getRandomVariableName());
        }
    }

    /**
     * @param name
     * @returns {boolean}
     */
    private isReservedName (name: string): boolean {
        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').test(name);
            });
    }
}
