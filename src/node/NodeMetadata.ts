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
    public static get <
        T extends ESTree.BaseNodeMetadata,
        TMetadataKey extends keyof T
    > (node: ESTree.Node, metadataKey: TMetadataKey): T[TMetadataKey] | undefined {
        return node.metadata !== undefined
            ? (<T>node.metadata)[metadataKey]
            : undefined;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isEvalHostNode (node: ESTree.Node): boolean {
        return NodeMetadata.get<ESTree.FunctionExpressionNodeMetadata, 'evalHostNode'>(node, 'evalHostNode') === true;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isForceTransformNode (node: ESTree.Node): boolean {
        return NodeMetadata.get<ESTree.BaseNodeMetadata, 'forceTransformNode'>(node, 'forceTransformNode') === true;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isIgnoredNode (node: ESTree.Node): boolean {
        return NodeMetadata.get<ESTree.BaseNodeMetadata, 'ignoredNode'>(node, 'ignoredNode') === true;
    }

    /**
     * @param {Identifier | Literal} node
     * @returns {boolean}
     */
    public static isPropertyKeyToRenameNode (node: ESTree.Identifier | ESTree.Literal): boolean {
        return NodeMetadata.get<ESTree.IdentifierNodeMetadata | ESTree.LiteralNodeMetadata, 'propertyKeyToRenameNode'>(
            node,
            'propertyKeyToRenameNode'
        ) === true;
    }

    /**
     * @param {Node} literalNode
     * @returns {boolean}
     */
    public static isStringArrayCallLiteralNode (literalNode: ESTree.Literal): boolean {
        return NodeMetadata.get<
            ESTree.LiteralNodeMetadata,
            'stringArrayCallLiteralNode'
        >(literalNode, 'stringArrayCallLiteralNode') === true;
    }
}
