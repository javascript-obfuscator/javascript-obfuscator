import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';

import { TCustomCodeHelperFactory } from '../../types/container/custom-code-helpers/TCustomCodeHelperFactory';
import { TInitialData } from '../../types/TInitialData';
import { TNumberNumericalExpressionData } from '../../types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelper } from '../../interfaces/custom-code-helpers/ICustomCodeHelper';
import { INumberNumericalExpressionAnalyzer } from '../../interfaces/analyzers/number-numerical-expression-analyzer/INumberNumericalExpressionAnalyzer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { CustomCodeHelper } from '../../enums/custom-code-helpers/CustomCodeHelper';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeLiteralUtils } from '../../node/NodeLiteralUtils';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeUtils } from '../../node/NodeUtils';
import { NumericalExpressionDataToNodeConverter } from '../../node/NumericalExpressionDataToNodeConverter';
import { StringArrayRotateFunctionCodeHelper } from '../../custom-code-helpers/string-array/StringArrayRotateFunctionCodeHelper';

@injectable()
export class StringArrayRotateFunctionTransformer extends AbstractNodeTransformer {
    /**
     * @type {number}
     */
    private static readonly comparisonExpressionAdditionalPartsCount: number = 7;

    /**
     * @type {string[]}
     */
    private static readonly stringArrayShiftMethodNames: string[] = [
        'push',
        'shift'
    ];

    /**
     * @type {INumberNumericalExpressionAnalyzer}
     */
    private readonly numberNumericalExpressionAnalyzer: INumberNumericalExpressionAnalyzer;

    /**
     * @type {IStringArrayStorage}
     */
    private readonly stringArrayStorage: IStringArrayStorage;

    /**
     * @type {TCustomCodeHelperFactory}
     */
    private readonly customCodeHelperFactory: TCustomCodeHelperFactory;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {TCustomCodeHelperFactory} customCodeHelperFactory
     * @param {INumberNumericalExpressionAnalyzer} numberNumericalExpressionAnalyzer
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.Factory__ICustomCodeHelper) customCodeHelperFactory: TCustomCodeHelperFactory,
        @inject(ServiceIdentifiers.INumberNumericalExpressionAnalyzer)
            numberNumericalExpressionAnalyzer: INumberNumericalExpressionAnalyzer
    ) {
        super(randomGenerator, options);

        this.stringArrayStorage = stringArrayStorage;
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
        if (!this.options.stringArrayRotate) {
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

        estraverse.traverse(stringArrayRotateFunctionNode, {
            enter: (node: ESTree.Node): void => {
                if (
                    !NodeGuards.isLiteralNode(node)
                    || !NodeLiteralUtils.isStringLiteralNode(node)
                ) {
                   return;
                }

                // set string array shift method names as ignored
                // to prevent its extraction to string array
                if (StringArrayRotateFunctionTransformer.stringArrayShiftMethodNames.includes(node.value)) {
                    NodeMetadata.set(node, {ignoredNode: true});
                }
            }
        });

        NodeUtils.parentizeAst(stringArrayRotateFunctionNode);
        NodeAppender.prepend(programNode, [stringArrayRotateFunctionNode]);

        return programNode;
    }

    /**
     * @returns {TStatement}
     */
    private getStringArrayRotateFunctionNode (): TStatement {
        const comparisonValue: number = this.getComparisonValue();
        const comparisonExpressionNumberNumericalExpressionData: TNumberNumericalExpressionData =
            this.numberNumericalExpressionAnalyzer.analyze(
                comparisonValue,
                StringArrayRotateFunctionTransformer.comparisonExpressionAdditionalPartsCount
            );

        let index: number = 1;
        const comparisonExpressionNode: ESTree.Expression = NumericalExpressionDataToNodeConverter.convertIntegerNumberData(
            comparisonExpressionNumberNumericalExpressionData,
            ((number: number, isPositiveNumber) => {
                const multipliedNumber: number = number * index;
                const literalNode: ESTree.Literal = NodeFactory.literalNode(
                    `${multipliedNumber}${this.randomGenerator.getRandomString(6)}`
                );
                const parseIntCallExpression: ESTree.CallExpression = NodeFactory.callExpressionNode(
                    NodeFactory.identifierNode('parseInt'),
                    [literalNode]
                );

                const binaryExpressionNode: ESTree.BinaryExpression = NodeFactory.binaryExpressionNode(
                    '/',
                    isPositiveNumber
                        ? parseIntCallExpression
                        : NodeFactory.unaryExpressionNode(
                            '-',
                            parseIntCallExpression
                        ),
                    NodeFactory.literalNode(index, index.toString())
                );

                index++;

                return binaryExpressionNode;
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
     * Extracted to a standalone method to correctly stub this behaviour
     *
     * @returns {number}
     */
    private getComparisonValue (): number {
        return this.randomGenerator.getRandomInteger(100000, 1_000_000);
    }
}
