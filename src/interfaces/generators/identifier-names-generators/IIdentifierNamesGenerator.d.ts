import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';

export interface IIdentifierNamesGenerator {
    /**
     * @param {number} nameLength
     * @returns {string}
     */
    generate (nameLength?: number): string;

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    generateWithPrefix (nameLength?: number): string;

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} blockScopeNode
     * @returns {string}
     */
    generateForBlockScope (identifierNode: ESTree.Identifier, blockScopeNode: TNodeWithLexicalScope): string;

    /**
     * @param {string} identifierName
     * @returns {boolean}
     */
    isValidIdentifierName (identifierName: string): boolean;

    /**
     * @param {string} name
     */
    preserveName (name: string): void;
}
