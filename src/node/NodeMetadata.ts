import * as ESTree from 'estree';

export class NodeMetadata {
    /**
     * @param {Node} node
     * @param {BaseNodeMetadata} metadata
     */
    public static set <T extends ESTree.Node = ESTree.Node> (node: T, metadata: Partial<T['metadata']>): void {
        node.metadata = Object.assign(node.metadata || {}, metadata);
    }

    /**
     * @param {Node} node
     * @param {BaseNodeMetadata} metadataKey
     * @returns {T | undefined}
     */
    public static get <T extends U[keyof U], U extends ESTree.BaseNodeMetadata> (
        node: ESTree.Node,
        metadataKey: keyof U
    ): T | undefined {
        return node.metadata !== undefined
            ? <T>(<U>node.metadata)[metadataKey]
            : undefined;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isIgnoredNode (node: ESTree.Node): boolean {
        return NodeMetadata.get(node, 'ignoredNode') === true;
    }

    /**
     * @param {Node} identifierNode
     * @returns {boolean}
     */
    public static isRenamedIdentifier (identifierNode: ESTree.Identifier): boolean {
        return NodeMetadata.get<boolean, ESTree.IdentifierNodeMetadata>(identifierNode, 'renamedIdentifier') === true;
    }

    /**
     * @param {Node} literalNode
     * @returns {boolean}
     */
    public static isReplacedLiteral (literalNode: ESTree.Literal): boolean {
        return NodeMetadata.get<boolean, ESTree.SimpleLiteralNodeMetadata>(literalNode, 'replacedLiteral') === true;
    }
}
