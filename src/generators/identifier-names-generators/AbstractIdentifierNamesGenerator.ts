import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export abstract class AbstractIdentifierNamesGenerator implements IIdentifierNamesGenerator {
    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @type {Set<string>}
     */
    protected readonly preservedNamesSet: Set<string> = new Set();

    /**
     * @type {Map<TNodeWithLexicalScope, Set<string>>}
     */
    protected readonly lexicalScopesPreservedNamesMap: Map<TNodeWithLexicalScope, Set<string>> = new Map();

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nameLength
     * @returns {string}
     */
    public generate (lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string {
        return NodeGuards.isProgramNode(lexicalScopeNode)
            ? this.generateForGlobalScope()
            : this.generateForLexicalScope(lexicalScopeNode);
    }

    /**
     * @param {string} name
     */
    public preserveName (name: string): void {
        this.preservedNamesSet.add(name);
    }

    /**
     * @param {string} name
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    public preserveNameForLexicalScope (name: string, lexicalScopeNode: TNodeWithLexicalScope): void {
        const preservedNamesForLexicalScopeSet: Set<string> =
            this.lexicalScopesPreservedNamesMap.get(lexicalScopeNode) ?? new Set();

        preservedNamesForLexicalScopeSet.add(name);

        this.lexicalScopesPreservedNamesMap.set(lexicalScopeNode, preservedNamesForLexicalScopeSet);
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    public isValidIdentifierName (name: string): boolean {
        return this.notReservedName(name) && !this.preservedNamesSet.has(name);
    }

    /**
     * @param {string} name
     * @param {TNodeWithLexicalScope[]} lexicalScopeNodes
     * @returns {boolean}
     */
    public isValidIdentifierNameInLexicalScopes (name: string, lexicalScopeNodes: TNodeWithLexicalScope[]): boolean {
        if (!this.isValidIdentifierName(name)) {
            return false;
        }

        for (const lexicalScope of lexicalScopeNodes) {
            const preservedNamesForLexicalScopeSet: Set<string> | null =
                this.lexicalScopesPreservedNamesMap.get(lexicalScope) ?? null;

            if (!preservedNamesForLexicalScopeSet) {
                continue;
            }

            if (preservedNamesForLexicalScopeSet.has(name)) {
                return false;
            }
        }

        return true;
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private notReservedName (name: string): boolean {
        return this.options.reservedNames.length
            ? !this.options.reservedNames.some((reservedName: string) =>
                new RegExp(reservedName, 'g').exec(name) !== null
            )
            : true;

    }

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    public abstract generateForGlobalScope (nameLength?: number): string;

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nameLength
     * @returns {string}
     */
    public abstract generateForLexicalScope (lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string;

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    public abstract generateNext (nameLength?: number): string;
}
