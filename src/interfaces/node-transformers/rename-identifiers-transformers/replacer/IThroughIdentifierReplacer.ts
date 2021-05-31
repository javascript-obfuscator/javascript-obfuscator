import * as ESTree from 'estree';

export interface IThroughIdentifierReplacer {
    /**
     * @param {Identifier} identifierNode
     * @returns {Identifier}
     */
    replace (identifierNode: ESTree.Identifier): ESTree.Identifier;
}
