import { TNodeWithBlockScope } from '../../../types/node/TNodeWithBlockScope';

export interface IIdentifierNamesGenerator {
    /**
     * @returns {string}
     */
    generate (): string;

    /**
     * @returns {string}
     */
    generateWithPrefix (): string;

    /**
     * @param {TNodeWithBlockScope} blockScopeNode
     * @returns {string}
     */
    generateForBlockScope (blockScopeNode: TNodeWithBlockScope): string;

    /**
     * @param {string} identifierName
     * @returns {boolean}
     */
    isValidIdentifierName (identifierName: string): boolean;
}
