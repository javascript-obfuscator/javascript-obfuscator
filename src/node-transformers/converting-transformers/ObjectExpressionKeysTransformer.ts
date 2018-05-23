import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TNodeWithScope } from '../../types/node/TNodeWithScope';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class ObjectExpressionKeysTransformer extends AbstractNodeTransformer {
    /**
     * @type {Map<Node, TNodeWithScope>}
     */
    private readonly cachedScopeNodesMap: Map <ESTree.Node, TNodeWithScope> = new Map();

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {TNodeWithScope} scopeNode
     * @param {Node} hostNode
     * @param {ExpressionStatement[]} expressionStatements
     */
    private static appendExpressionStatements (
        scopeNode: TNodeWithScope,
        hostNode: ESTree.Node,
        expressionStatements: ESTree.ExpressionStatement[]
    ): void {
        const hostNodeScope: ESTree.Node = ObjectExpressionKeysTransformer.getHostStatement(hostNode);

        NodeAppender.insertNodeAfter(scopeNode, expressionStatements, hostNodeScope);
    }

    /**
     * @param {Property[]} properties
     * @param {number[]} removablePropertyIds
     * @returns {Property[]}
     */
    private static filterObjectExpressionProperties (properties: ESTree.Property[], removablePropertyIds: number[]): ESTree.Property[] {
        return properties.filter((property: ESTree.Property, index: number) => !removablePropertyIds.includes(index));
    }

    /**
     * Returns host statement of object expression node
     *
     * @param {NodeGuards} node
     * @returns {Node}
     */
    private static getHostStatement (node: ESTree.Node): ESTree.Statement {
        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (!NodeGuards.isNodeHasScope(parentNode)) {
            return ObjectExpressionKeysTransformer.getHostStatement(parentNode);
        }

        return <ESTree.Statement>node;
    }

    /**
     * @param {Property} propertyNode
     * @returns {string | null}
     */
    private static getPropertyNodeKeyName (propertyNode: ESTree.Property): string | null {
        if (!propertyNode.key) {
            return null;
        }

        const propertyKeyNode: ESTree.Expression = propertyNode.key;

        if (NodeGuards.isLiteralNode(propertyKeyNode) && typeof propertyKeyNode.value === 'string') {
            return propertyKeyNode.value;
        } else if (NodeGuards.isIdentifierNode(propertyKeyNode)) {
            return propertyKeyNode.name;
        }

        return null;
    }

    /**
     * @param {Expression | Pattern} propertyValueNode
     * @returns {propertyValueNode is Expression}
     */
    private static isValidExpressionNode (propertyValueNode: ESTree.Expression | ESTree.Pattern): propertyValueNode is ESTree.Expression {
        return !NodeGuards.isObjectPatternNode(propertyValueNode)
            && !NodeGuards.isArrayPatternNode(propertyValueNode)
            && !NodeGuards.isAssignmentPatternNode(propertyValueNode)
            && !NodeGuards.isRestElementNode(propertyValueNode);
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Converting:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (
                            this.options.transformObjectKeys
                            && parentNode
                            && NodeGuards.isObjectExpressionNode(node)
                        ) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * replaces:
     *     var object = {
     *          foo: 1,
     *          bar: 2
     *     };
     *
     * on:
     *     var object = {};
     *     object['foo'] = 1;
     *     object['bar'] = 2;
     *
     * @param {MemberExpression} objectExpressionNode
     * @param {Node} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (objectExpressionNode: ESTree.ObjectExpression, parentNode: ESTree.Node): ESTree.Node {
        if (NodeGuards.isVariableDeclaratorNode(parentNode)) {
            return this.transformVariableDeclaratorHostObjectExpression(objectExpressionNode, parentNode);
        }

        if (NodeGuards.isAssignmentExpressionNode(parentNode)) {
            return this.transformAssignmentExpressionHostObjectExpression(objectExpressionNode, parentNode);
        }

        return objectExpressionNode;
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {VariableDeclarator} variableDeclaratorNode
     * @returns {Node}
     */
    private transformVariableDeclaratorHostObjectExpression(
        objectExpressionNode: ESTree.ObjectExpression,
        variableDeclaratorNode: ESTree.VariableDeclarator
    ): ESTree.Node {
        // should pass only Expression nodes as MemberExpression.object value
        if (!NodeGuards.isIdentifierNode(variableDeclaratorNode.id)) {
            return objectExpressionNode;
        }

        const scopeNode: TNodeWithScope | null = NodeUtils.getScopeOfNode(variableDeclaratorNode);

        if (!scopeNode || !NodeGuards.isNodeHasScope(scopeNode)) {
            return objectExpressionNode;
        }

        this.cachedScopeNodesMap.set(variableDeclaratorNode, scopeNode);

        return this.transformObjectExpressionNode(
            objectExpressionNode,
            variableDeclaratorNode.id,
            variableDeclaratorNode
        );
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {AssignmentExpression} assignmentExpressionNode
     * @returns {Node}
     */
    private transformAssignmentExpressionHostObjectExpression(
        objectExpressionNode: ESTree.ObjectExpression,
        assignmentExpressionNode: ESTree.AssignmentExpression
    ): ESTree.Node {
        const leftNode: ESTree.MemberExpression | ESTree.Pattern = assignmentExpressionNode.left;

        if (!ObjectExpressionKeysTransformer.isValidExpressionNode(leftNode)) {
            return objectExpressionNode;
        }

        const scopeNode: TNodeWithScope | null = NodeUtils.getScopeOfNode(assignmentExpressionNode);

        if (!scopeNode || !NodeGuards.isNodeHasScope(scopeNode)) {
            return objectExpressionNode;
        }

        this.cachedScopeNodesMap.set(assignmentExpressionNode, scopeNode);

        return this.transformObjectExpressionNode(
            objectExpressionNode,
            leftNode,
            assignmentExpressionNode
        );
    }

    /**
     * @param {Property[]} properties
     * @param {Expression} memberExpressionObject
     * @param {Node} hostNode
     * @returns {[ExpressionStatement[] , number[]]}
     */
    private extractPropertiesToExpressionStatements (
        properties: ESTree.Property[],
        memberExpressionObject: ESTree.Expression,
        hostNode: ESTree.Node
    ): [ESTree.ExpressionStatement[], number[]] {
        const propertiesLength: number = properties.length;
        const expressionStatements: ESTree.ExpressionStatement[] = [];
        const removablePropertyIds: number[] = [];

        for (let i: number = 0; i < propertiesLength; i++) {
            const property: ESTree.Property = properties[i];
            const propertyValue: ESTree.Expression | ESTree.Pattern = property.value;

            // invalid property nodes
            if (!ObjectExpressionKeysTransformer.isValidExpressionNode(propertyValue)) {
                continue;
            }

            /**
             * Stage 1: extract property node key names
             */
            const propertyKeyName: string | null = ObjectExpressionKeysTransformer.getPropertyNodeKeyName(property);

            if (!propertyKeyName) {
                continue;
            }

            /**
             * Stage 2: creating new expression statement node with member expression based on removed property
             */
            const shouldCreateLiteralNode: boolean = !property.computed
                || (property.computed && !!property.key && NodeGuards.isLiteralNode(property.key));
            const memberExpressionProperty: ESTree.Expression = shouldCreateLiteralNode
                ? NodeFactory.literalNode(propertyKeyName)
                : NodeFactory.identifierNode(propertyKeyName);
            const memberExpressionNode: ESTree.MemberExpression = NodeFactory
                .memberExpressionNode(memberExpressionObject, memberExpressionProperty, true);
            const expressionStatementNode: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(
                NodeFactory.assignmentExpressionNode('=', memberExpressionNode, propertyValue)
            );

            /**
             * Stage 3: recursively processing nested object expressions
             */
            if (NodeGuards.isObjectExpressionNode(property.value)) {
                this.transformObjectExpressionNode(property.value, memberExpressionNode, hostNode);
            }

            /**
             * Stage 4: filling arrays
             */
            expressionStatements.push(expressionStatementNode);
            removablePropertyIds.push(i);
        }

        return [expressionStatements, removablePropertyIds];
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Expression} memberExpressionObjectNode
     * @param {Node} hostNode
     * @returns {Node}
     */
    private transformObjectExpressionNode (
        objectExpressionNode: ESTree.ObjectExpression,
        memberExpressionObjectNode: ESTree.Expression,
        hostNode: ESTree.Node
    ): ESTree.Node {
        const properties: ESTree.Property[] = objectExpressionNode.properties;

        if (!properties.length) {
            return objectExpressionNode;
        }

        const scopeNode: TNodeWithScope | undefined = this.cachedScopeNodesMap.get(hostNode);

        if (!scopeNode) {
            return objectExpressionNode;
        }

        const [expressionStatements, removablePropertyIds]: [ESTree.ExpressionStatement[], number[]] = this
            .extractPropertiesToExpressionStatements(properties, memberExpressionObjectNode, hostNode);

        objectExpressionNode.properties = ObjectExpressionKeysTransformer
            .filterObjectExpressionProperties(properties, removablePropertyIds);
        ObjectExpressionKeysTransformer
            .appendExpressionStatements(scopeNode, objectExpressionNode, expressionStatements);

        return objectExpressionNode;
    }
}
