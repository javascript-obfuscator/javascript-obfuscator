import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithBlockScope } from '../../../../types/node/TNodeWithBlockScope';

import { IIdentifierNamesGenerator } from '../../../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IIdentifierObfuscatingReplacer } from '../../../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../../../interfaces/options/IOptions';

import { AbstractObfuscatingReplacer } from '../AbstractObfuscatingReplacer';
import { NodeFactory } from '../../../../node/NodeFactory';

@injectable()
export class BaseIdentifierObfuscatingReplacer extends AbstractObfuscatingReplacer implements IIdentifierObfuscatingReplacer {
    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {Map<TNodeWithBlockScope, Map<string, string>>}
     */
    private readonly blockScopesMap: Map<TNodeWithBlockScope, Map<string, string>> = new Map();

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
     * @param {TNodeWithBlockScope} blockScopeNode
     * @returns {Identifier}
     */
    public replace (nodeValue: string, blockScopeNode: TNodeWithBlockScope): ESTree.Identifier {
        if (this.blockScopesMap.has(blockScopeNode)) {
            const namesMap: Map<string, string> = <Map<string, string>>this.blockScopesMap.get(blockScopeNode);

            if (namesMap.has(nodeValue)) {
                nodeValue = <string>namesMap.get(nodeValue);
            }
        }

        return NodeFactory.identifierNode(nodeValue);
    }

    /**
     * Store `nodeName` of global identifiers as key in map with random name as value.
     * Reserved name will be ignored.
     *
     * @param {string} nodeName
     * @param {TNodeWithBlockScope} blockScopeNode
     */
    public storeGlobalName (nodeName: string, blockScopeNode: TNodeWithBlockScope): void {
        if (this.isReservedName(nodeName)) {
            return;
        }

        const identifierName: string = this.identifierNamesGenerator.generateWithPrefix();

        if (!this.blockScopesMap.has(blockScopeNode)) {
            this.blockScopesMap.set(blockScopeNode, new Map());
        }

        const namesMap: Map<string, string> = <Map<string, string>>this.blockScopesMap.get(blockScopeNode);

        namesMap.set(nodeName, identifierName);
    }

    /**
     * Store `nodeName` of local identifier as key in map with random name as value.
     * Reserved name will be ignored.
     *
     * @param {string} nodeName
     * @param {TNodeWithBlockScope} blockScopeNode
     */
    public storeLocalName (nodeName: string, blockScopeNode: TNodeWithBlockScope): void {
        if (this.isReservedName(nodeName)) {
            return;
        }

        const identifierName: string = this.identifierNamesGenerator.generate();

        if (!this.blockScopesMap.has(blockScopeNode)) {
            this.blockScopesMap.set(blockScopeNode, new Map());
        }

        const namesMap: Map<string, string> = <Map<string, string>>this.blockScopesMap.get(blockScopeNode);

        namesMap.set(nodeName, identifierName);
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
