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
     * @type {Map<ESTree.ObjectExpression, TNodeWithScope>}
     */
    private readonly cachedHostScopesMap: Map <ESTree.ObjectExpression, TNodeWithScope> = new Map();

    /**
     * @type {Map<ESTree.ObjectExpression, ESTree.Statement>}
     */
    private readonly cachedHostStatementsMap: Map <ESTree.ObjectExpression, ESTree.Statement> = new Map();

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
        }

        if (NodeGuards.isIdentifierNode(propertyKeyNode)) {
            return propertyKeyNode.name;
        }

        return null;
    }

    /**
     * @param {Node} node
     * @returns {propertyValueNode is Pattern}
     */
    private static isProhibitedPattern (node: ESTree.Node): node is ESTree.Pattern {
        return NodeGuards.isObjectPatternNode(node)
            || NodeGuards.isArrayPatternNode(node)
            || NodeGuards.isAssignmentPatternNode(node)
            || NodeGuards.isRestElementNode(node);
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        if (transformationStage !== TransformationStage.Converting) {
            return null;
        }

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
        if (!objectExpressionNode.properties.length) {
            return objectExpressionNode;
        }

        if (NodeGuards.isVariableDeclaratorNode(parentNode)) {
            return this.transformWithVariableDeclaratorHost(objectExpressionNode, parentNode);
        }

        if (NodeGuards.isAssignmentExpressionNode(parentNode)) {
            return this.transformWithAssignmentExpressionHost(objectExpressionNode, parentNode);
        }

        return objectExpressionNode;
    }

    /**
     * @param {Property[]} properties
     * @param {Expression} memberExpressionHostNode
     * @returns {[ExpressionStatement[] , number[]]}
     */
    private extractPropertiesToExpressionStatements (
        properties: ESTree.Property[],
        memberExpressionHostNode: ESTree.Expression
    ): [ESTree.ExpressionStatement[], number[]] {
        const propertiesLength: number = properties.length;
        const expressionStatements: ESTree.ExpressionStatement[] = [];
        const removablePropertyIds: number[] = [];

        for (let i: number = 0; i < propertiesLength; i++) {
            const property: ESTree.Property = properties[i];
            const propertyValue: ESTree.Expression | ESTree.Pattern = property.value;

            // invalid property nodes
            if (ObjectExpressionKeysTransformer.isProhibitedPattern(propertyValue)) {
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
                .memberExpressionNode(memberExpressionHostNode, memberExpressionProperty, true);
            const expressionStatementNode: ESTree.ExpressionStatement = NodeFactory.expressionStatementNode(
                NodeFactory.assignmentExpressionNode('=', memberExpressionNode, propertyValue)
            );

            /**
             * Stage 3: recursively processing nested object expressions
             */
            if (NodeGuards.isObjectExpressionNode(property.value)) {
                this.transformObjectExpressionNode(property.value, memberExpressionNode);
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
     * @param {Statement} hostStatement
     * @returns {TNodeWithScope}
     */
    private getHostScopeNode (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): TNodeWithScope {
        if (this.cachedHostScopesMap.has(objectExpressionNode)) {
            return <TNodeWithScope>this.cachedHostScopesMap.get(objectExpressionNode);
        }

        const scopeNode: TNodeWithScope = NodeUtils.getScopeOfNode(hostStatement);

        this.cachedHostScopesMap.set(objectExpressionNode, scopeNode);

        return scopeNode;
    }

    /**
     * Returns host statement of object expression node
     *
     * @param {NodeGuards} objectExpressionNode
     * @returns {Node}
     */
    private getHostStatement (objectExpressionNode: ESTree.ObjectExpression): ESTree.Statement {
        if (this.cachedHostStatementsMap.has(objectExpressionNode)) {
            return <ESTree.Statement>this.cachedHostStatementsMap.get(objectExpressionNode);
        }

        const hostStatement: ESTree.Statement = NodeUtils.getRootStatementOfNode(objectExpressionNode);

        this.cachedHostStatementsMap.set(objectExpressionNode, hostStatement);

        return hostStatement;
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {VariableDeclarator} hostNode
     * @returns {Node}
     */
    private transformWithVariableDeclaratorHost (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.VariableDeclarator
    ): ESTree.Node {
        // should pass only Expression nodes as MemberExpression.object value
        if (!NodeGuards.isIdentifierNode(hostNode.id)) {
            return objectExpressionNode;
        }

        return this.transformObjectExpressionNode(
            objectExpressionNode,
            hostNode.id
        );
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {AssignmentExpression} hostNode
     * @returns {Node}
     */
    private transformWithAssignmentExpressionHost (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.AssignmentExpression
    ): ESTree.Node {
        const leftNode: ESTree.MemberExpression | ESTree.Pattern = hostNode.left;

        // left node shouldn't be as Pattern node
        if (ObjectExpressionKeysTransformer.isProhibitedPattern(leftNode)) {
            return objectExpressionNode;
        }

        return this.transformObjectExpressionNode(
            objectExpressionNode,
            leftNode
        );
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Expression} memberExpressionHostNode
     * @returns {Node}
     */
    private transformObjectExpressionNode (
        objectExpressionNode: ESTree.ObjectExpression,
        memberExpressionHostNode: ESTree.Expression
    ): ESTree.Node {
        const properties: ESTree.Property[] = objectExpressionNode.properties;
        const [expressionStatements, removablePropertyIds]: [ESTree.ExpressionStatement[], number[]] = this
            .extractPropertiesToExpressionStatements(properties, memberExpressionHostNode);

        const hostStatement: ESTree.Statement = this.getHostStatement(objectExpressionNode);
        const scopeNode: TNodeWithScope = this.getHostScopeNode(objectExpressionNode, hostStatement);

        objectExpressionNode.properties = properties.filter((property: ESTree.Property, index: number) =>
            !removablePropertyIds.includes(index)
        );
        NodeAppender.insertAfter(scopeNode, expressionStatements, hostStatement);

        return objectExpressionNode;
    }
}
