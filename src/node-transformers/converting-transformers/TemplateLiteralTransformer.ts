import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { Nodes } from '../../node/Nodes';

/**
 * Transform ES2015 template literals to ES5
 * Thanks to Babel for algorithm
 */
@injectable()
export class TemplateLiteralTransformer extends AbstractNodeTransformer {
    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param node
     * @return {boolean}
     */
    private static isLiteralNodeWithStringValue (node: ESTree.Node): boolean {
        return node && Node.isLiteralNode(node) && typeof node.value === 'string';
    }

    /**
     * @param templateLiteralNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (templateLiteralNode: ESTree.TemplateLiteral, parentNode: ESTree.Node): ESTree.Node {
        const templateLiteralExpressions: ESTree.Expression[] = templateLiteralNode.expressions;

        let nodes: (ESTree.Literal | ESTree.Expression)[] = [];

        for (const templateElement of templateLiteralNode.quasis) {
            nodes.push(Nodes.getLiteralNode(templateElement.value.cooked));

            const expression: ESTree.Expression | undefined = templateLiteralExpressions.shift();

            if (!expression) {
                continue;
            }

            nodes.push(expression);
        }

        nodes = nodes.filter((node: ESTree.Literal | ESTree.Expression) => {
            return !(Node.isLiteralNode(node) && node.value === '');
        });

        // since `+` is left-to-right associative
        // ensure the first node is a string if first/second isn't
        if (
            !TemplateLiteralTransformer.isLiteralNodeWithStringValue(nodes[0]) &&
            !TemplateLiteralTransformer.isLiteralNodeWithStringValue(nodes[1])
        ) {
            nodes.unshift(Nodes.getLiteralNode(''));
        }

        if (nodes.length > 1) {
            let root: ESTree.BinaryExpression = Nodes.getBinaryExpressionNode(
                '+',
                <ESTree.Literal>nodes.shift(),
                <ESTree.Expression>nodes.shift()
            );

            for (const node of nodes) {
                root = Nodes.getBinaryExpressionNode('+', root, <ESTree.Literal | ESTree.Expression>node);
            }

            return root;
        }

        return nodes[0];
    }
}
