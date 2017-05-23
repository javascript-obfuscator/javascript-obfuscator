import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IIdentifierReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IIdentifierReplacer';
import { IOptions } from '../../../interfaces/options/IOptions';

import { AbstractObfuscatingReplacer } from './AbstractObfuscatingReplacer';
import { Nodes } from '../../../node/Nodes';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';

@injectable()
export class IdentifierReplacer extends AbstractObfuscatingReplacer implements IIdentifierReplacer {
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
     * @returns {ESTree.Identifier}
     */
    public replace (nodeValue: string, nodeIdentifier: number): ESTree.Identifier {
        const mapKey: string = `${nodeValue}-${String(nodeIdentifier)}`;

        if (this.namesMap.has(mapKey)) {
            nodeValue = <string>this.namesMap.get(mapKey);
        }

        return Nodes.getIdentifierNode(nodeValue);
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
            this.namesMap.set(`${nodeName}-${String(nodeIdentifier)}`, RandomGeneratorUtils.getRandomVariableName(6));
        }
    }

    /**
     * @param name
     * @returns {boolean}
     */
    private isReservedName (name: string): boolean {
        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').exec(name) !== null;
            });
    }
}
