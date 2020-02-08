import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

@injectable()
export class DictionaryIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @type {Set<string>}
     */
    private identifierNamesSet: Set<string>;
    
    /**
     * @type {IterableIterator<string>}
     */
    private identifiersIterator: IterableIterator<string>;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IArrayUtils} arrayUtils
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
    ) {
        super(randomGenerator, options);

        this.arrayUtils = arrayUtils;
        this.identifierNamesSet = new Set(this.getInitialIdentifierNames(this.options.identifiersDictionary));
        this.identifiersIterator = this.identifierNamesSet.values();
    }

    /**
     * @param {string} identifierName
     * @returns {string | null}
     */
    private static incrementIdentifierName (identifierName: string): string | null {
        let newIdentifierName: string = '';
        let isSuccess: boolean = false;

        for (const character of identifierName) {
            if (!isSuccess && character === character.toUpperCase()) {
                newIdentifierName += character.toLowerCase();
            } else if (!isSuccess && character === character.toLowerCase()) {
                newIdentifierName += character.toUpperCase();
                isSuccess = true;
            } else {
                newIdentifierName += character;
            }
        }

        if (isSuccess) {
            return newIdentifierName;
        }

        return null;
    }

    public generate (): string {
        if (!this.identifierNamesSet.size) {
            throw new Error('Too many identifiers in the code, add more words to identifiers dictionary');
        }

        const iteratorResult: IteratorResult<string> = this.identifiersIterator.next();

        if (!iteratorResult.done) {
            const identifierName: string =iteratorResult.value;

            if (!this.isValidIdentifierName(identifierName)) {
                return this.generate();
            }

            return iteratorResult.value;
        }

        this.identifierNamesSet = new Set(this.getIncrementedIdentifierNames([...this.identifierNamesSet]));
        this.identifiersIterator = this.identifierNamesSet.values();

        return this.generate();
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @returns {string}
     */
    public generateForLexicalScope (lexicalScopeNode: TNodeWithLexicalScope): string {
        const identifierName: string = this.generate();

        if (!this.isValidIdentifierNameInLexicalScope(identifierName, lexicalScopeNode)) {
            return this.generateForLexicalScope(lexicalScopeNode);
        }

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

        return `${prefix}${identifierName}`.replace('__', '_');
    }

    /**
     * @param {string[]} identifierNames
     * @returns {string[]}
     */
    private getInitialIdentifierNames (identifierNames: string[]): string[] {
        const formattedIdentifierNames: string[] = identifierNames
            .filter(Boolean)
            .map((identifierName: string) => identifierName.toLowerCase());

        return this.arrayUtils.shuffle(formattedIdentifierNames);
    }

    /**
     * @param {string[]} identifierNames
     * @returns {string[]}
     */
    private getIncrementedIdentifierNames (identifierNames: string[]): string[] {
        const formattedIdentifierNames: string[] = [];

        for (const identifierName of identifierNames) {
            const newIdentifierName: string | null = DictionaryIdentifierNamesGenerator
                .incrementIdentifierName(identifierName);

            if (newIdentifierName) {
                formattedIdentifierNames.push(newIdentifierName);
            }
        }

        return this.arrayUtils.shuffle(formattedIdentifierNames);
    }
}
