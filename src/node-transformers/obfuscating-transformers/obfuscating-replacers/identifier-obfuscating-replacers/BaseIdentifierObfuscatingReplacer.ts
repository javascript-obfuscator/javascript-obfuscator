import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithLexicalScope } from '../../../../types/node/TNodeWithLexicalScope';

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
     * @type {Map<TNodeWithLexicalScope, Map<string, string>>}
     */
    private readonly blockScopesMap: Map<TNodeWithLexicalScope, Map<string, string>> = new Map();

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
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @returns {Identifier}
     */
    public replace (nodeValue: string, lexicalScopeNode: TNodeWithLexicalScope): ESTree.Identifier {
        if (this.blockScopesMap.has(lexicalScopeNode)) {
            const namesMap: Map<string, string> = <Map<string, string>>this.blockScopesMap.get(lexicalScopeNode);

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
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    public storeGlobalName (nodeName: string, lexicalScopeNode: TNodeWithLexicalScope): void {
        if (this.isReservedName(nodeName)) {
            return;
        }

        const identifierName: string = this.identifierNamesGenerator.generateWithPrefix();

        if (!this.blockScopesMap.has(lexicalScopeNode)) {
            this.blockScopesMap.set(lexicalScopeNode, new Map());
        }

        const namesMap: Map<string, string> = <Map<string, string>>this.blockScopesMap.get(lexicalScopeNode);

        namesMap.set(nodeName, identifierName);
    }

    /**
     * Store `nodeName` of local identifier as key in map with random name as value.
     * Reserved name will be ignored.
     *
     * @param {string} nodeName
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    public storeLocalName (nodeName: string, lexicalScopeNode: TNodeWithLexicalScope): void {
        if (this.isReservedName(nodeName)) {
            return;
        }

        const identifierName: string = this.identifierNamesGenerator.generate();

        if (!this.blockScopesMap.has(lexicalScopeNode)) {
            this.blockScopesMap.set(lexicalScopeNode, new Map());
        }

        const namesMap: Map<string, string> = <Map<string, string>>this.blockScopesMap.get(lexicalScopeNode);

        namesMap.set(nodeName, identifierName);
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedName (name: string): boolean {
        if (!this.options.reservedStrings.length) {
            return false;
        }

        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').exec(name) !== null;
            });
    }
}
