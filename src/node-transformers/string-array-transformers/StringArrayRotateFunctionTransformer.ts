import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TCustomCodeHelperFactory } from '../../types/container/custom-code-helpers/TCustomCodeHelperFactory';
import { TInitialData } from '../../types/TInitialData';
import { TNumberNumericalExpressionData } from '../../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';
import { TStatement } from '../../types/node/TStatement';
import { TStringLiteralNode } from '../../types/node/TStringLiteralNode';

import { ICustomCodeHelper } from '../../interfaces/custom-code-helpers/ICustomCodeHelper';
import { INodeTransformersRunner } from '../../interfaces/node-transformers/INodeTransformersRunner';
import { INumberNumericalExpressionAnalyzer } from '../../interfaces/analyzers/number-numerical-expression-analyzer/INumberNumericalExpressionAnalyzer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageAnalyzer } from '../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { CustomCodeHelper } from '../../enums/custom-code-helpers/CustomCodeHelper';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeLiteralUtils } from '../../node/NodeLiteralUtils';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeUtils } from '../../node/NodeUtils';
import { NumericalExpressionDataToNodeConverter } from '../../node/NumericalExpressionDataToNodeConverter';
import { StringArrayRotateFunctionCodeHelper } from '../../custom-code-helpers/string-array/StringArrayRotateFunctionCodeHelper';

