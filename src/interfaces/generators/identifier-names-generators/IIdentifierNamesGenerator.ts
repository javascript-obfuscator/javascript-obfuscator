import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';

export interface IIdentifierNamesGenerator {
    /**
     * @param {number} nameLength
     * @returns {string}
     */
    generate (nameLength?: number): string;

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nameLength
     * @returns {string}
     */
    generateForLexicalScope (lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string;


    /**
     * @param {number} nameLength
     * @returns {string}
     */
    generateWithPrefix (nameLength?: number): string;

    /**
     * @param {string} identifierName
     * @returns {boolean}
     */
    isValidIdentifierName (identifierName: string): boolean;

    /**
     * @param {string} identifierName
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @returns {boolean}
     */
    isValidIdentifierNameInLexicalScope (identifierName: string, lexicalScopeNode: TNodeWithLexicalScope): boolean;

    /**
     * @param {string} identifierName
     * @param {TNodeWithLexicalScope} lexicalScope
     */
    preserveName (identifierName: string, lexicalScope: TNodeWithLexicalScope): void;
}
