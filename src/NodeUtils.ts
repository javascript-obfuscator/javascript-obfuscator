import * as escodegen from 'escodegen';
import * as esprima from 'esprima';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from './types/TNodeWithBlockStatement';
import { TStatement } from './types/TStatement';

import { NodeType } from './enums/NodeType';

import { Nodes } from './Nodes';
import { Utils } from './Utils';

export class NodeUtils {
    /**
     * @type {string[]}
     */
    private static nodesWithBlockScope: string[] = [
        NodeType.ArrowFunctionExpression,
        NodeType.FunctionDeclaration,
        NodeType.FunctionExpression,
        NodeType.MethodDefinition,
        NodeType.Program
    ];

    /**
     * @param node
     */
    public static addXVerbatimPropertyToLiterals (node: ESTree.Node): void {
        NodeUtils.typedReplace(node, NodeType.Literal, {
            leave: (node: ESTree.Literal) => {
                node['x-verbatim-property'] = {
                    content : node.raw,
                    precedence: escodegen.Precedence.Primary
                };
            }
        });
    }

    /**
     * @param blockScopeNode
     * @param nodeBodyStatements
     */
    public static appendNode (
        blockScopeNode: TNodeWithBlockStatement,
        nodeBodyStatements: TStatement[]
    ): void {
        if (!NodeUtils.validateBodyStatements(nodeBodyStatements)) {
            nodeBodyStatements = [];
        }

        nodeBodyStatements = NodeUtils.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);

        blockScopeNode.body = [
            ...blockScopeNode.body,
            ...nodeBodyStatements
        ];
    }

    /**
     * @param code
     * @returns {TStatement[]}
     */
    public static convertCodeToStructure (code: string): TStatement[] {
        let structure: ESTree.Program = esprima.parse(code);

        NodeUtils.addXVerbatimPropertyToLiterals(structure);
        NodeUtils.parentize(structure);

        return <TStatement[]>structure.body;
    }

    /**
     * @param node
     * @param index
     * @returns {ESTree.Node}
     */
    public static getBlockStatementNodeByIndex (node: ESTree.Node, index: number = 0): ESTree.Node {
        if (Nodes.isNodeHasBlockStatement(node)) {
            if (node.body[index] === undefined) {
                throw new ReferenceError(`Wrong index \`${index}\`. Block-statement body length is \`${node.body.length}\``);
            }

            return node.body[index];
        }

        throw new TypeError('The specified node have no a block-statement');
    }

    /**
     * @param node
     * @param depth
     * @returns {ESTree.Node}
     */
    public static getBlockScopeOfNode (node: ESTree.Node, depth: number = 0): TNodeWithBlockStatement {
        let parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (Nodes.isBlockStatementNode(parentNode)) {
            if (!parentNode.parentNode) {
                throw new ReferenceError('`parentNode` property of `parentNode` of given node is `undefined`');
            }

            if (!Utils.arrayContains(NodeUtils.nodesWithBlockScope, parentNode.parentNode.type)) {
                return NodeUtils.getBlockScopeOfNode(parentNode, depth);
            } else if (depth > 0) {
                return NodeUtils.getBlockScopeOfNode(parentNode, --depth);
            }

            return parentNode;
        }

        if (Nodes.isProgramNode(parentNode)) {
            return parentNode;
        }

        return NodeUtils.getBlockScopeOfNode(parentNode);
    }

    /**
     * @param blockScopeNode
     * @param nodeBodyStatements
     * @param index
     */
    public static insertNodeAtIndex (
        blockScopeNode: TNodeWithBlockStatement,
        nodeBodyStatements: TStatement[],
        index: number
    ): void {
        if (!NodeUtils.validateBodyStatements(nodeBodyStatements)) {
            nodeBodyStatements = [];
        }

        nodeBodyStatements = NodeUtils.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);

        blockScopeNode.body = [
            ...blockScopeNode.body.slice(0, index),
            ...nodeBodyStatements,
            ...blockScopeNode.body.slice(index)
        ];
    }

    /**
     * @param node
     */
    public static parentize (node: ESTree.Node): void {
        let isRootNode: boolean = true;

        estraverse.replace(node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                let value: ESTree.Node;

                if (isRootNode) {
                    if (node.type === NodeType.Program) {
                        value = node;
                    } else {
                        value = Nodes.getProgramNode(<TStatement[]>[node]);
                        value['parentNode'] = value;
                    }

                    isRootNode = false;
                } else {
                    value = parentNode || node;
                }

                node['parentNode'] = value;
                node['obfuscated'] = false;
            }
        });
    }

    /**
     * @param blockScopeNode
     * @param nodeBodyStatements
     */
    public static prependNode (
        blockScopeNode: TNodeWithBlockStatement,
        nodeBodyStatements: TStatement[]
    ): void {
        if (!NodeUtils.validateBodyStatements(nodeBodyStatements)) {
            nodeBodyStatements = [];
        }

        nodeBodyStatements = NodeUtils.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);

        blockScopeNode.body = [
            ...nodeBodyStatements,
            ...blockScopeNode.body,
        ];
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
                    visitor.enter(node, parentNode);
                }
            },
            leave: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (node.type === nodeType && visitor.leave) {
                    visitor.leave(node, parentNode);
                }
            }
        });
    }

    /**
     * @param blockScopeNode
     * @param nodeBodyStatements
     */
    private static parentizeBodyStatementsBeforeAppend (
        blockScopeNode: TNodeWithBlockStatement,
        nodeBodyStatements: TStatement[]
    ): TStatement[] {
        for (let statement of nodeBodyStatements) {
            statement.parentNode = blockScopeNode;
        }

        return nodeBodyStatements;
    }

    /**
     * @param nodeBodyStatements
     * @returns {boolean}
     */
    private static validateBodyStatements (nodeBodyStatements: TStatement[]): boolean {
        return nodeBodyStatements.every(statementNode => {
            return !!statementNode && statementNode.hasOwnProperty('type');
        });
    }
}
