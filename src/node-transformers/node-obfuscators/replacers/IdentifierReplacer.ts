import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { IObfuscatorReplacerWithStorage } from '../../../interfaces/node-transformers/IObfuscatorReplacerWithStorage';
import { IOptions } from '../../../interfaces/options/IOptions';

import { AbstractReplacer } from './AbstractReplacer';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';

@injectable()
export class IdentifierReplacer extends AbstractReplacer implements IObfuscatorReplacerWithStorage {
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
    public replace (nodeValue: string, nodeIdentifier: string): string {
        const obfuscatedIdentifierName: string|undefined = this.namesMap.get(`${nodeValue}-${nodeIdentifier}`);

        if (!obfuscatedIdentifierName) {
            return nodeValue;
        }

        return obfuscatedIdentifierName;
    }

    /**
     * Store all identifiers names as keys in given `namesMap` with random names as value.
     * Reserved names will be ignored.
     *
     * @param nodeName
     * @param nodeIdentifier
     */
    public storeNames (nodeName: string, nodeIdentifier: string): void {
        if (!this.isReservedName(nodeName)) {
            this.namesMap.set(`${nodeName}-${nodeIdentifier}`, RandomGeneratorUtils.getRandomVariableName());
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
