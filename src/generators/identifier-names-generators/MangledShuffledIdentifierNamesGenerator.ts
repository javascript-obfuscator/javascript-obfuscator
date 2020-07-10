import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { numbersString } from '../../constants/NumbersString';
import { alphabetString } from '../../constants/AlphabetString';
import { alphabetStringUppercase } from '../../constants/AlphabetStringUppercase';

import { MangledIdentifierNamesGenerator } from './MangledIdentifierNamesGenerator';

@injectable()
export class MangledShuffledIdentifierNamesGenerator extends MangledIdentifierNamesGenerator {
    /**
     * @type {string[]}
     */
    protected static shuffledNameSequence: string[];

    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @param {IArrayUtils} arrayUtils
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.arrayUtils = arrayUtils;
    }

    @postConstruct()
    public initialize (): void {
        this.initializeNameSequence([
            ...`${numbersString}`,
            ...this.arrayUtils.shuffle([...`${alphabetString}${alphabetStringUppercase}`])
        ]);
    }

    /**
     * @param {string[]} nameSequence
     */
    protected initializeNameSequence (nameSequence: string[]): void {
        if (!this.getNameSequence()) {
            MangledShuffledIdentifierNamesGenerator.shuffledNameSequence = nameSequence;
        }
    }

    /**
     * @returns {string[]}
     */
    protected getNameSequence (): string[] {
        return MangledShuffledIdentifierNamesGenerator.shuffledNameSequence;
    }

    /**
     * @param {string} previousMangledName
     * @returns {string}
     */
    protected generateNewMangledName (previousMangledName: string): string {
        return super.generateNewMangledName(previousMangledName);
    }
}
