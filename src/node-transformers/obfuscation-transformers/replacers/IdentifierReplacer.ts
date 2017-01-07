import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { IObfuscationReplacerWithStorage } from '../../../interfaces/node-transformers/IObfuscationReplacerWithStorage';
import { IOptions } from '../../../interfaces/options/IOptions';

import { AbstractReplacer } from './AbstractReplacer';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';

@injectable()
export class IdentifierReplacer extends AbstractReplacer implements IObfuscationReplacerWithStorage {
    /**
     * @type {Map<string, string>}
     */
    private readonly namesMap: Map<string, string> = new Map();

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param nodeValue
     * @param nodeIdentifier
     * @returns {string}
     */
    public replace (nodeValue: string, nodeIdentifier: number): string {
        const mapKey: string = `${nodeValue}-${String(nodeIdentifier)}`;

        if (!this.namesMap.has(mapKey)) {
            return nodeValue;
        }

        return <string>this.namesMap.get(mapKey);
    }

    /**
     * Store all `nodeIdentifier`'s as keys in given `namesMap` with random names as value.
     * Reserved names will be ignored.
     *
     * @param nodeName
     * @param nodeIdentifier
     */
    public storeNames (nodeName: string, nodeIdentifier: number): void {
        if (!this.isReservedName(nodeName)) {
            this.namesMap.set(`${nodeName}-${String(nodeIdentifier)}`, RandomGeneratorUtils.getRandomVariableName(6, true, true));
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
