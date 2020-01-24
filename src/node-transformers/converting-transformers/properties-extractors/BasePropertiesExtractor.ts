import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';
import { TObjectExpressionKeysTransformerCustomNodeFactory } from '../../../types/container/custom-nodes/TObjectExpressionKeysTransformerCustomNodeFactory';
import { TPropertiesExtractorResult } from '../../../types/node-transformers/TPropertiesExtractorResult';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { TInitialData } from '../../../types/TInitialData';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ObjectExpressionKeysTransformerCustomNode } from '../../../enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode';

import { AbstractPropertiesExtractor } from './AbstractPropertiesExtractor';
import { BasePropertiesExtractorObjectExpressionHostNode } from '../../../custom-nodes/object-expression-keys-transformer-nodes/BasePropertiesExtractorObjectExpressionHostNode';
import { NodeAppender } from '../../../node/NodeAppender';
import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class BasePropertiesExtractor extends AbstractPropertiesExtractor {
    /**
     * @type {TObjectExpressionKeysTransformerCustomNodeFactory}
     */
    private readonly objectExpressionKeysTransformerCustomNodeFactory: TObjectExpressionKeysTransformerCustomNodeFactory;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {TObjectExpressionKeysTransformerCustomNodeFactory} objectExpressionKeysTransformerCustomNodeFactory
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.Factory__IObjectExpressionKeysTransformerCustomNode)
            objectExpressionKeysTransformerCustomNodeFactory: TObjectExpressionKeysTransformerCustomNodeFactory,
    ) {
        super(randomGenerator, options);

        this.objectExpressionKeysTransformerCustomNodeFactory = objectExpressionKeysTransformerCustomNodeFactory;
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} parentNode
     * @returns {TPropertiesExtractorResult}
     */
    public extract (
        objectExpressionNode: ESTree.ObjectExpression,
        parentNode: ESTree.Node
    ): TPropertiesExtractorResult {
        return this.transformObjectExpressionNode(
            objectExpressionNode,
            parentNode
        );
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    protected transformObjectExpressionNode (
        objectExpressionNode: ESTree.ObjectExpression,
        parentNode: ESTree.Node
    ): ESTree.Node {
        const hostStatement: ESTree.Statement = this.getHostStatement(objectExpressionNode);

        if (AbstractPropertiesExtractor.isProhibitedHostStatement(objectExpressionNode, hostStatement)) {
            return objectExpressionNode;
        }

        const newObjectExpressionHostNode: ESTree.VariableDeclaration = this.getObjectExpressionHostNode();
        const newObjectExpressionIdentifier: ESTree.Identifier = this.getObjectExpressionIdentifierNode(newObjectExpressionHostNode);

        const properties: ESTree.Property[] = objectExpressionNode.properties;

        const [expressionStatements, removablePropertyIds]: [ESTree.ExpressionStatement[], number[]] = this
            .extractPropertiesToExpressionStatements(properties, newObjectExpressionIdentifier);
        const statementsToInsert: TStatement[] = [
            newObjectExpressionHostNode,
            ...expressionStatements
        ];

        const hostNodeWithStatements: TNodeWithStatements = this.getHostNodeWithStatements(
            objectExpressionNode,
            hostStatement
        );

        this.filterExtractedObjectExpressionProperties(objectExpressionNode, removablePropertyIds);
        NodeAppender.insertBefore(hostNodeWithStatements, statementsToInsert, hostStatement);

        return newObjectExpressionIdentifier;
    }

    /**
     * @returns {VariableDeclaration}
     */
    private getObjectExpressionHostNode (): ESTree.VariableDeclaration {
        const objectExpressionHostCustomNode: ICustomNode<TInitialData<BasePropertiesExtractorObjectExpressionHostNode>> =
            this.objectExpressionKeysTransformerCustomNodeFactory(
                ObjectExpressionKeysTransformerCustomNode.BasePropertiesExtractorObjectExpressionHostNode
            );

        objectExpressionHostCustomNode.initialize();

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
}
