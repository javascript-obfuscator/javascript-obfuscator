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
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @returns {Identifier}
     */
    public replace (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): ESTree.Identifier {
        let identifierName: string = identifierNode.name;

        if (this.blockScopesMap.has(lexicalScopeNode)) {
            const namesMap: Map<string, string> = <Map<string, string>>this.blockScopesMap.get(lexicalScopeNode);

            if (namesMap.has(identifierName)) {
                identifierName = <string>namesMap.get(identifierName);
            }
        }

        return NodeFactory.identifierNode(identifierName);
    }

    /**
     * Store `nodeName` of global identifiers as key in map with random name as value.
     * Reserved name will be ignored.
     *
     * @param {Node} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    public storeGlobalName (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void {
        const identifierName: string = identifierNode.name;

        if (this.isReservedName(identifierName)) {
            return;
        }

        const newIdentifierName: string = this.identifierNamesGenerator.generateForGlobalScope();

        if (!this.blockScopesMap.has(lexicalScopeNode)) {
            this.blockScopesMap.set(lexicalScopeNode, new Map());
        }

        const namesMap: Map<string, string> = <Map<string, string>>this.blockScopesMap.get(lexicalScopeNode);

        namesMap.set(identifierName, newIdentifierName);
    }

    /**
     * Store `nodeName` of local identifier as key in map with random name as value.
     * Reserved name will be ignored.
     *
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    public storeLocalName (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void {
        const identifierName: string = identifierNode.name;

        if (this.isReservedName(identifierName)) {
            return;
        }

        const newIdentifierName: string = this.identifierNamesGenerator.generateForLexicalScope(lexicalScopeNode);

        if (!this.blockScopesMap.has(lexicalScopeNode)) {
            this.blockScopesMap.set(lexicalScopeNode, new Map());
        }

        const namesMap: Map<string, string> = <Map<string, string>>this.blockScopesMap.get(lexicalScopeNode);

        namesMap.set(identifierName, newIdentifierName);
    }

    /**
     * Preserve `name` to protect it from further using
     *
     * @param {Identifier} identifierNode
     */
    public preserveName (identifierNode: ESTree.Identifier): void {
        this.identifierNamesGenerator.preserveName(identifierNode.name);
    }

    /**
     * Preserve `name` to protect it from further using
     *
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    public preserveNameForLexicalScope (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void {
        this.identifierNamesGenerator.preserveNameForLexicalScope(identifierNode.name, lexicalScopeNode);
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
