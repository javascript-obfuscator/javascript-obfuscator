/* eslint-disable */

import { inject, injectable } from 'inversify'
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers'

import { IOptions } from '../../interfaces/options/IOptions'
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator'
import { ISetUtils } from '../../interfaces/utils/ISetUtils'

import { MangledIdentifierNamesGenerator } from './MangledIdentifierNamesGenerator'
import { unicodeString } from '../../constants/UnicodeString'

@injectable()
export class MangledUnicodeIdentifierNamesGenerator extends MangledIdentifierNamesGenerator {
    /**
     * @type {string[]}
     */
    protected static override readonly nameSequence = unicodeString;

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
        super(randomGenerator, options, setUtils)
    }
}
