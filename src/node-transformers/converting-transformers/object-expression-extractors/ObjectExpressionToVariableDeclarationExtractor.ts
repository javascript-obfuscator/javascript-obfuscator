import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';
import { TObjectExpressionKeysTransformerCustomNodeFactory } from '../../../types/container/custom-nodes/TObjectExpressionKeysTransformerCustomNodeFactory';
import { IObjectExpressionExtractorResult } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractorResult';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { TInitialData } from '../../../types/TInitialData';
import { IObjectExpressionExtractor } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractor';

import { ObjectExpressionKeysTransformerCustomNode } from '../../../enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode';

import { ObjectExpressionVariableDeclarationHostNode } from '../../../custom-nodes/object-expression-keys-transformer-nodes/ObjectExpressionVariableDeclarationHostNode';
import { NodeAppender } from '../../../node/NodeAppender';
import { NodeGuards } from '../../../node/NodeGuards';
import { NodeStatementUtils } from '../../../node/NodeStatementUtils';
import { NodeUtils } from '../../../node/NodeUtils';
import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';
import { NodeLexicalScopeUtils } from '../../../node/NodeLexicalScopeUtils';

@injectable()
export class ObjectExpressionToVariableDeclarationExtractor implements IObjectExpressionExtractor {
    /**
     * @type {TObjectExpressionKeysTransformerCustomNodeFactory}
     */
    private readonly objectExpressionKeysTransformerCustomNodeFactory: TObjectExpressionKeysTransformerCustomNodeFactory;

    /**
     * @param {TObjectExpressionKeysTransformerCustomNodeFactory} objectExpressionKeysTransformerCustomNodeFactory
     */
    public constructor (
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
     * @returns {IObjectExpressionExtractorResult}
     */
    public extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): IObjectExpressionExtractorResult {
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
    ): IObjectExpressionExtractorResult {
        const hostNodeWithStatements: TNodeWithStatements = NodeStatementUtils.getScopeOfNode(hostStatement);
        const lexicalScopeNode: TNodeWithLexicalScope | null = NodeGuards.isNodeWithLexicalScope(hostNodeWithStatements)
            ? hostNodeWithStatements
            : NodeLexicalScopeUtils.getLexicalScope(hostNodeWithStatements) ?? null;

        if (!lexicalScopeNode) {
            throw new Error('Cannot find lexical scope node for the host statement node');
        }

        const properties: (ESTree.Property | ESTree.SpreadElement)[] = objectExpressionNode.properties;

        const newObjectExpressionHostStatement: ESTree.VariableDeclaration = this.getObjectExpressionHostNode(
            lexicalScopeNode,
            properties
        );
        const statementsToInsert: TStatement[] = [newObjectExpressionHostStatement];

        NodeAppender.insertBefore(hostNodeWithStatements, statementsToInsert, hostStatement);
        NodeUtils.parentizeAst(newObjectExpressionHostStatement);
        NodeUtils.parentizeNode(newObjectExpressionHostStatement, hostNodeWithStatements);

        const newObjectExpressionIdentifier: ESTree.Identifier = this.getObjectExpressionIdentifierNode(newObjectExpressionHostStatement);
        const newObjectExpressionNode: ESTree.ObjectExpression = this.getObjectExpressionNode(newObjectExpressionHostStatement);

        return {
            nodeToReplace: newObjectExpressionIdentifier,
            objectExpressionHostStatement: newObjectExpressionHostStatement,
            objectExpressionNode: newObjectExpressionNode
        };
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {(Property | SpreadElement)[]} properties
     * @returns {VariableDeclaration}
     */
    private getObjectExpressionHostNode (
        lexicalScopeNode: TNodeWithLexicalScope,
        properties: (ESTree.Property | ESTree.SpreadElement)[]
    ): ESTree.VariableDeclaration {
        const variableDeclarationHostNodeCustomNode: ICustomNode<TInitialData<ObjectExpressionVariableDeclarationHostNode>> =
            this.objectExpressionKeysTransformerCustomNodeFactory(
                ObjectExpressionKeysTransformerCustomNode.ObjectExpressionVariableDeclarationHostNode
            );

        variableDeclarationHostNodeCustomNode.initialize(lexicalScopeNode, properties);

        const statementNode: TStatement = variableDeclarationHostNodeCustomNode.getNode()[0];

        if (
            !statementNode
            || !NodeGuards.isVariableDeclarationNode(statementNode)
        ) {
            throw new Error('`objectExpressionHostCustomNode.getNode()[0]` should returns array with `VariableDeclaration` node');
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
            throw new Error('`objectExpressionHostNode` should contain `VariableDeclarator` node with `Identifier` id property');
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
            throw new Error('`objectExpressionHostNode` should contain `VariableDeclarator` node with `ObjectExpression` init property');
        }

        return newObjectExpressionNode;
    }
}
