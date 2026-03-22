import * as ESTree from 'estree';

export interface IRenamePropertiesReplacer {
    /**
     * @param {string} propertyName
     */
    excludePropertyName(propertyName: string): void;

    /**
     * @param {ESTree.Identifier | ESTree.Literal | ESTree.PrivateIdentifier} node
     * @returns {ESTree.Identifier | ESTree.Literal | ESTree.PrivateIdentifier}
     */
    replace(node: ESTree.Identifier | ESTree.Literal | ESTree.PrivateIdentifier): ESTree.Identifier | ESTree.Literal | ESTree.PrivateIdentifier;
}
