import * as ESTree from 'estree';

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
     * @param {Identifier} identifierNode
     * @param {TNodeWithBlockScope} blockScopeNode
     * @returns {string}
     */
    generateForBlockScope (identifierNode: ESTree.Identifier, blockScopeNode: TNodeWithBlockScope): string;

    /**
     * @param {string} identifierName
     * @returns {boolean}
     */
    isValidIdentifierName (identifierName: string): boolean;
}
