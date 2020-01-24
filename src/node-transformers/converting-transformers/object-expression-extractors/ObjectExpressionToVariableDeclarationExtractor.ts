import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';
import { TObjectExpressionKeysTransformerCustomNodeFactory } from '../../../types/container/custom-nodes/TObjectExpressionKeysTransformerCustomNodeFactory';
import { TPropertiesExtractorResult } from '../../../types/node-transformers/TPropertiesExtractorResult';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { TInitialData } from '../../../types/TInitialData';
import { IPropertiesExtractor } from '../../../interfaces/node-transformers/converting-transformers/properties-extractors/IPropertiesExtractor';

import { ObjectExpressionKeysTransformerCustomNode } from '../../../enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode';

import { BasePropertiesExtractorObjectExpressionHostNode } from '../../../custom-nodes/object-expression-keys-transformer-nodes/BasePropertiesExtractorObjectExpressionHostNode';
import { NodeAppender } from '../../../node/NodeAppender';
import { NodeGuards } from '../../../node/NodeGuards';
import { NodeStatementUtils } from '../../../node/NodeStatementUtils';
import { NodeUtils } from '../../../node/NodeUtils';

@injectable()
export class ObjectExpressionToVariableDeclarationExtractor implements IPropertiesExtractor {
    /**
     * @type {TObjectExpressionKeysTransformerCustomNodeFactory}
     */
    private readonly objectExpressionKeysTransformerCustomNodeFactory: TObjectExpressionKeysTransformerCustomNodeFactory;

    /**
     * @param {TObjectExpressionKeysTransformerCustomNodeFactory} objectExpressionKeysTransformerCustomNodeFactory
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObjectExpressionKeysTransformerCustomNode)
            objectExpressionKeysTransformerCustomNodeFactory: TObjectExpressionKeysTransformerCustomNodeFactory,
    ) {
        this.objectExpressionKeysTransformerCustomNodeFactory = objectExpressionKeysTransformerCustomNodeFactory;
    }

    /**
     * extracts object expression:
     *     var object = {
     *          foo: 1,
     *          bar: 2
     *     };
     *
     * to:
     *     var _0xabc123 = {
     *          foo: 1,
     *          bar: 2
     *     };
     *     var object = _0xabc123;
     *
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @returns {TPropertiesExtractorResult}
     */
    public extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): TPropertiesExtractorResult {
        return this.transformObjectExpressionToVariableDeclaration(
            objectExpressionNode,
            hostStatement
        );
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @returns {Node}
     */
    private transformObjectExpressionToVariableDeclaration (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): TPropertiesExtractorResult {
        const properties: ESTree.Property[] = objectExpressionNode.properties;

        const newObjectExpressionHostStatement: ESTree.VariableDeclaration = this.getObjectExpressionHostNode(properties);
        const newObjectExpressionIdentifier: ESTree.Identifier = this.getObjectExpressionIdentifierNode(newObjectExpressionHostStatement);
        const newObjectExpressionNode: ESTree.ObjectExpression = this.getObjectExpressionNode(newObjectExpressionHostStatement);

        const statementsToInsert: TStatement[] = [newObjectExpressionHostStatement];
        const hostNodeWithStatements: TNodeWithStatements = NodeStatementUtils.getScopeOfNode(hostStatement);

        NodeAppender.insertBefore(hostNodeWithStatements, statementsToInsert, hostStatement);
        NodeUtils.parentizeAst(newObjectExpressionHostStatement);
        NodeUtils.parentizeNode(newObjectExpressionHostStatement, hostNodeWithStatements);

        return {
            nodeToReplace: newObjectExpressionIdentifier,
            objectExpressionHostStatement: newObjectExpressionHostStatement,
            objectExpressionNode: newObjectExpressionNode
        };
    }

    /**
     * @param {Property[]} properties
     * @returns {VariableDeclaration}
     */
    private getObjectExpressionHostNode (properties: ESTree.Property[]): ESTree.VariableDeclaration {
        const objectExpressionHostCustomNode: ICustomNode<TInitialData<BasePropertiesExtractorObjectExpressionHostNode>> =
            this.objectExpressionKeysTransformerCustomNodeFactory(
                ObjectExpressionKeysTransformerCustomNode.BasePropertiesExtractorObjectExpressionHostNode
            );

        objectExpressionHostCustomNode.initialize(properties);

        const statementNode: TStatement = objectExpressionHostCustomNode.getNode()[0];

        if (
            !statementNode
            || !NodeGuards.isVariableDeclarationNode(statementNode)
        ) {
            throw new Error(`\`objectExpressionHostCustomNode.getNode()[0]\` should returns array with \`VariableDeclaration\` node`);
        }

        return statementNode;
    }

    /**
     * @param {VariableDeclaration} objectExpressionHostNode
     * @returns {Identifier}
     */
    private getObjectExpressionIdentifierNode (objectExpressionHostNode: ESTree.VariableDeclaration): ESTree.Identifier {
        const newObjectExpressionIdentifierNode: ESTree.Pattern = objectExpressionHostNode.declarations[0].id;

        if (!NodeGuards.isIdentifierNode(newObjectExpressionIdentifierNode)) {
            throw new Error(`\`objectExpressionHostNode\` should contain \`VariableDeclarator\` node with \`Identifier\` id property`);
        }

        return newObjectExpressionIdentifierNode;
    }

    /**
     * @param {VariableDeclaration} objectExpressionHostNode
     * @returns {Identifier}
     */
    private getObjectExpressionNode (objectExpressionHostNode: ESTree.VariableDeclaration): ESTree.ObjectExpression {
        const newObjectExpressionNode: ESTree.Expression | null = objectExpressionHostNode.declarations[0].init ?? null;

        if (!newObjectExpressionNode || !NodeGuards.isObjectExpressionNode(newObjectExpressionNode)) {
            throw new Error(`\`objectExpressionHostNode\` should contain \`VariableDeclarator\` node with \`ObjectExpression\` init property`);
        }

        return newObjectExpressionNode;
    }
}
