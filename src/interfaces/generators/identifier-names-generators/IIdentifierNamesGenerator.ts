import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';

export interface IIdentifierNamesGenerator {
    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {number} nameLength
     * @returns {string}
     */
    generate (lexicalScopeNode: TNodeWithLexicalScope, nameLength?: number): string;

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    generateForGlobalScope (nameLength?: number): string;

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
    generateNext (nameLength?: number): string;

    /**
     * @param {string} identifierName
     * @returns {boolean}
     */
    isValidIdentifierName (identifierName: string): boolean;

    /**
     * @param {string} identifierName
     * @param {TNodeWithLexicalScope[]} lexicalScopeNodes
     * @returns {boolean}
     */
    isValidIdentifierNameInLexicalScopes (identifierName: string, lexicalScopeNodes: TNodeWithLexicalScope[]): boolean;

    /**
     * @param {string} identifierName
     */
    preserveName (identifierName: string): void;

    /**
     * @param {string} identifierName
     * @param {TNodeWithLexicalScope} lexicalScope
     */
    preserveNameForLexicalScope (identifierName: string, lexicalScope: TNodeWithLexicalScope): void;
}
