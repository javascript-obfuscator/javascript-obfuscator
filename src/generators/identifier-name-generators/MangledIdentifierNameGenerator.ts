import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractIdentifierNameGenerator } from './AbstractIdentifierNameGenerator';

@injectable()
export class MangledIdentifierNameGenerator extends AbstractIdentifierNameGenerator {
    /**
     * @type {string}
     */
    private static initMangledNameCharacter: string = '9';

    /**
     * @type {string[]}
     */
    private static nameSequence: string[] = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$'.split('');

    /**
     * Reserved JS words with length of 2-4 symbols that can be possible generated with this replacer
     *
     * @type {string[]}
     */
    private static reservedNames: string[] = [
        'byte', 'case', 'char', 'do', 'else', 'enum', 'eval', 'for', 'goto',
        'if', 'in', 'int', 'let', 'long', 'new', 'null', 'this', 'true', 'try',
        'var', 'void', 'with'
    ];

    /**
     * @type {string}
     */
    private previousMangledName: string = MangledIdentifierNameGenerator.initMangledNameCharacter;

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
     * @param {string} previousMangledName
     * @returns {string}
     */
    private static generateNewMangledName (previousMangledName: string): string {
        const generateNewMangledName: (name: string) => string = (name: string): string => {
            const nameSequence: string[] = MangledIdentifierNameGenerator.nameSequence;
            const zeroSequenceCache: string[] = [];

            const zeroSequence: (num: number) => string = (num: number): string => {
                let result: string = zeroSequenceCache[num];

                if (result !== undefined) {
                    return result;
                }

                result = '0'.repeat(num);
                zeroSequenceCache[num] = result;

                return result;
            };

            let cur: number = name.length - 1;

            do {
                let character: string, index: number;

                character = name.charAt(cur);
                index = nameSequence.indexOf(character);

                if (index !== (nameSequence.length - 1)) {
                    return name.substring(0, cur) + nameSequence[index + 1] + zeroSequence(name.length - (cur + 1));
                }

                --cur;
            } while (cur >= 0);

            return `a${zeroSequence(name.length)}`;
        };

        let newMangledName: string = generateNewMangledName(previousMangledName);

        if (!MangledIdentifierNameGenerator.validateMangledName(newMangledName)) {
            newMangledName = MangledIdentifierNameGenerator.generateNewMangledName(newMangledName);
        }

        return newMangledName;
    }

    /**
     * @param {string} mangledName
     * @returns {boolean}
     */
    private static validateMangledName (mangledName: string): boolean {
        return !MangledIdentifierNameGenerator.reservedNames.includes(mangledName);
    }

    /**
     * @param {number} length
     * @returns {string}
     */
    public generate (length: number): string {
        const newName: string = MangledIdentifierNameGenerator.generateNewMangledName(this.previousMangledName);

        this.previousMangledName = newName;

        return newName;
    }
}
