import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IPropertiesExtractor } from '../../../interfaces/node-transformers/converting-transformers/properties-extractors/IPropertiesExtractor';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { NodeAppender } from '../../../node/NodeAppender';
import { NodeFactory } from '../../../node/NodeFactory';
import { NodeGuards } from '../../../node/NodeGuards';
import { NodeStatementUtils } from '../../../node/NodeStatementUtils';

@injectable()
export abstract class AbstractPropertiesExtractor implements IPropertiesExtractor {
    /**
     * @type {Map<ESTree.ObjectExpression, TNodeWithStatements>}
     */
    protected readonly cachedHostNodesWithStatementsMap: Map <ESTree.ObjectExpression, TNodeWithStatements> = new Map();

    /**
     * @type {Map<ESTree.ObjectExpression, ESTree.Statement>}
     */
    protected readonly cachedHostStatementsMap: Map <ESTree.ObjectExpression, ESTree.Statement> = new Map();

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {Property} propertyNode
     * @returns {string | null}
     */
    protected static getPropertyNodeKeyName (propertyNode: ESTree.Property): string | null {
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
    protected static isProhibitedPattern (node: ESTree.Node): node is ESTree.Pattern {
        return NodeGuards.isObjectPatternNode(node)
            || NodeGuards.isArrayPatternNode(node)
            || NodeGuards.isAssignmentPatternNode(node)
            || NodeGuards.isRestElementNode(node);
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} hostNode
     * @returns {Node}
     */
    public abstract extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.Node
    ): ESTree.Node;

    /**
     * @param {Property[]} properties
     * @param {Expression} memberExpressionHostNode
     * @returns {[ExpressionStatement[] , number[]]}
     */
    protected extractPropertiesToExpressionStatements (
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
            if (AbstractPropertiesExtractor.isProhibitedPattern(propertyValue)) {
                continue;
            }

            /**
             * Stage 1: extract property node key names
             */
            const propertyKeyName: string | null = AbstractPropertiesExtractor.getPropertyNodeKeyName(property);

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
     * @param {number[]} removablePropertyIds
     */
    protected filterExtractedObjectExpressionProperties (
        objectExpressionNode: ESTree.ObjectExpression,
        removablePropertyIds: number[]
    ): void {
        objectExpressionNode.properties = objectExpressionNode.properties
            .filter((property: ESTree.Property, index: number) => !removablePropertyIds.includes(index));
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Expression} memberExpressionHostNode
     * @returns {Node}
     */
    protected transformObjectExpressionNode (
        objectExpressionNode: ESTree.ObjectExpression,
        memberExpressionHostNode: ESTree.Expression
    ): ESTree.Node {
        const properties: ESTree.Property[] = objectExpressionNode.properties;
        const [expressionStatements, removablePropertyIds]: [ESTree.ExpressionStatement[], number[]] = this
            .extractPropertiesToExpressionStatements(properties, memberExpressionHostNode);

        const hostStatement: ESTree.Statement = this.getHostStatement(objectExpressionNode);
        const hostNodeWithStatements: TNodeWithStatements = this.getHostNodeWithStatements(
            objectExpressionNode,
            hostStatement
        );

        this.filterExtractedObjectExpressionProperties(objectExpressionNode, removablePropertyIds);
        NodeAppender.insertAfter(hostNodeWithStatements, expressionStatements, hostStatement);

        return objectExpressionNode;
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @returns {TNodeWithStatements}
     */
    protected getHostNodeWithStatements (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): TNodeWithStatements {
        if (this.cachedHostNodesWithStatementsMap.has(objectExpressionNode)) {
            return <TNodeWithStatements>this.cachedHostNodesWithStatementsMap.get(objectExpressionNode);
        }

        const nodeWithStatements: TNodeWithStatements = NodeStatementUtils.getScopeOfNode(hostStatement);

        this.cachedHostNodesWithStatementsMap.set(objectExpressionNode, nodeWithStatements);

        return nodeWithStatements;
    }

    /**
     * Returns host statement of object expression node
     *
     * @param {NodeGuards} objectExpressionNode
     * @returns {Node}
     */
    protected getHostStatement (objectExpressionNode: ESTree.ObjectExpression): ESTree.Statement {
        if (this.cachedHostStatementsMap.has(objectExpressionNode)) {
            return <ESTree.Statement>this.cachedHostStatementsMap.get(objectExpressionNode);
        }

        const hostStatement: ESTree.Statement = NodeStatementUtils.getRootStatementOfNode(objectExpressionNode);

        this.cachedHostStatementsMap.set(objectExpressionNode, hostStatement);

        return hostStatement;
    }
}
