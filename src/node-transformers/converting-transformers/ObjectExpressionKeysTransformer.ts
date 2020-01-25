import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TObjectExpressionExtractorFactory } from '../../types/container/node-transformers/TObjectExpressionExtractorFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeStatementUtils } from '../../node/NodeStatementUtils';
import { ObjectExpressionExtractor } from '../../enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor';

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
    constructor (
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
        return ObjectExpressionKeysTransformer.isProhibitedVariableDeclarationHostStatement(objectExpressionNode, hostStatement)
            || ObjectExpressionKeysTransformer.isProhibitedFunctionHostStatement(objectExpressionNode, hostStatement);
    }

    /**
     * Fix of https://github.com/javascript-obfuscator/javascript-obfuscator/issues/516
     * If object expression is placed inside any expression inside variable declaration with 2+ declarators
     * - should mark host node as prohibited
     *
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @returns {boolean}
     */
    private static isProhibitedVariableDeclarationHostStatement (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): boolean {
        if (!NodeGuards.isVariableDeclarationNode(hostStatement) || !hostStatement.declarations.length) {
            return false;
        }

        return ObjectExpressionKeysTransformer.isReferencedIdentifierName(
            objectExpressionNode,
            hostStatement.declarations
        );
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Statement} hostStatement
     * @returns {boolean}
     */
    private static isProhibitedFunctionHostStatement (
        objectExpressionNode: ESTree.ObjectExpression,
        hostStatement: ESTree.Statement
    ): boolean {
        if (!NodeGuards.isFunctionNode(hostStatement) || !hostStatement.params.length) {
            return false;
        }

        const hostNode: ESTree.Node | undefined = objectExpressionNode.parentNode;

        if (!hostNode || !NodeGuards.isAssignmentPatternNode(hostNode)) {
            return false;
        }

        return ObjectExpressionKeysTransformer.isReferencedIdentifierName(
            objectExpressionNode,
            hostStatement.params
        );
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Node[]} nodesToSearch
     * @returns {boolean}
     */
    private static isReferencedIdentifierName (
        objectExpressionNode: ESTree.ObjectExpression,
        nodesToSearch: ESTree.Node[],
    ): boolean {
        if (nodesToSearch.length === 1) {
            return false;
        }

        const identifierNamesSet: string[] = [];

        let isReferencedIdentifierName: boolean = false;
        let isCurrentNode: boolean = false;

        // should mark node as prohibited if identifier of node is referenced somewhere inside other nodes
        for (const nodeToSearch of nodesToSearch) {
            const identifierNamesSetForCurrentNode: string[] = [];

            estraverse.traverse(nodeToSearch, {
                enter: (node: ESTree.Node): void | estraverse.VisitorOption => {
                    if (node === objectExpressionNode) {
                        isCurrentNode = true;
                    }

                    if (!NodeGuards.isIdentifierNode(node)) {
                        return;
                    }

                    if (!isCurrentNode) {
                        identifierNamesSetForCurrentNode.push(node.name);
                    } else if (identifierNamesSet.includes(node.name)) {
                        isReferencedIdentifierName = true;

                        return estraverse.VisitorOption.Break;
                    }
                }
            });

            if (isCurrentNode || isReferencedIdentifierName) {
                break;
            } else {
                identifierNamesSet.push(...identifierNamesSetForCurrentNode);
            }
        }

        return isReferencedIdentifierName;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        if (!this.options.transformObjectKeys) {
            return null;
        }

        switch (transformationStage) {
            case TransformationStage.Converting:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
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
