import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TInitialData } from '../../types/TInitialData';
import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';
import { TStringArrayTransformerCustomNodeFactory } from '../../types/container/custom-nodes/TStringArrayTransformerCustomNodeFactory';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { ILiteralNodesCacheStorage } from '../../interfaces/storages/string-array-transformers/ILiteralNodesCacheStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';
import { IStringArrayScopeCallsWrapperDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperDataStorage';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageAnalyzer } from '../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';
import { IVisitedLexicalScopeNodesStackStorage } from '../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { StringArrayTransformerCustomNode } from '../../enums/custom-nodes/StringArrayTransformerCustomNode';
import { StringArrayWrappersType } from '../../enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeLiteralUtils } from '../../node/NodeLiteralUtils';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeUtils } from '../../node/NodeUtils';
import { StringArrayCallNode } from '../../custom-nodes/string-array-nodes/StringArrayCallNode';

@injectable()
export class StringArrayTransformer extends AbstractNodeTransformer {
    /**
     * @type {number}
     */
    private static readonly minShiftedIndexValue: number = 10;

    /**
     * @type {number}
     */
    private static readonly maxShiftedIndexValue: number = 100;

    /**
     * @type {IEscapeSequenceEncoder}
     */
    private readonly escapeSequenceEncoder: IEscapeSequenceEncoder;

    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {ILiteralNodesCacheStorage}
     */
    private readonly literalNodesCacheStorage: ILiteralNodesCacheStorage;

    /**
     * @type {IStringArrayStorage}
     */
    private readonly stringArrayStorage: IStringArrayStorage;

    /**
     * @type {IStringArrayStorageAnalyzer}
     */
    private readonly stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer;

    /**
     * @type {IStringArrayScopeCallsWrapperDataStorage}
     */
    private readonly stringArrayScopeCallsWrapperDataStorage: IStringArrayScopeCallsWrapperDataStorage;

    /**
     * @type {TStringArrayTransformerCustomNodeFactory}
     */
    private readonly stringArrayTransformerCustomNodeFactory: TStringArrayTransformerCustomNodeFactory;

    /**
     * @type {IVisitedLexicalScopeNodesStackStorage}
     */
    private readonly visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     * @param {ILiteralNodesCacheStorage} literalNodesCacheStorage
     * @param {IVisitedLexicalScopeNodesStackStorage} visitedLexicalScopeNodesStackStorage
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IStringArrayScopeCallsWrapperDataStorage} stringArrayScopeCallsWrapperDataStorage
     * @param {IStringArrayStorageAnalyzer} stringArrayStorageAnalyzer
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {TStringArrayTransformerCustomNodeFactory} stringArrayTransformerCustomNodeFactory
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder,
        @inject(ServiceIdentifiers.ILiteralNodesCacheStorage) literalNodesCacheStorage: ILiteralNodesCacheStorage,
        @inject(ServiceIdentifiers.IVisitedLexicalScopeNodesStackStorage) visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IStringArrayScopeCallsWrapperDataStorage) stringArrayScopeCallsWrapperDataStorage: IStringArrayScopeCallsWrapperDataStorage,
        @inject(ServiceIdentifiers.IStringArrayStorageAnalyzer) stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.Factory__IStringArrayTransformerCustomNode)
            stringArrayTransformerCustomNodeFactory: TStringArrayTransformerCustomNodeFactory
    ) {
        super(randomGenerator, options);

        this.escapeSequenceEncoder = escapeSequenceEncoder;
        this.literalNodesCacheStorage = literalNodesCacheStorage;
        this.visitedLexicalScopeNodesStackStorage = visitedLexicalScopeNodesStackStorage;
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayScopeCallsWrapperDataStorage = stringArrayScopeCallsWrapperDataStorage;
        this.stringArrayStorageAnalyzer = stringArrayStorageAnalyzer;
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.stringArrayTransformerCustomNodeFactory = stringArrayTransformerCustomNodeFactory;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.StringArray:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (NodeGuards.isProgramNode(node)) {
                            this.prepareNode(node);
                        }

                        if (parentNode && NodeGuards.isLiteralNode(node) && !NodeMetadata.isReplacedLiteral(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            case NodeTransformationStage.Finalizing:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isLiteralNode(node)) {
                            return this.encodeLiteralNodeToEscapeSequence(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Program} programNode
     */
    public prepareNode (programNode: ESTree.Program): void {
        this.stringArrayStorageAnalyzer.analyze(programNode);

        if (this.options.shuffleStringArray) {
            this.stringArrayStorage.shuffleStorage();
        }

        if (this.options.rotateStringArray) {
            this.stringArrayStorage.rotateStorage();
        }
    }

    /**
     * @param {Literal} literalNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Node {
        if (typeof literalNode.value !== 'string' || NodeLiteralUtils.isProhibitedLiteralNode(literalNode, parentNode)) {
            return literalNode;
        }

        const literalValue: ESTree.SimpleLiteral['value'] = literalNode.value;

        const stringArrayStorageItemData: IStringArrayStorageItemData | undefined =
            this.stringArrayStorageAnalyzer.getItemDataForLiteralNode(literalNode);
        const cacheKey: string = this.literalNodesCacheStorage.buildKey(literalValue, stringArrayStorageItemData);
        const useCachedValue: boolean = this.literalNodesCacheStorage.shouldUseCachedValue(cacheKey, stringArrayStorageItemData);

        if (useCachedValue) {
            return <ESTree.Node>this.literalNodesCacheStorage.get(cacheKey);
        }

        const resultNode: ESTree.Node = stringArrayStorageItemData
            ? this.getStringArrayCallNode(stringArrayStorageItemData)
            : this.getLiteralNode(literalValue);

        this.literalNodesCacheStorage.set(cacheKey, resultNode);

        NodeUtils.parentizeNode(resultNode, parentNode);

        return resultNode;
    }

    /**
     * @param {string} value
     * @returns {Node}
     */
    private getLiteralNode (value: string): ESTree.Node {
        return NodeFactory.literalNode(value);
    }

    /**
     * @param {IStringArrayStorageItemData} stringArrayStorageItemData
     * @returns {Node}
     */
    private getStringArrayCallNode (stringArrayStorageItemData: IStringArrayStorageItemData): ESTree.Node {
        const stringArrayCallsWrapperName: string = this.getStringArrayCallsWrapperName(stringArrayStorageItemData);
        const { index, decodeKey } = stringArrayStorageItemData;

        // todo: refactor this
        const lastElement: TNodeWithLexicalScopeStatements | null =
            this.visitedLexicalScopeNodesStackStorage.getLastElement() ?? null;
        const stringArrayScopeCallsWrapperData: IStringArrayScopeCallsWrapperData | null = lastElement
            ? this.stringArrayScopeCallsWrapperDataStorage.get(lastElement) ?? null
            : null;

        const resultIndex: number = stringArrayScopeCallsWrapperData
            ? stringArrayScopeCallsWrapperData.globalIndexShift + index
            : index;
        const stringArrayCallCustomNode: ICustomNode<TInitialData<StringArrayCallNode>> =
            this.stringArrayTransformerCustomNodeFactory(StringArrayTransformerCustomNode.StringArrayCallNode);

        stringArrayCallCustomNode.initialize(stringArrayCallsWrapperName, resultIndex, decodeKey);

        const statementNode: TStatement = stringArrayCallCustomNode.getNode()[0];

        if (!NodeGuards.isExpressionStatementNode(statementNode)) {
            throw new Error('`stringArrayCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node');
        }

        return statementNode.expression;
    }

    /**
     * @param {IStringArrayStorageItemData} stringArrayStorageItemData
     * @returns {string}
     */
    private getStringArrayCallsWrapperName (stringArrayStorageItemData: IStringArrayStorageItemData): string {
        const {encoding} = stringArrayStorageItemData;

        return !this.options.stringArrayWrappersCount
            ? this.getRootStringArrayCallsWrapperName(encoding)
            : this.getUpperStringArrayCallsWrapperName(encoding);

    }

    /**
     * @param {TStringArrayEncoding} encoding
     * @returns {string}
     */
    private getRootStringArrayCallsWrapperName (encoding: TStringArrayEncoding): string {
        return this.stringArrayStorage.getStorageCallsWrapperName(encoding);
    }

    /**
     * @param {TStringArrayEncoding} encoding
     * @returns {string}
     */
    private getUpperStringArrayCallsWrapperName (encoding: TStringArrayEncoding): string {
        const currentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements | null =
            this.visitedLexicalScopeNodesStackStorage.getLastElement() ?? null;
        const parentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements | null =
            this.visitedLexicalScopeNodesStackStorage.getPenultimateElement() ?? null;

        if (!currentLexicalScopeBodyNode) {
            throw new Error('Cannot find current lexical scope body node');
        }

        const stringArrayScopeCallsWrapperData: IStringArrayScopeCallsWrapperData =
            this.stringArrayScopeCallsWrapperDataStorage.get(currentLexicalScopeBodyNode)
                ?? this.initializeStringArrayScopeCallsWrapperData(parentLexicalScopeBodyNode);
        const stringArrayScopeCallsWrapperNames: string[] = stringArrayScopeCallsWrapperData.names[encoding]?.names ?? [];
        const isFilledScopeCallsWrapperNamesList: boolean = stringArrayScopeCallsWrapperNames.length === this.options.stringArrayWrappersCount;

        if (!isFilledScopeCallsWrapperNamesList) {
            const nextScopeCallsWrapperName: string = this.identifierNamesGenerator.generateNext();

            stringArrayScopeCallsWrapperNames.push(nextScopeCallsWrapperName);
            stringArrayScopeCallsWrapperData.names[encoding] = {
                encoding,
                names: stringArrayScopeCallsWrapperNames
            };

            this.stringArrayScopeCallsWrapperDataStorage.set(
                currentLexicalScopeBodyNode,
                stringArrayScopeCallsWrapperData
            );
        }

        return this.randomGenerator.getRandomGenerator().pickone(stringArrayScopeCallsWrapperNames);
    }

    /**
     * @param {TNodeWithLexicalScopeStatements | null} parentLexicalScopeBodyNode
     * @returns {IStringArrayScopeCallsWrapperData}
     */
    private initializeStringArrayScopeCallsWrapperData (
        parentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements | null
    ): IStringArrayScopeCallsWrapperData {
        const parentStringArrayScopeCallsWrapperData: IStringArrayScopeCallsWrapperData | null = parentLexicalScopeBodyNode
            ? this.stringArrayScopeCallsWrapperDataStorage.get(parentLexicalScopeBodyNode) ?? null
            : null;

        const scopeIndexShift: number = this.options.stringArrayWrappersType === StringArrayWrappersType.Function
            ? this.randomGenerator.getRandomInteger(
                StringArrayTransformer.minShiftedIndexValue,
                StringArrayTransformer.maxShiftedIndexValue
            )
            : 0;
        const globalIndexShift: number = parentStringArrayScopeCallsWrapperData
            ? parentStringArrayScopeCallsWrapperData.globalIndexShift + scopeIndexShift
            : scopeIndexShift;

        return {
            globalIndexShift,
            scopeIndexShift,
            names: {},
            parentLexicalScopeNode: parentLexicalScopeBodyNode ?? null
        };
    }

    /**
     * @param {Literal} literalNode
     * @param {Node} parentNode
     * @returns {Literal}
     */
    private encodeLiteralNodeToEscapeSequence (
        literalNode: ESTree.Literal,
        parentNode: ESTree.Node
    ): ESTree.Literal {
        if (typeof literalNode.value !== 'string') {
            return literalNode;
        }

        return NodeFactory.literalNode(
            this.escapeSequenceEncoder.encode(literalNode.value, this.options.unicodeEscapeSequence)
        );
    }
}
