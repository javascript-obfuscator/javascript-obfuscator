import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from '@javascript-obfuscator/estraverse';
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
     * @type {string}
     */
    private static readonly thisIdentifierName: string = 'this';

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
    public constructor(
        @inject(ServiceIdentifiers.Factory__IObjectExpressionExtractor)
        objectExpressionExtractorFactory: TObjectExpressionExtractorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.objectExpressionExtractorFactory = objectExpressionExtractorFactory;
    }

    /**
     * Combined prohibition check result
     */
    private static checkProhibitedPatterns(
        objectExpressionNode: ESTree.ObjectExpression,
        objectExpressionHostNode: ESTree.Node
    ): { hasReferencedIdentifier: boolean; hasCallExpression: boolean } {
        const identifierNamesSet: Set<string> = new Set();

        let hasReferencedIdentifier: boolean = false;
        let hasCallExpression: boolean = false;
        let isInsideObjectExpression: boolean = false;

        estraverse.traverse(objectExpressionHostNode, {
            // eslint-disable-next-line complexity
            enter: (node: ESTree.Node): void | estraverse.VisitorOption => {
                if (node === objectExpressionNode) {
                    isInsideObjectExpression = true;
                }

                if (isInsideObjectExpression && !hasCallExpression) {
                    if (NodeGuards.isCallExpressionNode(node) || NodeGuards.isNewExpressionNode(node)) {
                        hasCallExpression = true;
                    }
                }

                if (NodeGuards.isIdentifierNode(node) || NodeGuards.isThisExpressionNode(node)) {
                    const identifierName: string = NodeGuards.isIdentifierNode(node)
                        ? node.name
                        : ObjectExpressionKeysTransformer.thisIdentifierName;

                    if (!isInsideObjectExpression) {
                        identifierNamesSet.add(identifierName);
                    } else if (identifierNamesSet.has(identifierName)) {
                        hasReferencedIdentifier = true;
                    }
                }

                if (hasReferencedIdentifier && hasCallExpression) {
                    return estraverse.VisitorOption.Break;
                }
            },
            leave: (node: ESTree.Node): void | estraverse.VisitorOption => {
                if (node === objectExpressionNode) {
                    isInsideObjectExpression = false;
                    if (hasReferencedIdentifier || hasCallExpression) {
                        return estraverse.VisitorOption.Break;
                    }
                }
            }
        });

        return { hasReferencedIdentifier, hasCallExpression };
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} objectExpressionParentNode
     * @param {Statement} objectExpressionHostStatement
     * @returns {boolean}
     */
    private static isProhibitedObjectExpressionNode(
        objectExpressionNode: ESTree.ObjectExpression,
        objectExpressionParentNode: ESTree.Node,
        objectExpressionHostStatement: ESTree.Statement
    ): boolean {
        if (
            ObjectExpressionKeysTransformer.isProhibitedArrowFunctionExpression(
                objectExpressionNode,
                objectExpressionParentNode
            ) ||
            ObjectExpressionKeysTransformer.isProhibitedSequenceExpression(
                objectExpressionNode,
                objectExpressionHostStatement
            ) ||
            ObjectExpressionKeysTransformer.isProhibitedLoopBody(objectExpressionNode)
        ) {
            return true;
        }

        const { hasReferencedIdentifier, hasCallExpression } = ObjectExpressionKeysTransformer.checkProhibitedPatterns(
            objectExpressionNode,
            objectExpressionHostStatement
        );

        return hasReferencedIdentifier || hasCallExpression;
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @returns {boolean}
     */
    private static isProhibitedLoopBody(objectExpressionNode: ESTree.ObjectExpression): boolean {
        let currentNode: ESTree.Node | undefined = objectExpressionNode;

        while (currentNode) {
            const parentNode: ESTree.Node | undefined = currentNode.parentNode;

            if (!parentNode) {
                break;
            }

            const isNonBlockLoopBody: boolean =
                NodeGuards.isLoopStatementNode(parentNode) &&
                parentNode.body === currentNode &&
                !NodeGuards.isBlockStatementNode(currentNode);

            if (isNonBlockLoopBody) {
                return true;
            }

            if (NodeGuards.isFunctionNode(parentNode)) {
                break;
            }

            currentNode = parentNode;
        }

        return false;
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} objectExpressionNodeParentNode
     * @returns {boolean}
     */
    private static isProhibitedArrowFunctionExpression(
        objectExpressionNode: ESTree.ObjectExpression,
        objectExpressionNodeParentNode: ESTree.Node
    ): boolean {
        return (
            NodeGuards.isArrowFunctionExpressionNode(objectExpressionNodeParentNode) &&
            objectExpressionNodeParentNode.body === objectExpressionNode
        );
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node} objectExpressionHostNode
     * @returns {boolean}
     */
    private static isProhibitedSequenceExpression(
        objectExpressionNode: ESTree.ObjectExpression,
        objectExpressionHostNode: ESTree.Node
    ): boolean {
        return (
            NodeGuards.isExpressionStatementNode(objectExpressionHostNode) &&
            NodeGuards.isSequenceExpressionNode(objectExpressionHostNode.expression) &&
            objectExpressionHostNode.expression.expressions.some(
                (expressionNode: ESTree.Expression) =>
                    NodeGuards.isCallExpressionNode(expressionNode) && NodeGuards.isSuperNode(expressionNode.callee)
            )
        );
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        if (!this.options.transformObjectKeys) {
            return null;
        }

        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isObjectExpressionNode(node)) {
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
    public transformNode(objectExpressionNode: ESTree.ObjectExpression, parentNode: ESTree.Node): ESTree.Node {
        if (!objectExpressionNode.properties.length) {
            return objectExpressionNode;
        }

        const hostStatement: ESTree.Statement = NodeStatementUtils.getRootStatementOfNode(objectExpressionNode);

        if (
            ObjectExpressionKeysTransformer.isProhibitedObjectExpressionNode(
                objectExpressionNode,
                parentNode,
                hostStatement
            )
        ) {
            return objectExpressionNode;
        }

        return this.applyObjectExpressionKeysExtractorsRecursive(objectExpressionNode, hostStatement, 0);
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @param {number} extractorIndex
     * @returns {Node}
     */
    private applyObjectExpressionKeysExtractorsRecursive(
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement,
        extractorIndex: number
    ): ESTree.Node {
        const objectExpressionExtractorNames = ObjectExpressionKeysTransformer.objectExpressionExtractorNames;

        if (extractorIndex >= objectExpressionExtractorNames.length) {
            return objectExpressionNode;
        }

        const objectExpressionExtractor: ObjectExpressionExtractor = objectExpressionExtractorNames[extractorIndex];

        const {
            nodeToReplace,
            objectExpressionHostStatement: newObjectExpressionHostStatement,
            objectExpressionNode: newObjectExpressionNode
        } = this.objectExpressionExtractorFactory(objectExpressionExtractor).extract(
            objectExpressionNode,
            hostStatement
        );

        this.applyObjectExpressionKeysExtractorsRecursive(
            newObjectExpressionNode,
            newObjectExpressionHostStatement,
            extractorIndex + 1
        );

        return nodeToReplace;
    }
}
