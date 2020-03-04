import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';
import { NodeLexicalScopeUtils } from '../../node/NodeLexicalScopeUtils';

@injectable()
export class MangledIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    /**
     * @type {string}
     */
    private static readonly initMangledNameCharacter: string = '9';

    /**
     * @type {Map<TNodeWithLexicalScope, string>}
     */
    private static readonly lastMangledNameInScopeMap: Map <TNodeWithLexicalScope, string> = new Map();

    /**
     * @type {string[]}
     */
    private static readonly nameSequence: string[] = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    /**
     * Reserved JS words with length of 2-4 symbols that can be possible generated with this replacer
     *
     * @type {Set<string>}
     */
    private static readonly reservedNamesSet: Set<string> = new Set([
        'byte', 'case', 'char', 'do', 'else', 'enum', 'eval', 'for', 'goto',
        'if', 'in', 'int', 'let', 'long', 'new', 'null', 'this', 'true', 'try',
        'var', 'void', 'with'
    ]);

    /**
     * @type {string}
     */
    private previousMangledName: string = MangledIdentifierNamesGenerator.initMangledNameCharacter;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * We can only ignore limited nameLength, it has no sense here
     * @param {number} nameLength
     * @returns {string}
     */
    public generateNext (nameLength?: number): string {
        const identifierName: string = this.generateNewMangledName(this.previousMangledName);

        this.previousMangledName = identifierName;
        this.preserveName(identifierName);

        return identifierName;
    }

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    public generateForGlobalScope (nameLength?: number): string {
        const prefix: string = this.options.identifiersPrefix ?
            `${this.options.identifiersPrefix}`
            : '';
        const identifierName: string = this.generateNewMangledName(this.previousMangledName);
        const identifierNameWithPrefix: string = `${prefix}${identifierName}`;

        this.previousMangledName = identifierName;

        if (!this.isValidIdentifierName(identifierNameWithPrefix)) {
            return this.generateForGlobalScope(nameLength);
        }

        this.preserveName(identifierNameWithPrefix);

        return identifierNameWithPrefix;
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nameLength
     * @returns {string}
     */
    public generateForLexicalScope (lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string {
        const lexicalScopes: TNodeWithLexicalScope[] = [
            lexicalScopeNode,
            ...NodeLexicalScopeUtils.getLexicalScopes(lexicalScopeNode)
        ];

        const lastMangledNameForScope: string = this.getLastMangledNameForScopes(lexicalScopes);

        let identifierName: string = lastMangledNameForScope;

        do {
            identifierName = this.generateNewMangledName(identifierName);
        } while (!this.isValidIdentifierNameInLexicalScopes(identifierName, lexicalScopes));

        MangledIdentifierNamesGenerator.lastMangledNameInScopeMap.set(lexicalScopeNode, identifierName);

        this.preserveNameForLexicalScope(identifierName, lexicalScopeNode);

        return identifierName;
    }

    /**
     * @param {string} mangledName
     * @returns {boolean}
     */
    public isValidIdentifierName (mangledName: string): boolean {
        return super.isValidIdentifierName(mangledName)
            && !MangledIdentifierNamesGenerator.reservedNamesSet.has(mangledName);
    }

    /**
     * @param {string} previousMangledName
     * @returns {string}
     */
    private generateNewMangledName (previousMangledName: string): string {
        const generateNewMangledName: (name: string) => string = (name: string): string => {
            const nameSequence: string[] = MangledIdentifierNamesGenerator.nameSequence;
            const nameSequenceLength: number = nameSequence.length;
            const nameLength: number = name.length;

            const zeroSequence: (num: number) => string = (num: number): string => {
                return '0'.repeat(num);
            };

            let index: number = nameLength - 1;

            do {
                const character: string = name[index];
                const indexInSequence: number = nameSequence.indexOf(character);
                const lastNameSequenceIndex: number = nameSequenceLength - 1;

                if (indexInSequence !== lastNameSequenceIndex) {
                    const previousNamePart: string = name.substring(0, index);
                    const nextCharacter: string = nameSequence[indexInSequence + 1];
                    const zeroSequenceLength: number = nameLength - (index + 1);
                    const zeroSequenceCharacters: string = zeroSequence(zeroSequenceLength);

                    return previousNamePart + nextCharacter + zeroSequenceCharacters;
                }

                --index;
            } while (index >= 0);

            return `a${zeroSequence(nameLength)}`;
        };

        let newMangledName: string = generateNewMangledName(previousMangledName);

        if (!this.isValidIdentifierName(newMangledName)) {
            newMangledName = this.generateNewMangledName(newMangledName);
        }

        return newMangledName;
    }

    /**
     * @param {TNodeWithLexicalScope[]} lexicalScopeNodes
     * @returns {string}
     */
    private getLastMangledNameForScopes (lexicalScopeNodes: TNodeWithLexicalScope[]): string {
        for (const lexicalScope of lexicalScopeNodes) {
            const lastMangledName: string | null = MangledIdentifierNamesGenerator.lastMangledNameInScopeMap
                .get(lexicalScope) ?? null;

            if (!lastMangledName) {
                continue;
            }

            return lastMangledName;
        }

        return MangledIdentifierNamesGenerator.initMangledNameCharacter;
    }
}
