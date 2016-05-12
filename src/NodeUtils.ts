let estraverse = require('estraverse');

export class NodeUtils {
    /**
     * @param node
     * @param deep
     */
    public static getNodeScope (node: any,  deep: number = 0): any {
        let scopeNodes: string[] = [
            'FunctionDeclaration',
            'FunctionExpression',
            'ArrowFunctionExpression',
            'MethodDefinition'
        ];

        if (node.parentNode.type === 'Program') {
            return node.parentNode;
        }

        if (scopeNodes.indexOf(node.parentNode.type) < 0) {
            return NodeUtils.getNodeScope(node.parentNode, deep);
        }

        if (deep > 0) {
            return NodeUtils.getNodeScope(node.parentNode, --deep);
        }

        if (node.type !== 'BlockStatement') {
            let blockStatementNode: any;

            estraverse.traverse(node, {
                enter: function (node, parent) {
                    switch (node.type) {
                        case 'BlockStatement':
                            blockStatementNode = node;

                            this['break']();
                    }
                }
            });

            return blockStatementNode;
        }

        return node; // BlockStatement of scopeNodes
    }

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