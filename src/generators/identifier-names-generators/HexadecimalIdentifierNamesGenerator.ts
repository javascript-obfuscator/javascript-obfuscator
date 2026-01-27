import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';
import { NumberUtils } from '../../utils/NumberUtils';
import { Utils } from '../../utils/Utils';

@injectable()
export class HexadecimalIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    /**
     * @type {number}
     */
    private static readonly baseIdentifierNameLength: number = 6;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor(
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    public generateNext(nameLength?: number): string {
        return this.generateNextName(nameLength, (name) => this.isValidIdentifierName(name));
    }

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    public generateForGlobalScope(nameLength?: number): string {
        return this.generateForGlobalScopeInternal(nameLength, (name) => this.isValidIdentifierName(name));
    }

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    public generateForGlobalScopeWithAllScopesValidation(nameLength?: number): string {
        return this.generateForGlobalScopeInternal(nameLength, (name) => this.isValidIdentifierNameInAllScopes(name));
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nameLength
     * @returns {string}
     */
    public generateForLexicalScope(lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string {
        return this.generateNext(nameLength);
    }

    /**
     * @param {string} label
     * @param {number} nameLength
     * @returns {string}
     */
    public generateForLabel(label: string, nameLength?: number): string {
        return this.generateNext(nameLength);
    }

    /**
     * @param {number} nameLength
     * @param {(name: string) => boolean} validationFn
     * @returns {string}
     */
    private generateForGlobalScopeInternal(
        nameLength: number | undefined,
        validationFn: (name: string) => boolean
    ): string {
        const identifierName: string = this.generateNextName(nameLength, validationFn);

        return `${this.options.identifiersPrefix}${identifierName}`.replace('__', '_');
    }

    /**
     * @param {number} nameLength
     * @param {(name: string) => boolean} validationFn
     * @returns {string}
     */
    private generateNextName(nameLength: number | undefined, validationFn: (name: string) => boolean): string {
        const rangeMinInteger: number = 10000;
        const rangeMaxInteger: number = 99_999_999;
        const randomInteger: number = this.randomGenerator.getRandomInteger(rangeMinInteger, rangeMaxInteger);
        const hexadecimalNumber: string = NumberUtils.toHex(randomInteger);
        const prefixLength: number = Utils.hexadecimalPrefix.length;
        const baseNameLength: number =
            (nameLength ?? HexadecimalIdentifierNamesGenerator.baseIdentifierNameLength) + prefixLength;
        const baseIdentifierName: string = hexadecimalNumber.slice(0, baseNameLength);
        const identifierName: string = `_${baseIdentifierName}`;

        if (!validationFn(identifierName)) {
            return this.generateNextName(nameLength, validationFn);
        }

        this.preserveName(identifierName);

        return identifierName;
    }
}
