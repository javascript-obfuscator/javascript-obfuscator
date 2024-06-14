/* eslint-disable */

//copy whole of MangledIdentifierNamesGenerator 
//extend and overriding nameSequence not working

import { inject, injectable } from 'inversify'
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers'

import { IOptions } from '../../interfaces/options/IOptions'
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator'
import { ISetUtils } from '../../interfaces/utils/ISetUtils'

// import { MangledIdentifierNamesGenerator } from './MangledIdentifierNamesGenerator'
import { unicodeString } from '../../constants/UnicodeString'

import { reservedIdentifierNames } from '../../constants/ReservedIdentifierNames'

import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator'
import { NodeLexicalScopeUtils } from '../../node/NodeLexicalScopeUtils'
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope'
import { numbersString } from '../../constants/NumbersString'

@injectable()
export class MangledUnicodeIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    /**
    * @type {number}
    */
    private static readonly maxRegenerationAttempts: number = 20;

    /**
     * @type {string}
     */
    private static readonly initMangledNameCharacter: string = '9';

    /**
     * @type {string[]}
     */
    protected static readonly nameSequence: string[] = unicodeString

    //     [
    //     ...`${numbersString}${alphabetString}${alphabetStringUppercase}`
    // ];

    /**
     * Reserved JS words with length of 2-4 symbols that can be possible generated with this replacer
     * + reserved DOM names like `Set`, `Map`, `Date`, etc
     *
     * @type {Set<string>}
     */
    private static readonly reservedNamesSet: Set<string> = new Set(reservedIdentifierNames);

    /**
     * @type {string}
     */
    private lastMangledName: string = MangledUnicodeIdentifierNamesGenerator.initMangledNameCharacter;

    /**
     * @type {WeakMap<TNodeWithLexicalScope, string>}
     */
    private readonly lastMangledNameForScopeMap: WeakMap<TNodeWithLexicalScope, string> = new WeakMap();

    /**
     * @type {WeakMap<string, string>}
     */
    private readonly lastMangledNameForLabelMap: Map<string, string> = new Map();

    /**
     * @type {ISetUtils}
     */
    private readonly setUtils: ISetUtils


    /**
     * @type {string[]}
     */
    // protected static override readonly nameSequence = unicodeString.join('').split('');

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {ISetUtils} setUtils
     */
    public constructor(
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.ISetUtils) setUtils: ISetUtils,
    ) {
        super(randomGenerator, options)

        this.setUtils = setUtils
    }

    /**
     * Generates next name based on a global previous mangled name
     * We can ignore nameLength parameter here, it hasn't sense with this generator
     *
     * @param {number} nameLength
     * @returns {string}
     */
    public generateNext(nameLength?: number): string {
        const identifierName: string = this.generateNewMangledName(this.lastMangledName)

        this.updatePreviousMangledName(identifierName)
        this.preserveName(identifierName)

        return identifierName
    }

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    public generateForGlobalScope(nameLength?: number): string {
        const prefix: string = this.options.identifiersPrefix ?
            `${this.options.identifiersPrefix}`
            : ''

        const identifierName: string = this.generateNewMangledName(
            this.lastMangledName,
            (newIdentifierName: string) => {
                const identifierNameWithPrefix: string = `${prefix}${newIdentifierName}`

                return this.isValidIdentifierName(identifierNameWithPrefix)
            }
        )
        const identifierNameWithPrefix: string = `${prefix}${identifierName}`

        this.updatePreviousMangledName(identifierName)
        this.preserveName(identifierNameWithPrefix)

        return identifierNameWithPrefix
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nameLength
     * @returns {string}
     */
    public generateForLexicalScope(lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string {
        const lexicalScopes: TNodeWithLexicalScope[] = [
            lexicalScopeNode,
            ...NodeLexicalScopeUtils.getLexicalScopes(lexicalScopeNode)
        ]

        const lastMangledNameForScope: string = this.getLastMangledNameForScopes(lexicalScopes)
        const identifierName: string = this.generateNewMangledName(
            lastMangledNameForScope,
            (newIdentifierName: string) =>
                this.isValidIdentifierNameInLexicalScopes(newIdentifierName, lexicalScopes)
        )

        this.lastMangledNameForScopeMap.set(lexicalScopeNode, identifierName)

        this.updatePreviousMangledName(identifierName)
        this.preserveNameForLexicalScope(identifierName, lexicalScopeNode)

        return identifierName
    }

    /**
     * @param {string} label
     * @param {number} nameLength
     * @returns {string}
     */
    public generateForLabel(label: string, nameLength?: number): string {
        const lastMangledNameForLabel: string = this.getLastMangledNameForLabel(label)

        const identifierName: string = this.generateNewMangledName(lastMangledNameForLabel)

        this.updatePreviousMangledNameForLabel(identifierName, label, lastMangledNameForLabel)

        return identifierName
    }

    /**
     * @param {string} nextName
     * @param {string} prevName
     * @returns {boolean}
     */
    // eslint-disable-next-line complexity
    public isIncrementedMangledName(nextName: string, prevName: string): boolean {
        if (nextName === prevName) {
            return false
        }

        const nextNameLength: number = nextName.length
        const prevNameLength: number = prevName.length

        if (nextNameLength !== prevNameLength) {
            return nextNameLength > prevNameLength
        }

        const nameSequence: string[] = this.getNameSequence()

        for (let i: number = 0; i < nextNameLength; i++) {
            const nextNameCharacter: string = nextName[i]
            const prevNameCharacter: string = prevName[i]

            if (nextNameCharacter === prevNameCharacter) {
                continue
            }

            const indexOfNextNameCharacter: number = nameSequence.indexOf(nextNameCharacter)
            const indexOfPrevNameCharacter: number = nameSequence.indexOf(prevNameCharacter)

            return indexOfNextNameCharacter > indexOfPrevNameCharacter
        }

        throw new Error('Something goes wrong during comparison of mangled names')
    }

    /**
     * @param {string} mangledName
     * @returns {boolean}
     */
    public override isValidIdentifierName(mangledName: string): boolean {
        return super.isValidIdentifierName(mangledName)
            && !MangledUnicodeIdentifierNamesGenerator.reservedNamesSet.has(mangledName)
    }

    /**
     * @returns {string[]}
     */
    protected getNameSequence(): string[] {
        return MangledUnicodeIdentifierNamesGenerator.nameSequence
    }

    /**
     * @param {string} name
     */
    protected updatePreviousMangledName(name: string): void {
        if (!this.isIncrementedMangledName(name, this.lastMangledName)) {
            return
        }

        this.lastMangledName = name
    }

    /**
     * @param {string} name
     * @param {string} label
     * @param {string} lastMangledNameForLabel
     */
    protected updatePreviousMangledNameForLabel(name: string, label: string, lastMangledNameForLabel: string): void {
        if (!this.isIncrementedMangledName(name, lastMangledNameForLabel)) {
            return
        }

        this.lastMangledNameForLabelMap.set(label, name)
    }

    /**
     * @param {string} previousMangledName
     * @param {(newIdentifierName: string) => boolean} validationFunction
     * @returns {string}
     */
    protected generateNewMangledName(
        previousMangledName: string,
        validationFunction?: (newIdentifierName: string) => boolean
    ): string {
        const generateNewMangledName = (name: string, regenerationAttempt: number = 0): string => {
            /**
             * Attempt to decrease amount of regeneration tries because of large preserved names set
             * When we reached the limit, we're trying to generate next mangled name based on the latest
             * preserved name
             */
            if (regenerationAttempt > MangledUnicodeIdentifierNamesGenerator.maxRegenerationAttempts) {
                const lastPreservedName = this.setUtils.getLastElement(this.preservedNamesSet)

                if (lastPreservedName) {
                    return this.generateNewMangledName(lastPreservedName)
                }
            }

            const nameSequence: string[] = this.getNameSequence()
            const nameSequenceLength: number = nameSequence.length
            const nameLength: number = name.length

            const zeroSequence: (num: number) => string = (num: number): string => {
                return '0'.repeat(num)
            }

            let index: number = nameLength - 1

            do {
                const character: string = name[index]
                const indexInSequence: number = nameSequence.indexOf(character)
                const lastNameSequenceIndex: number = nameSequenceLength - 1

                if (indexInSequence !== lastNameSequenceIndex) {
                    const previousNamePart: string = name.slice(0, index)
                    const nextCharacter: string = nameSequence[indexInSequence + 1]
                    const zeroSequenceLength: number = nameLength - (index + 1)
                    const zeroSequenceCharacters: string = zeroSequence(zeroSequenceLength)

                    return previousNamePart + nextCharacter + zeroSequenceCharacters
                }

                --index
            } while (index >= 0)

            const firstLetterCharacter: string = nameSequence[numbersString.length]

            return `${firstLetterCharacter}${zeroSequence(nameLength)}`
        }

        let identifierName: string = previousMangledName
        let isValidIdentifierName: boolean

        do {
            identifierName = generateNewMangledName(identifierName)
            isValidIdentifierName = validationFunction?.(identifierName)
                ?? this.isValidIdentifierName(identifierName)
        } while (!isValidIdentifierName)

        return identifierName
    }

    /**
     * @param {TNodeWithLexicalScope[]} lexicalScopeNodes
     * @returns {string}
     */
    private getLastMangledNameForScopes(lexicalScopeNodes: TNodeWithLexicalScope[]): string {
        for (const lexicalScope of lexicalScopeNodes) {
            const lastMangledName: string | null = this.lastMangledNameForScopeMap.get(lexicalScope) ?? null

            if (!lastMangledName) {
                continue
            }

            return lastMangledName
        }

        return MangledUnicodeIdentifierNamesGenerator.initMangledNameCharacter
    }

    /**
     * @param {string} label
     * @returns {string}
     */
    private getLastMangledNameForLabel(label: string): string {
        const lastMangledName: string | null = this.lastMangledNameForLabelMap.get(label) ?? null

        return lastMangledName ?? MangledUnicodeIdentifierNamesGenerator.initMangledNameCharacter
    }
}
