import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';

@injectable()
export class MangledIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    /**
     * @type {string}
     */
    private static readonly initMangledNameCharacter: string = '9';

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
    public generate (nameLength?: number): string {
        const identifierName: string = this.generateNewMangledName(this.previousMangledName);

        this.previousMangledName = identifierName;

        return identifierName;
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nameLength
     * @returns {string}
     */
    public generateForLexicalScope (lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string {
        const identifierName: string = this.generateNewMangledName(this.previousMangledName);

        if (!this.isValidIdentifierNameInLexicalScope(identifierName, lexicalScopeNode)) {
            return this.generateForLexicalScope(lexicalScopeNode, nameLength);
        }

        this.previousMangledName = identifierName;

        return identifierName;
    }

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    public generateWithPrefix (nameLength?: number): string {
        const prefix: string = this.options.identifiersPrefix ?
            `${this.options.identifiersPrefix}`
            : '';
        const identifierName: string = this.generate(nameLength);
        const identifierNameWithPrefix: string = `${prefix}${identifierName}`;

        this.preserveName(identifierNameWithPrefix);

        return identifierNameWithPrefix;
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
}
