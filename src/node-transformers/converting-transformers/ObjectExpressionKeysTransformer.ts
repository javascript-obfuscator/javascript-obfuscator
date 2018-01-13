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
import { NodeGuards } from '../../node/NodeGuards';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class ObjectExpressionKeysTransformer extends AbstractNodeTransformer {
    /**
     * @type {Map<VariableDeclarator, TNodeWithScope>}
     */
    private cachedScopeNodesMap: Map <ESTree.VariableDeclarator, TNodeWithScope> = new Map();

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
     * @param {ExpressionStatement[]} expressionStatements
     * @param {Node} variableDeclarator
     */
    private static appendExpressionStatements (
        scopeNode: TNodeWithScope,
        expressionStatements: ESTree.ExpressionStatement[],
        variableDeclarator: ESTree.Node
    ): void {
        const variableDeclaration: ESTree.Node | undefined = variableDeclarator.parentNode;

        if (!variableDeclaration || !NodeGuards.isVariableDeclarationNode(variableDeclaration)) {
            throw new Error('Cannot find variable declaration for variable declarator');
        }

        NodeAppender.insertNodeAfter(scopeNode, expressionStatements, variableDeclaration);
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
                            && NodeGuards.isVariableDeclaratorNode(parentNode)
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
     * @param {NodeGuards} variableDeclarator
     * @returns {NodeGuards}
     */
    public transformNode (objectExpressionNode: ESTree.ObjectExpression, variableDeclarator: ESTree.VariableDeclarator): ESTree.Node {
        // should pass only Expression nodes as MemberExpression.object value
        if (!NodeGuards.isIdentifierNode(variableDeclarator.id)) {
            return objectExpressionNode;
        }

        const scopeNode: TNodeWithScope | null = NodeUtils.getScopeOfNode(variableDeclarator);

        if (!scopeNode || !NodeGuards.isNodeHasScope(scopeNode)) {
            return objectExpressionNode;
        }

        this.cachedScopeNodesMap.set(variableDeclarator, scopeNode);

        return this.transformObjectExpressionNode(
            objectExpressionNode,
            variableDeclarator.id,
            variableDeclarator
        );
    }

    /**
     * @param {Property[]} properties
     * @param {Expression} memberExpressionObject
     * @param {VariableDeclarator} variableDeclarator
     * @returns {[ExpressionStatement[] , number[]]}
     */
    private extractPropertiesToExpressionStatements (
        properties: ESTree.Property[],
        memberExpressionObject: ESTree.Expression,
        variableDeclarator: ESTree.VariableDeclarator
    ): [ESTree.ExpressionStatement[], number[]] {
        const propertiesLength: number = properties.length;
        const expressionStatements: ESTree.ExpressionStatement[] = [];
        const removablePropertyIds: number[] = [];

        for (let i: number = 0; i < propertiesLength; i++) {
            const property: ESTree.Property = properties[i];
            const propertyKey: ESTree.Expression = property.key;

            // invalid property nodes
            if (
                NodeGuards.isObjectPatternNode(property.value)
                || NodeGuards.isArrayPatternNode(property.value)
                || NodeGuards.isAssignmentPatternNode(property.value)
                || NodeGuards.isRestElementNode(property.value)
            ) {
                continue;
            }

            /**
             * Stage 1: collecting property node key names
             */
            let propertyKeyName: string;

            if (NodeGuards.isLiteralNode(propertyKey) && typeof propertyKey.value === 'string') {
                propertyKeyName = propertyKey.value;
            } else if (NodeGuards.isIdentifierNode(propertyKey)) {
                propertyKeyName = propertyKey.name;
            } else {
                continue;
            }

            /**
             * Stage 2: creating new expression statement node with member expression based on removed property
             */
            const shouldCreateLiteralNode: boolean = !property.computed
                || (property.computed && NodeGuards.isLiteralNode(property.key));
            const memberExpressionProperty: ESTree.Expression = shouldCreateLiteralNode
                ? Nodes.getLiteralNode(propertyKeyName)
                : Nodes.getIdentifierNode(propertyKeyName);
            const memberExpressionNode: ESTree.MemberExpression = Nodes
                .getMemberExpressionNode(memberExpressionObject, memberExpressionProperty, true);
            const rightExpression: ESTree.Expression = property.value;
            const expressionStatementNode: ESTree.ExpressionStatement = Nodes.getExpressionStatementNode(
                Nodes.getAssignmentExpressionNode('=', memberExpressionNode, rightExpression)
            );

            /**
             * Stage 3: recursively processing nested object expressions
             */
            if (NodeGuards.isObjectExpressionNode(property.value)) {
                this.transformObjectExpressionNode(
                    property.value,
                    memberExpressionNode,
                    variableDeclarator
                );
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
     * @param {VariableDeclarator} variableDeclarator
     * @returns {Node}
     */
    private transformObjectExpressionNode (
        objectExpressionNode: ESTree.ObjectExpression,
        memberExpressionObjectNode: ESTree.Expression,
        variableDeclarator: ESTree.VariableDeclarator
    ): ESTree.Node {
        const properties: ESTree.Property[] = objectExpressionNode.properties;

        if (!properties.length) {
            return objectExpressionNode;
        }

        const scopeNode: TNodeWithScope | undefined = this.cachedScopeNodesMap.get(variableDeclarator);

        if (!scopeNode) {
            return objectExpressionNode;
        }

        const [expressionStatements, removablePropertyIds]: [ESTree.ExpressionStatement[], number[]] = this
            .extractPropertiesToExpressionStatements(properties, memberExpressionObjectNode, variableDeclarator);

        objectExpressionNode.properties = ObjectExpressionKeysTransformer
            .filterObjectExpressionProperties(properties, removablePropertyIds);
        ObjectExpressionKeysTransformer
            .appendExpressionStatements(scopeNode, expressionStatements, variableDeclarator);

        return objectExpressionNode;
    }
}
