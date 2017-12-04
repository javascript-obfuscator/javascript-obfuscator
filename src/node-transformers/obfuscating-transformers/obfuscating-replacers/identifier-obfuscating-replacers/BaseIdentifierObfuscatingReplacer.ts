import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../../../types/container/generators/TIdentifierNamesGeneratorFactory';

import { IIdentifierNamesGenerator } from '../../../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IIdentifierObfuscatingReplacer } from '../../../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../../../interfaces/options/IOptions';

import { AbstractObfuscatingReplacer } from '../AbstractObfuscatingReplacer';
import { Nodes } from '../../../../node/Nodes';

@injectable()
export class BaseIdentifierObfuscatingReplacer extends AbstractObfuscatingReplacer implements IIdentifierObfuscatingReplacer {
    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {Map<string, string>}
     */
    private readonly namesMap: Map<string, string> = new Map();

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
    }

    /**
     * @param {string} nodeValue
     * @param {number} nodeIdentifier
     * @returns {Identifier}
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
     * @param {string} nodeName
     * @param {number} nodeIdentifier
     */
    public storeNames (nodeName: string, nodeIdentifier: number): void {
        if (this.isReservedName(nodeName)) {
            return;
        }

        this.namesMap.set(`${nodeName}-${String(nodeIdentifier)}`, this.identifierNamesGenerator.generate(6));
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedName (name: string): boolean {
        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').exec(name) !== null;
            });
    }
}
