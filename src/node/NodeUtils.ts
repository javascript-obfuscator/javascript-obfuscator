import * as escodegen from 'escodegen';
import * as esprima from 'esprima';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../types/node/TNodeWithBlockStatement';
import { TStatement } from '../types/node/TStatement';

import { NodeType } from '../enums/NodeType';

import { Node } from './Node';

export class NodeUtils {
    /**
     * @type {string[]}
     */
    private static readonly nodesWithBlockScope: string[] = [
        NodeType.ArrowFunctionExpression,
        NodeType.FunctionDeclaration,
        NodeType.FunctionExpression,
        NodeType.MethodDefinition,
        NodeType.Program
    ];

    /**
     * @param node
     * @return {T}
     */
    public static addXVerbatimPropertyToLiterals <T extends ESTree.Node> (node: T): T {
        NodeUtils.typedReplace(node, NodeType.Literal, {
            leave: (node: ESTree.Literal) => {
                node['x-verbatim-property'] = {
                    content : node.raw,
                    precedence: escodegen.Precedence.Primary
                };
            }
        });

        return node;
    }

    /**
     * @param code
     * @returns {TStatement[]}
     */
    public static convertCodeToStructure (code: string): TStatement[] {
        let structure: ESTree.Program = esprima.parse(code);

        structure = NodeUtils.addXVerbatimPropertyToLiterals(structure);
        structure = NodeUtils.parentize(structure);

        return <TStatement[]>structure.body;
    }

    /**
     * @param structure
     * @returns {string}
     */
    public static convertStructureToCode (structure: ESTree.Node[]): string {
        let code: string = '';

        for (const node of structure) {
            code += escodegen.generate(node, {
                sourceMapWithCode: true
            }).code;
        }

        return code;
    }

    /**
     * @param node
     * @param index
     * @returns {ESTree.Node}
     */
    public static getBlockStatementNodeByIndex (node: ESTree.Node, index: number = 0): ESTree.Node {
        if (Node.isNodeHasBlockStatement(node)) {
            if (node.body[index] === undefined) {
                throw new ReferenceError(`Wrong index \`${index}\`. Block-statement body length is \`${node.body.length}\``);
            }

            return node.body[index];
        }

        throw new TypeError('The specified node have no a block-statement');
    }

    /**
     * @param node
     * @param blockScopes
     * @returns {ESTree.Node}
     */
    public static getBlockScopesOfNode (node: ESTree.Node, blockScopes: TNodeWithBlockStatement[] = []): TNodeWithBlockStatement[] {
        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (Node.isBlockStatementNode(parentNode)) {
            if (!parentNode.parentNode) {
                throw new ReferenceError('`parentNode` property of `parentNode` of given node is `undefined`');
            }

            if (NodeUtils.nodesWithBlockScope.includes(parentNode.parentNode.type)) {
                blockScopes.push(parentNode);
            }
        }

        if (!Node.isProgramNode(parentNode)) {
            return NodeUtils.getBlockScopesOfNode(parentNode, blockScopes);
        }

        blockScopes.push(parentNode);

        return blockScopes;
    }

    /**
     * @param node
     * @param depth
     * @returns {number}
     */
    public static getNodeBlockScopeDepth (node: ESTree.Node, depth: number = 0): number {
        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (Node.isProgramNode(parentNode)) {
            return depth;
        }

        if (Node.isBlockStatementNode(node) && NodeUtils.nodesWithBlockScope.includes(parentNode.type)) {
            return NodeUtils.getNodeBlockScopeDepth(parentNode, ++depth);
        }

        return NodeUtils.getNodeBlockScopeDepth(parentNode, depth);
    }

    /**
     * @param unaryExpressionNode
     * @returns {ESTree.Node}
     */
    public static getUnaryExpressionArgumentNode (unaryExpressionNode: ESTree.UnaryExpression): ESTree.Node {
        if (Node.isUnaryExpressionNode(unaryExpressionNode.argument)) {
            return NodeUtils.getUnaryExpressionArgumentNode(unaryExpressionNode.argument);
        }

        return unaryExpressionNode.argument;
    }

    /**
     * @param node
     * @return {T}
     */
    public static parentize <T extends ESTree.Node> (node: T): T {
        let isRootNode: boolean = true;

        estraverse.traverse(node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                let value: ESTree.Node;

                if (isRootNode) {
                    if (node.type === NodeType.Program) {
                        value = node;
                    } else {
                        value = Node.getProgramNode(<TStatement[]>[node]);
                        value.parentNode = value;
                    }

                    isRootNode = false;
                } else {
                    value = parentNode || node;
                }

                node.parentNode = value;
                node.obfuscated = false;
            }
        });

        return node;
    }

    /**
     * @param node
     * @param nodeType
     * @param visitor
     */
    public static typedReplace (
        node: ESTree.Node,
        nodeType: string,
        visitor: {enter?: (node: ESTree.Node) => void, leave?: (node: ESTree.Node) => void},
    ): void {
        NodeUtils.typedTraverse(node, nodeType, visitor, 'replace');
    }

    /**
     * @param node
     * @param nodeType
     * @param visitor
     * @param traverseType
     */
    public static typedTraverse (
        node: ESTree.Node,
        nodeType: string,
        visitor: estraverse.Visitor,
        traverseType: string = 'traverse'
    ): void {
        (<any>estraverse)[traverseType](node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (node.type === nodeType && visitor.enter) {
                    return visitor.enter(node, parentNode);
                }
            },
            leave: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (node.type === nodeType && visitor.leave) {
                    return visitor.leave(node, parentNode);
                }
            }
        });
    }
}
