import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TObjectExpressionExtractorFactory } from '../../types/container/node-transformers/TObjectExpressionExtractorFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { ObjectExpressionExtractor } from '../../enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeStatementUtils } from '../../node/NodeStatementUtils';

@injectable()
export class ObjectExpressionKeysTransformer extends AbstractNodeTransformer {
    /**
     * @type {ObjectExpressionExtractor[]}
     */
    private static readonly objectExpressionExtractorNames: ObjectExpressionExtractor[] = [
        ObjectExpressionExtractor.ObjectExpressionToVariableDeclarationExtractor,
        ObjectExpressionExtractor.BasePropertiesExtractor
    ];

    /**
     * @type {TObjectExpressionExtractorFactory}
     */
    private readonly objectExpressionExtractorFactory: TObjectExpressionExtractorFactory;

    /**
     * @param {TObjectExpressionExtractorFactory} objectExpressionExtractorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IObjectExpressionExtractor)
            objectExpressionExtractorFactory: TObjectExpressionExtractorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.objectExpressionExtractorFactory = objectExpressionExtractorFactory;
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @returns {boolean}
     */
    private static isProhibitedHostStatement (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): boolean {
        return ObjectExpressionKeysTransformer.isReferencedIdentifierName(
                objectExpressionNode,
                hostStatement
            )
            || ObjectExpressionKeysTransformer.isProhibitedSequenceExpression(
                objectExpressionNode,
                hostStatement
            );
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} hostNode
     * @returns {boolean}
     */
    private static isReferencedIdentifierName (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.Node,
    ): boolean {
        const identifierNamesSet: string[] = [];

        let isReferencedIdentifierName: boolean = false;
        let isCurrentNode: boolean = false;

        // should mark node as prohibited if identifier of node is referenced somewhere inside other nodes
        estraverse.traverse(hostNode, {
            enter: (node: ESTree.Node): void | estraverse.VisitorOption => {
                if (node === objectExpressionNode) {
                    isCurrentNode = true;
                }

                if (!NodeGuards.isIdentifierNode(node)) {
                    return;
                }

                if (!isCurrentNode) {
                    identifierNamesSet.push(node.name);

                    return;
                }

                if (identifierNamesSet.includes(node.name)) {
                    isReferencedIdentifierName = true;
                }
            },
            leave: (node: ESTree.Node): void | estraverse.VisitorOption => {
                if (node === objectExpressionNode) {
                    isCurrentNode = false;

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        return isReferencedIdentifierName;
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} hostNode
     * @returns {boolean}
     */
    private static isProhibitedSequenceExpression (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.Node,
    ): boolean {
        return NodeGuards.isExpressionStatementNode(hostNode)
            && NodeGuards.isSequenceExpressionNode(hostNode.expression)
            && hostNode.expression.expressions.some((expressionNode: ESTree.Expression) =>
                NodeGuards.isCallExpressionNode(expressionNode)
                && NodeGuards.isSuperNode(expressionNode.callee)
            );
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        if (!this.options.transformObjectKeys) {
            return null;
        }

        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (
                            parentNode
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
     *     var _0xabc123 = {};
     *     _0xabc123['foo'] = 1;
     *     _0xabc123['bar'] = 2;
     *     var object = _0xabc123;
     *
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (objectExpressionNode: ESTree.ObjectExpression, parentNode: ESTree.Node): ESTree.Node {
        if (!objectExpressionNode.properties.length) {
            return objectExpressionNode;
        }

        const hostStatement: ESTree.Statement = NodeStatementUtils.getRootStatementOfNode(objectExpressionNode);

        if (ObjectExpressionKeysTransformer.isProhibitedHostStatement(objectExpressionNode, hostStatement)) {
            return objectExpressionNode;
        }

        return this.applyObjectExpressionKeysExtractorsRecursive(
            ObjectExpressionKeysTransformer.objectExpressionExtractorNames,
            objectExpressionNode,
            hostStatement
        );
    }

    /**
     * @param {ObjectExpressionExtractor[]} objectExpressionExtractorNames
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @returns {Node}
     */
    private applyObjectExpressionKeysExtractorsRecursive (
        objectExpressionExtractorNames: ObjectExpressionExtractor[],
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): ESTree.Node {
        const newObjectExpressionExtractorNames: ObjectExpressionExtractor[] = [...objectExpressionExtractorNames];
        const objectExpressionExtractor: ObjectExpressionExtractor | undefined =
            newObjectExpressionExtractorNames.shift();

        if (!objectExpressionExtractor) {
            return objectExpressionNode;
        }

        const {
            nodeToReplace,
            objectExpressionHostStatement: newObjectExpressionHostStatement,
            objectExpressionNode: newObjectExpressionNode
        } = this.objectExpressionExtractorFactory(objectExpressionExtractor)
            .extract(objectExpressionNode, hostStatement);

        this.applyObjectExpressionKeysExtractorsRecursive(
            newObjectExpressionExtractorNames,
            newObjectExpressionNode,
            newObjectExpressionHostStatement
        );

        return nodeToReplace;
    }
}
