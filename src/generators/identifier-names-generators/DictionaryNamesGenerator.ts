import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';

@injectable()
export class DictionaryNamesGenerator extends AbstractIdentifierNamesGenerator {
    /**
     * @type {string[]}
     */
    private identifiers: string[] = [];
    
    /**
     * @type {IterableIterator<string>}
     */
    private it: IterableIterator<string>;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
        for (const dict of options.identifiersDictionary) {
            this.identifiers[this.identifiers.length] = dict.toLowerCase();
        }
        this.shuffle(this.identifiers);
        this.it = this.identifiers.values();
    }

    /**
     * @param {string} str
     * @returns {string | null}
     */
    private static increment (str: string): string | null {
        let newString: string = "";
        let success: boolean = false;
        
        for (const i of str) {
            if (!success && i === i.toUpperCase()) {
                newString += i.toLowerCase();
            } else if (!success && i === i.toLowerCase()) {
                newString += i.toUpperCase();
                success = true;
            } else {
                newString += i;
            }
        }
        if (success) {
            return newString;
        }

        return null;
    }

    /**
     * @param {string[]} arr
     * @returns {string[]}
     */
    private static incrementArr (arr: string[]): string[] {
        const newArr: string[] = [];
        for (const dict of arr) {
            const newDict: string | null = DictionaryNamesGenerator.increment(dict);
            if (newDict) {
                newArr[newArr.length] = newDict;
            }
        }

        return newArr;
    }

    public generate (): string {
        if (this.identifiers.length === 0) {
            throw new Error("identifiersDictionary is empty. Add more words to identifiersDictionary");
        }
        let itResult: IteratorResult<string> = this.it.next();
        if (itResult.done) {
            this.identifiers = DictionaryNamesGenerator.incrementArr(this.identifiers);
            this.shuffle(this.identifiers);
            this.it = this.identifiers.values();
            itResult = this.it.next();
        }
        if (itResult.done) {
            throw new Error("Too many identifiers in JS code, add more words to identifiersDictionary");
        }
        const identifierName: string = itResult.value;

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

        return `${prefix}${identifierName}`.replace('__', '_');;
    }

    /**
     * @param {string[]} arr
     */
    private shuffle (arr: string[]): void {
        for (let i: number = arr.length - 1; i > 0; i--) {
            const j: number = this.randomGenerator.getRandomInteger(0, i);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
}