@injectable()
export class StringArrayRotateFunctionTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeTransformer[]}
     */
    private static readonly stringArrayRotateFunctionTransformers: NodeTransformer[] = [
        NodeTransformer.BooleanLiteralTransformer,
        NodeTransformer.MemberExpressionTransformer,
        NodeTransformer.NumberLiteralTransformer,
        NodeTransformer.NumberToNumericalExpressionTransformer,
        NodeTransformer.ParentificationTransformer,
        NodeTransformer.ScopeIdentifiersTransformer
    ];

    /**
     * @type {number}
     */
    private static readonly comparisonExpressionAdditionalPartsCount: number = 7;

    /**
     * @type {INumberNumericalExpressionAnalyzer}
     */
    private readonly numberNumericalExpressionAnalyzer: INumberNumericalExpressionAnalyzer;

    /**
     * @type {IStringArrayStorage}
     */
    private readonly stringArrayStorage: IStringArrayStorage;

    /**
     * @type {IStringArrayStorageAnalyzer}
     */
    private readonly stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer;

    /**
     * @type {TCustomCodeHelperFactory}
     */
    private readonly customCodeHelperFactory: TCustomCodeHelperFactory;

    /**
     * @type {INodeTransformersRunner}
     */
    private readonly transformersRunner: INodeTransformersRunner;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {INodeTransformersRunner} transformersRunner
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IStringArrayStorageAnalyzer} stringArrayStorageAnalyzer
     * @param {TCustomCodeHelperFactory} customCodeHelperFactory
     * @param {INumberNumericalExpressionAnalyzer} numberNumericalExpressionAnalyzer
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.INodeTransformersRunner) transformersRunner: INodeTransformersRunner,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IStringArrayStorageAnalyzer) stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer,
        @inject(ServiceIdentifiers.Factory__ICustomCodeHelper) customCodeHelperFactory: TCustomCodeHelperFactory,
        @inject(ServiceIdentifiers.INumberNumericalExpressionAnalyzer)
            numberNumericalExpressionAnalyzer: INumberNumericalExpressionAnalyzer
    ) {
        super(randomGenerator, options);

        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayStorageAnalyzer = stringArrayStorageAnalyzer;
        this.transformersRunner = transformersRunner;
        this.customCodeHelperFactory = customCodeHelperFactory;
        this.numberNumericalExpressionAnalyzer = numberNumericalExpressionAnalyzer;
    }

    /**
     * Because this transformer runs BEFORE string array analyzer we can't check string array storage length.
     * So we have to traverse over program node and check if it has any string literal node.
     *
     * @param {Program} programNode
     * @returns {boolean}
     */
    private static isProgramNodeHasStringLiterals (programNode: ESTree.Program): boolean {
        let hasStringLiterals: boolean = false;

        estraverse.traverse(programNode, {
            enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                if (
                    NodeGuards.isLiteralNode(node)
                    && NodeLiteralUtils.isStringLiteralNode(node)
                ) {
                    hasStringLiterals = true;

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        return hasStringLiterals;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        if (!this.options.rotateStringArray) {
            return null;
        }

        switch (nodeTransformationStage) {
            case NodeTransformationStage.StringArray:
                return {
                    enter: (node: ESTree.Node): ESTree.Node | estraverse.VisitorOption => {
                        if (!NodeGuards.isProgramNode(node)) {
                            return node;
                        }

                        if (!StringArrayRotateFunctionTransformer.isProgramNodeHasStringLiterals(node)) {
                            return estraverse.VisitorOption.Break;
                        }

                        return this.transformNode(node);
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Program} programNode
     * @returns {Node}
     */
    public transformNode (programNode: ESTree.Program): ESTree.Node {
        const stringArrayRotateFunctionNode: TStatement = this.getStringArrayRotateFunctionNode();
        const wrappedStringArrayRotateFunctionNode: ESTree.Program = NodeFactory.programNode([
            stringArrayRotateFunctionNode
        ]);

        NodeUtils.parentizeAst(wrappedStringArrayRotateFunctionNode);

        const transformationStages: NodeTransformationStage[] = [
            NodeTransformationStage.Preparing,
            NodeTransformationStage.Converting,
            NodeTransformationStage.RenameIdentifiers,
            NodeTransformationStage.Finalizing
        ];

        // custom transformation of string array rotate function node
        for (const transformationStage of transformationStages) {
            this.transformersRunner.transform(
                wrappedStringArrayRotateFunctionNode,
                StringArrayRotateFunctionTransformer.stringArrayRotateFunctionTransformers,
                transformationStage
            );
        }

        // mark all child nodes (except literals inside comparison expression)
        // as ignored to prevent additional transformation of these nodes
        estraverse.traverse(wrappedStringArrayRotateFunctionNode, {
            enter: (node: ESTree.Node): void => {
                if (
                    !NodeGuards.isLiteralNode(node)
                    || !NodeLiteralUtils.isStringLiteralNode(node)
                ) {
                   return;
                }

                // force add item data for string literal nodes of comparison expressions
                // set all other nodes as ignored to prevent them from obfuscation
                if (this.isComparisonExpressionStringLiteralNode(node)) {
                    this.stringArrayStorageAnalyzer.addItemDataForLiteralNode(node);
                } else {
                    NodeMetadata.set(node, {ignoredNode: true});
                }
            }
        });

        NodeAppender.prepend(programNode, [stringArrayRotateFunctionNode]);

        return programNode;
    }

    /**
     * @returns {TStatement}
     */
    private getStringArrayRotateFunctionNode (): TStatement {
        const comparisonValue: number = this.randomGenerator.getRandomInteger(100000, 1_000_000);
        const comparisonExpressionNumberNumericalExpressionData: TNumberNumericalExpressionData =
            this.numberNumericalExpressionAnalyzer.analyze(
                comparisonValue,
                StringArrayRotateFunctionTransformer.comparisonExpressionAdditionalPartsCount
            );

        const comparisonExpressionNode: ESTree.Expression = NumericalExpressionDataToNodeConverter.convertIntegerNumberData(
            comparisonExpressionNumberNumericalExpressionData,
            ((number: number, isPositiveNumber) => {
                const literalNode: ESTree.Literal = NodeFactory.literalNode(
                    `${number}${this.randomGenerator.getRandomString(6)}`
                );
                const parseIntCallExpression: ESTree.CallExpression = NodeFactory.callExpressionNode(
                    NodeFactory.identifierNode('parseInt'),
                    [literalNode]
                );

                return isPositiveNumber
                    ? parseIntCallExpression
                    : NodeFactory.unaryExpressionNode(
                        '-',
                        parseIntCallExpression
                    );
            })
        );

        const stringArrayRotateFunctionCodeHelper: ICustomCodeHelper<TInitialData<StringArrayRotateFunctionCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.StringArrayRotateFunction);

        stringArrayRotateFunctionCodeHelper.initialize(
            this.stringArrayStorage.getStorageName(),
            comparisonValue,
            comparisonExpressionNode
        );

        return stringArrayRotateFunctionCodeHelper.getNode()[0];
    }

    /**
     * @param {TStringLiteralNode} stringLiteralNode
     * @returns {boolean}
     */
    private isComparisonExpressionStringLiteralNode (stringLiteralNode: TStringLiteralNode): boolean {
        return /\d/.test(stringLiteralNode.value);
    }
}
