import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

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
     * @param {string} name
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    public preserveName (name: string, lexicalScopeNode: TNodeWithLexicalScope): void {
        this.preservedNamesSet.add(name);

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
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @returns {boolean}
     */
    public isValidIdentifierNameInLexicalScope (name: string, lexicalScopeNode: TNodeWithLexicalScope): boolean {
        if (!this.notReservedName(name)) {
            return false;
        }

        const preservedNamesForLexicalScopeSet: Set<string> | null =
            this.lexicalScopesPreservedNamesMap.get(lexicalScopeNode) ?? null;

        if (!preservedNamesForLexicalScopeSet) {
            return true;
        }

        return !preservedNamesForLexicalScopeSet.has(name);
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
    public abstract generate (nameLength?: number): string;

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
    public abstract generateWithPrefix (nameLength?: number): string;
}
