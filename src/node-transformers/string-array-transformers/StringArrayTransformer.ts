import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TInitialData } from '../../types/TInitialData';
import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayScopeCallsWrapperNamesDataByEncoding } from '../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrapperNamesDataByEncoding';
import { TStringArrayCustomNodeFactory } from '../../types/container/custom-nodes/TStringArrayCustomNodeFactory';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { ILiteralNodesCacheStorage } from '../../interfaces/storages/string-array-transformers/ILiteralNodesCacheStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperLexicalScopeData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperLexicalScopeData';
import { IStringArrayScopeCallsWrapperLexicalScopeDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperLexicalScopeDataStorage';
import { IStringArrayScopeCallsWrapperNamesDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperNamesDataStorage';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageAnalyzer } from '../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';
import { IVisitedLexicalScopeNodesStackStorage } from '../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { StringArrayCustomNode } from '../../enums/custom-nodes/StringArrayCustomNode';
import { StringArrayWrappersType } from '../../enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
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
    private static readonly minShiftedIndexValue: number = -1000;

    /**
     * @type {number}
     */
    private static readonly maxShiftedIndexValue: number = 1000;


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
     * @type {IStringArrayScopeCallsWrapperLexicalScopeDataStorage}
     */
    private readonly stringArrayScopeCallsWrapperLexicalScopeDataStorage: IStringArrayScopeCallsWrapperLexicalScopeDataStorage;

    /**
     * @type {IStringArrayScopeCallsWrapperNamesDataStorage}
     */
    private readonly stringArrayScopeCallsWrapperNamesDataStorage: IStringArrayScopeCallsWrapperNamesDataStorage;

    /**
     * @type {TStringArrayCustomNodeFactory}
     */
    private readonly stringArrayTransformerCustomNodeFactory: TStringArrayCustomNodeFactory;

    /**
     * @type {IVisitedLexicalScopeNodesStackStorage}
     */
    private readonly visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {ILiteralNodesCacheStorage} literalNodesCacheStorage
     * @param {IVisitedLexicalScopeNodesStackStorage} visitedLexicalScopeNodesStackStorage
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IStringArrayScopeCallsWrapperNamesDataStorage} stringArrayScopeCallsWrapperNamesDataStorage
     * @param {IStringArrayScopeCallsWrapperLexicalScopeDataStorage} stringArrayScopeCallsWrapperLexicalScopeDataStorage
     * @param {IStringArrayStorageAnalyzer} stringArrayStorageAnalyzer
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {TStringArrayCustomNodeFactory} stringArrayTransformerCustomNodeFactory
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.ILiteralNodesCacheStorage) literalNodesCacheStorage: ILiteralNodesCacheStorage,
        @inject(ServiceIdentifiers.IVisitedLexicalScopeNodesStackStorage) visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IStringArrayScopeCallsWrapperNamesDataStorage)
            stringArrayScopeCallsWrapperNamesDataStorage: IStringArrayScopeCallsWrapperNamesDataStorage,
        @inject(ServiceIdentifiers.IStringArrayScopeCallsWrapperLexicalScopeDataStorage)
            stringArrayScopeCallsWrapperLexicalScopeDataStorage: IStringArrayScopeCallsWrapperLexicalScopeDataStorage,
        @inject(ServiceIdentifiers.IStringArrayStorageAnalyzer) stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.Factory__IStringArrayCustomNode)
            stringArrayTransformerCustomNodeFactory: TStringArrayCustomNodeFactory
    ) {
        super(randomGenerator, options);

        this.literalNodesCacheStorage = literalNodesCacheStorage;
        this.visitedLexicalScopeNodesStackStorage = visitedLexicalScopeNodesStackStorage;
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayScopeCallsWrapperNamesDataStorage = stringArrayScopeCallsWrapperNamesDataStorage;
        this.stringArrayScopeCallsWrapperLexicalScopeDataStorage = stringArrayScopeCallsWrapperLexicalScopeDataStorage;
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
        if (
            !NodeLiteralUtils.isStringLiteralNode(literalNode)
            || NodeLiteralUtils.isProhibitedLiteralNode(literalNode, parentNode)
        ) {
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
            : literalNode;

        this.literalNodesCacheStorage.set(cacheKey, resultNode);

        NodeUtils.parentizeNode(resultNode, parentNode);

        return resultNode;
    }

    /**
     * @param {IStringArrayStorageItemData} stringArrayStorageItemData
     * @returns {Node}
     */
    private getStringArrayCallNode (stringArrayStorageItemData: IStringArrayStorageItemData): ESTree.Node {
        const [stringArrayCallsWrapperName, index] = this.getStringArrayCallsWrapperData(stringArrayStorageItemData);
        const {decodeKey } = stringArrayStorageItemData;

        const stringArrayCallCustomNode: ICustomNode<TInitialData<StringArrayCallNode>> =
            this.stringArrayTransformerCustomNodeFactory(StringArrayCustomNode.StringArrayCallNode);

        stringArrayCallCustomNode.initialize(stringArrayCallsWrapperName, index, decodeKey);

        const statementNode: TStatement = stringArrayCallCustomNode.getNode()[0];

        if (!NodeGuards.isExpressionStatementNode(statementNode)) {
            throw new Error('`stringArrayCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node');
        }

        return statementNode.expression;
    }

    /**
     * @param {IStringArrayStorageItemData} stringArrayStorageItemData
     * @returns {[name: string, index: number]}
     */
    private getStringArrayCallsWrapperData (
        stringArrayStorageItemData: IStringArrayStorageItemData
    ): [name: string, index: number] {
        return !this.options.stringArrayWrappersCount
            ? this.getRootStringArrayCallsWrapperData(stringArrayStorageItemData)
            : this.getUpperStringArrayCallsWrapperData(stringArrayStorageItemData);
    }

    /**
     * @param {IStringArrayStorageItemData} stringArrayStorageItemData
     * @returns {[name: string, index: number]}
     */
    private getRootStringArrayCallsWrapperData (
        stringArrayStorageItemData: IStringArrayStorageItemData
    ): [name: string, index: number] {
        const {encoding, index} = stringArrayStorageItemData;

        const rootStringArrayCallsWrapperName: string = this.stringArrayStorage.getStorageCallsWrapperName(encoding);

        return [
            rootStringArrayCallsWrapperName,
            index
        ];
    }

    /**
     * @param {IStringArrayStorageItemData} stringArrayStorageItemData
     * @returns {[name: string, index: number]}
     */
    private getUpperStringArrayCallsWrapperData (
        stringArrayStorageItemData: IStringArrayStorageItemData
    ): [name: string, index: number] {
        const {encoding, index} = stringArrayStorageItemData;
        const currentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements | null =
            this.visitedLexicalScopeNodesStackStorage.getLastElement() ?? null;
        const parentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements | null =
            this.visitedLexicalScopeNodesStackStorage.getPenultimateElement() ?? null;

        if (!currentLexicalScopeBodyNode) {
            throw new Error('Cannot find current lexical scope body node');
        }

        const stringArrayScopeCallsWrapperNamesDataByEncoding: TStringArrayScopeCallsWrapperNamesDataByEncoding =
            this.getAndUpdateStringArrayScopeCallsWrapperNamesDataByEncoding(
                currentLexicalScopeBodyNode,
                stringArrayStorageItemData
            );
        const stringArrayScopeCallsWrapperLexicalScopeData: IStringArrayScopeCallsWrapperLexicalScopeData =
            this.getAndUpdateStringArrayScopeCallsWrapperLexicalScopeData(
                currentLexicalScopeBodyNode,
                parentLexicalScopeBodyNode
            );

        const stringArrayScopeCallsWrapperNames: string[] = stringArrayScopeCallsWrapperNamesDataByEncoding[encoding]?.names ?? [];
        const randomUpperStringArrayCallsWrapperName: string = this.randomGenerator
            .getRandomGenerator()
            .pickone(stringArrayScopeCallsWrapperNames);

        const resultIndex: number = stringArrayScopeCallsWrapperLexicalScopeData
            ? stringArrayScopeCallsWrapperLexicalScopeData.resultShiftedIndex + index
            : index;

        return [
            randomUpperStringArrayCallsWrapperName,
            resultIndex
        ];
    }

    /**
     * @param {TNodeWithLexicalScopeStatements} currentLexicalScopeBodyNode
     * @param {IStringArrayStorageItemData} stringArrayStorageItemData
     * @returns {TStringArrayScopeCallsWrapperNamesDataByEncoding}
     */
    private getAndUpdateStringArrayScopeCallsWrapperNamesDataByEncoding (
        currentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements,
        stringArrayStorageItemData: IStringArrayStorageItemData
    ): TStringArrayScopeCallsWrapperNamesDataByEncoding {
        const {encoding} = stringArrayStorageItemData;
        const stringArrayScopeCallsWrapperNamesDataByEncoding: TStringArrayScopeCallsWrapperNamesDataByEncoding =
            this.stringArrayScopeCallsWrapperNamesDataStorage.get(currentLexicalScopeBodyNode)
            ?? {};

        const stringArrayScopeCallsWrapperNames: string[] = stringArrayScopeCallsWrapperNamesDataByEncoding[encoding]?.names ?? [];
        const isFilledScopeCallsWrapperNamesList: boolean = stringArrayScopeCallsWrapperNames.length === this.options.stringArrayWrappersCount;

        if (isFilledScopeCallsWrapperNamesList) {
            return stringArrayScopeCallsWrapperNamesDataByEncoding;
        }

        const nextScopeCallsWrapperName: string = this.identifierNamesGenerator.generateNext();

        stringArrayScopeCallsWrapperNamesDataByEncoding[encoding] = {
            encoding,
            names: [
                ...stringArrayScopeCallsWrapperNames,
                nextScopeCallsWrapperName
            ]
        };

        this.stringArrayScopeCallsWrapperNamesDataStorage.set(
            currentLexicalScopeBodyNode,
            stringArrayScopeCallsWrapperNamesDataByEncoding
        );

        return stringArrayScopeCallsWrapperNamesDataByEncoding;
    }

    /**
     * @param {TNodeWithLexicalScopeStatements} currentLexicalScopeBodyNode
     * @param {TNodeWithLexicalScopeStatements | null} parentLexicalScopeBodyNode
     * @returns {IStringArrayScopeCallsWrapperLexicalScopeData}
     * @private
     */
    private getAndUpdateStringArrayScopeCallsWrapperLexicalScopeData (
        currentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements,
        parentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements | null
    ): IStringArrayScopeCallsWrapperLexicalScopeData {
        const storedLexicalScopeData: IStringArrayScopeCallsWrapperLexicalScopeData | null =
            this.stringArrayScopeCallsWrapperLexicalScopeDataStorage.get(currentLexicalScopeBodyNode)
            ?? null;

        if (storedLexicalScopeData) {
            return storedLexicalScopeData;
        }

        const parentLexicalScopeData: IStringArrayScopeCallsWrapperLexicalScopeData | null = parentLexicalScopeBodyNode
            ? this.stringArrayScopeCallsWrapperLexicalScopeDataStorage.get(parentLexicalScopeBodyNode) ?? null
            : null;

        const scopeShiftedIndex: number = this.options.stringArrayWrappersType === StringArrayWrappersType.Function
            ? this.randomGenerator.getRandomInteger(
                StringArrayTransformer.minShiftedIndexValue,
                StringArrayTransformer.maxShiftedIndexValue
            )
            : 0;
        const resultShiftedIndex: number = parentLexicalScopeData
            ? parentLexicalScopeData.resultShiftedIndex + scopeShiftedIndex
            : scopeShiftedIndex;

        const lexicalScopeData: IStringArrayScopeCallsWrapperLexicalScopeData = {
            parentLexicalScopeBodyNode,
            resultShiftedIndex,
            scopeShiftedIndex
        };

        this.stringArrayScopeCallsWrapperLexicalScopeDataStorage.set(
            currentLexicalScopeBodyNode,
            lexicalScopeData
        );

        return lexicalScopeData;
    }
}
