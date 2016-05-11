export class NodeUtils {
    /**
     * @param node
     * @param types
     * @param limitNodeTypes
     * @param deep
     */
    public static getParentNodeWithType (node: any, types: string[], limitNodeTypes: string[] = [], deep: number = 0): any {
        if (node.parentNode.type === 'Program' || limitNodeTypes.indexOf(node.parentNode.type) >= 0) {
            return node.parentNode;
        }

        if (types.indexOf(node.parentNode.type) < 0) {
            return NodeUtils.getParentNodeWithType(node.parentNode, types, limitNodeTypes, deep);
        }

        if (deep > 0) {
            return NodeUtils.getParentNodeWithType(node.parentNode, types, limitNodeTypes, --deep);
        }

        return node.parentNode;
    }
}