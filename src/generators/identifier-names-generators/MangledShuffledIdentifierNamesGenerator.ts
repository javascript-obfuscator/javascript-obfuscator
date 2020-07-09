import { inject, injectable } from 'inversify';
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
        this.nameSequence = [
            ...`${numbersString}`,
            ...this.arrayUtils.shuffle([...`${alphabetString}${alphabetStringUppercase}`])
        ];
    }
}
