import { injectable } from 'inversify';

import * as ESTree from 'estree';

import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';
import { IObjectExpressionExtractorResult } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractorResult';

import { IObjectExpressionExtractor } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractor';

import { NodeAppender } from '../../../node/NodeAppender';
import { NodeFactory } from '../../../node/NodeFactory';
import { NodeGuards } from '../../../node/NodeGuards';
import { NodeStatementUtils } from '../../../node/NodeStatementUtils';
import { NodeUtils } from '../../../node/NodeUtils';

@injectable()
export class BasePropertiesExtractor implements IObjectExpressionExtractor {
    /**
     * @param {Property} propertyNode
     * @returns {string | null}
     */
    private static getPropertyNodeKeyName (propertyNode: ESTree.Property): string | null {
        const propertyKeyNode: ESTree.Expression = propertyNode.key;

        if (
            NodeGuards.isLiteralNode(propertyKeyNode)
            && (
                typeof propertyKeyNode.value === 'string'
                || typeof propertyKeyNode.value === 'number'
            )
        ) {
            return propertyKeyNode.value.toString();
        }

        if (NodeGuards.isIdentifierNode(propertyKeyNode)) {
            return propertyKeyNode.name;
        }

        return null;
    }

    /**
     * @param {Property} node
     * @returns {boolean}
     */
    private static isProhibitedPropertyNode (node: ESTree.Property): boolean {
        return node.kind !== 'init';
    }

    /**
     * @param {Node} node
     * @returns {propertyValueNode is Pattern}
     */
    private static isProhibitedPattern (node: ESTree.Node): node is ESTree.Pattern {
        return !node
            || NodeGuards.isObjectPatternNode(node)
            || NodeGuards.isArrayPatternNode(node)
            || NodeGuards.isAssignmentPatternNode(node)
            || NodeGuards.isRestElementNode(node);
    }

    /**
     * @param {Property} property
     * @returns {boolean}
     */
    private static shouldCreateLiteralNode (property: ESTree.Property): boolean {
        return !property.computed
            || (property.computed && !!property.key && NodeGuards.isLiteralNode(property.key));
    }

    /**
     * extracts object expression properties:
     *     var _0xabc123 = {
     *          foo: 1,
     *          bar: 2
     *     };
     *
     * to:
     *     var _0xabc123 = {};
     *     _0xabc123['foo'] = 1;
     *     _0xabc123['bar'] = 2;
     *
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @returns {IObjectExpressionExtractorResult}
     */
    public extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): IObjectExpressionExtractorResult {
        const hostNode: ESTree.Node | undefined = objectExpressionNode.parentNode;

        if (
            hostNode
            && NodeGuards.isVariableDeclaratorNode(hostNode)
            && NodeGuards.isIdentifierNode(hostNode.id)
        ) {
            return this.transformObjectExpressionNode(objectExpressionNode, hostStatement, hostNode.id);
        }

        return {
            nodeToReplace: objectExpressionNode,
            objectExpressionHostStatement: hostStatement,
            objectExpressionNode: objectExpressionNode
        };
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @param {Expression} memberExpressionHostNode
     * @returns {IObjectExpressionExtractorResult}
     */
    private transformObjectExpressionNode (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement,
        memberExpressionHostNode: ESTree.Expression
    ): IObjectExpressionExtractorResult {
        const properties: (ESTree.Property | ESTree.SpreadElement)[] = objectExpressionNode.properties;
        const [expressionStatements, removablePropertyIds]: [ESTree.ExpressionStatement[], number[]] = this
            .extractPropertiesToExpressionStatements(
                properties,
                hostStatement,
                memberExpressionHostNode
            );

        const hostNodeWithStatements: TNodeWithStatements = NodeStatementUtils.getScopeOfNode(hostStatement);

        this.filterExtractedObjectExpressionProperties(objectExpressionNode, removablePropertyIds);
        NodeAppender.insertAfter(hostNodeWithStatements, expressionStatements, hostStatement);
        NodeUtils.parentizeAst(hostNodeWithStatements);

        return {
            nodeToReplace: objectExpressionNode,
            objectExpressionHostStatement: hostStatement,
            objectExpressionNode: objectExpressionNode
        };
    }

    /**
     * @param {(Property | SpreadElement)[]} properties
     * @param {Statement} hostStatement
     * @param {Expression} memberExpressionHostNode
     * @returns {[ExpressionStatement[], number[]]}
     */
    private extractPropertiesToExpressionStatements (
        properties: (ESTree.Property | ESTree.SpreadElement)[],
        hostStatement: ESTree.Statement,
        memberExpressionHostNode: ESTree.Expression
    ): [ESTree.ExpressionStatement[], number[]] {
        const propertiesLength: number = properties.length;
        const expressionStatements: ESTree.ExpressionStatement[] = [];
        const removablePropertyIds: number[] = [];

        // have to iterate in the reversed order to fast check spread elements and break iteration on them
        for (let i: number = propertiesLength - 1; i >= 0; i--) {
            const property: (ESTree.Property | ESTree.SpreadElement) = properties[i];

            // spread element
            if (NodeGuards.isSpreadElementNode(property)) {
                break;
            }

            if (BasePropertiesExtractor.isProhibitedPropertyNode(property)) {
                continue;
            }

            const propertyValue: ESTree.Expression | ESTree.Pattern = property.value;

            // invalid property node value
            if (BasePropertiesExtractor.isProhibitedPattern(propertyValue)) {
                continue;
            }

            /**
             * Stage 1: extract property node key names
             */
            const propertyKeyName: string | null = BasePropertiesExtractor.getPropertyNodeKeyName(property);

            if (!propertyKeyName) {
                continue;
            }

            /**
             * Stage 2: creating new expression statement node with member expression based on removed property
             */
            const shouldCreateLiteralNode: boolean = BasePropertiesExtractor.shouldCreateLiteralNode(property);
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
                this.transformObjectExpressionNode(property.value, hostStatement, memberExpressionNode);
            }

            /**
             * Stage 4: filling arrays
             */
            expressionStatements.unshift(expressionStatementNode);
            removablePropertyIds.unshift(i);
        }

        return [expressionStatements, removablePropertyIds];
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {number[]} removablePropertyIds
     */
    private filterExtractedObjectExpressionProperties (
        objectExpressionNode: ESTree.ObjectExpression,
        removablePropertyIds: number[]
    ): void {
        objectExpressionNode.properties = objectExpressionNode.properties
            .filter((property: ESTree.Property | ESTree.SpreadElement, index: number) =>
                !removablePropertyIds.includes(index)
            );
    }
}
