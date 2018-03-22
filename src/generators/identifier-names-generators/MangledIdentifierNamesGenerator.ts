import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

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
     * @type {string[]}
     */
    private static readonly reservedNames: string[] = [
        'byte', 'case', 'char', 'do', 'else', 'enum', 'eval', 'for', 'goto',
        'if', 'in', 'int', 'let', 'long', 'new', 'null', 'this', 'true', 'try',
        'var', 'void', 'with'
    ];

    /**
     * @type {string}
     */
    private previousMangledName: string = MangledIdentifierNamesGenerator.initMangledNameCharacter;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @returns {string}
     */
    public generate (): string {
        const identifierName: string = this.generateNewMangledName(this.previousMangledName);

        this.previousMangledName = identifierName;

        return identifierName;
    }

    /**
     * @returns {string}
     */
    public generateWithPrefix (): string {
        const prefix: string = this.options.identifiersPrefix ?
            `${this.options.identifiersPrefix}_`
            : '';
        const identifierName: string = this.generate();

        return `${prefix}${identifierName}`;
    }

    /**
     * @param {string} mangledName
     * @returns {boolean}
     */
    public isValidIdentifierName (mangledName: string): boolean {
        return super.isValidIdentifierName(mangledName)
            && !MangledIdentifierNamesGenerator.reservedNames.includes(mangledName);
    }

    /**
     * @param {string} previousMangledName
     * @returns {string}
     */
    private generateNewMangledName (previousMangledName: string): string {
        const generateNewMangledName: (name: string) => string = (name: string): string => {
            const nameSequence: string[] = MangledIdentifierNamesGenerator.nameSequence;
            const nameLength: number = name.length;

            const zeroSequence: (num: number) => string = (num: number): string => {
                return '0'.repeat(num);
            };

            let index: number = nameLength - 1;

            do {
                const character: string = name.charAt(index);
                const indexInSequence: number = nameSequence.indexOf(character);
                const lastNameSequenceIndex: number = nameSequence.length - 1;

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
