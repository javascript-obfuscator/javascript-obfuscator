import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { ICryptUtilsSwappedAlphabet } from '../interfaces/utils/ICryptUtilsSwappedAlphabet';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { base64alphabetSwapped } from '../constants/Base64AlphabetSwapped';

import { CryptUtils } from './CryptUtils';

@injectable()
export class CryptUtilsSwappedAlphabet extends CryptUtils implements ICryptUtilsSwappedAlphabet {
    /**
     * @type {string}
     */
    protected readonly base64Alphabet: string = base64alphabetSwapped;

    /**
     * @param {IRandomGenerator} randomGenerator
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator
    ) {
        super(randomGenerator);
    }
}
