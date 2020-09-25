import * as ESTree from 'estree';

export class NodeMetadata {
    /**
     * @param {T} node
     * @param {Partial<T["metadata"]>} metadata
     */
    public static set <T extends ESTree.Node = ESTree.Node> (node: T, metadata: Partial<T['metadata']>): void {
        node.metadata = Object.assign(node.metadata ?? {}, metadata);
    }

    /**
     * @param {Node} node
     * @param {keyof T} metadataKey
     * @returns {T[keyof T] | undefined}
     */
    public static get <T extends ESTree.BaseNodeMetadata> (node: ESTree.Node, metadataKey: keyof T): T[keyof T] | undefined {
        return node.metadata !== undefined
            ? (<T>node.metadata)[metadataKey]
            : undefined;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isForceTransformNode (node: ESTree.Node): boolean {
        return NodeMetadata.get(node, 'forceTransformNode') === true;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isIgnoredNode (node: ESTree.Node): boolean {
        return NodeMetadata.get(node, 'ignoredNode') === true;
    }

    /**
     * @param {Node} literalNode
     * @returns {boolean}
     */
    public static isReplacedLiteral (literalNode: ESTree.Literal): boolean {
        return NodeMetadata.get<ESTree.LiteralNodeMetadata>(literalNode, 'replacedLiteral') === true;
    }
}
