import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { ICryptUtilsStringArray } from '../interfaces/utils/ICryptUtilsStringArray';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { base64alphabetSwapped } from '../constants/Base64AlphabetSwapped';

import { CryptUtils } from './CryptUtils';

@injectable()
export class CryptUtilsStringArray extends CryptUtils implements ICryptUtilsStringArray {
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

    /**
     * Removes base64 encoded string without padding characters and with swapped alphabet
     *
     * @param {string} string
     * @returns {string}
     */
    public btoa (string: string): string {
        const output = super.btoa(string);

        return output.replace(/=+$/, '');
    }
}
