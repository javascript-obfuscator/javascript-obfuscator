import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TInitialData } from '../../types/TInitialData';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { TNodeWithLexicalScopeAndStatements } from '../../types/node/TNodeWithLexicalScopeAndStatements';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';
import { TStringArrayScopeCallsWrapperDataByEncoding } from '../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrapperDataByEncoding';
import { TStringArrayTransformerCustomNodeFactory } from '../../types/container/custom-nodes/TStringArrayTransformerCustomNodeFactory';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { ILiteralNodesCacheStorage } from '../../interfaces/storages/string-array-transformers/ILiteralNodesCacheStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageAnalyzer } from '../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { StringArrayTransformerCustomNode } from '../../enums/custom-nodes/StringArrayTransformerCustomNode';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeLiteralUtils } from '../../node/NodeLiteralUtils';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeUtils } from '../../node/NodeUtils';
import { StringArrayCallNode } from '../../custom-nodes/string-array-nodes/StringArrayCallNode';
import { StringArrayScopeCallsWrapperNode } from '../../custom-nodes/string-array-nodes/StringArrayScopeCallsWrapperNode';

@injectable()
export class StringArrayTransformer extends AbstractNodeTransformer {
    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

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
     * @type {Map<TNodeWithLexicalScope, TStringArrayScopeCallsWrapperDataByEncoding>}
     */
    private readonly stringArrayScopeCallsWrapperDataByEncodingMap: Map<
        TNodeWithLexicalScope,
        TStringArrayScopeCallsWrapperDataByEncoding
    > = new Map();

    /**
     * @type {IStringArrayStorage}
     */
    private readonly stringArrayStorage: IStringArrayStorage;

    /**
     * @type {IStringArrayStorageAnalyzer}
     */
    private readonly stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer;

    /**
     * @type {TStringArrayTransformerCustomNodeFactory}
     */
    private readonly stringArrayTransformerCustomNodeFactory: TStringArrayTransformerCustomNodeFactory;

    /**
     * @type {TNodeWithLexicalScope[]}
     */
    private readonly visitedLexicalScopeNodesStack: TNodeWithLexicalScope[] = [];

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IArrayUtils} arrayUtils
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     * @param {ILiteralNodesCacheStorage} literalNodesCacheStorage
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IStringArrayStorageAnalyzer} stringArrayStorageAnalyzer
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {TStringArrayTransformerCustomNodeFactory} stringArrayTransformerCustomNodeFactory
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder,
        @inject(ServiceIdentifiers.ILiteralNodesCacheStorage) literalNodesCacheStorage: ILiteralNodesCacheStorage,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IStringArrayStorageAnalyzer) stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.Factory__IStringArrayTransformerCustomNode)
            stringArrayTransformerCustomNodeFactory: TStringArrayTransformerCustomNodeFactory
    ) {
        super(randomGenerator, options);

        this.arrayUtils = arrayUtils;
        this.escapeSequenceEncoder = escapeSequenceEncoder;
        this.literalNodesCacheStorage = literalNodesCacheStorage;
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayStorageAnalyzer = stringArrayStorageAnalyzer;
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.stringArrayTransformerCustomNodeFactory = stringArrayTransformerCustomNodeFactory;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    private static isValidLexicalScopeNode (node: ESTree.Node): node is TNodeWithLexicalScopeAndStatements {
        if (!NodeGuards.isNodeWithLexicalScope(node)) {
            return false;
        }

        const lexicalScopeBodyNode: ESTree.Program | ESTree.BlockStatement | ESTree.Expression =
            NodeGuards.isProgramNode(node)
                ? node
                : node.body;

        // invalid lexical scope node
        if (
            !lexicalScopeBodyNode.parentNode
            || !NodeGuards.isNodeWithLexicalScopeStatements(lexicalScopeBodyNode, lexicalScopeBodyNode.parentNode)
        ) {
            return false;
        }

        return true;
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

                        if (StringArrayTransformer.isValidLexicalScopeNode(node)) {
                            this.onLexicalScopeNodeEnter(node);
                        }

                        if (parentNode && NodeGuards.isLiteralNode(node) && !NodeMetadata.isReplacedLiteral(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    },
                    leave: (node: ESTree.Node): ESTree.Node | undefined => {
                        if (StringArrayTransformer.isValidLexicalScopeNode(node)) {
                            this.onLexicalScopeNodeLeave();

                            return this.transformLexicalScopeNode(node);
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

        const stringArrayCallCustomNode: ICustomNode<TInitialData<StringArrayCallNode>> =
            this.stringArrayTransformerCustomNodeFactory(StringArrayTransformerCustomNode.StringArrayCallNode);

        stringArrayCallCustomNode.initialize(stringArrayCallsWrapperName, index, decodeKey);

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

        const stringArrayCallsWrapperName: string = this.stringArrayStorage.getStorageCallsWrapperName(encoding);

        if (!this.options.stringArrayWrappersCount) {
            return stringArrayCallsWrapperName;
        }

        const currentLexicalScopeNode: TNodeWithLexicalScope | null = this.arrayUtils.getLastElement(this.visitedLexicalScopeNodesStack);

        if (!currentLexicalScopeNode) {
            throw new Error('Cannot find current lexical scope node');
        }

        const stringArrayScopeCallsWrapperDataByEncoding: TStringArrayScopeCallsWrapperDataByEncoding =
            this.stringArrayScopeCallsWrapperDataByEncodingMap.get(currentLexicalScopeNode) ?? {};
        const stringArrayScopeCallsWrapperNames: string[] = stringArrayScopeCallsWrapperDataByEncoding[encoding]?.names ?? [];
        const isFilledScopeCallsWrapperNamesList: boolean = stringArrayScopeCallsWrapperNames.length === this.options.stringArrayWrappersCount;

        if (!isFilledScopeCallsWrapperNamesList) {
            const nextScopeCallsWrapperName: string = this.identifierNamesGenerator.generateNext();

            stringArrayScopeCallsWrapperNames.push(nextScopeCallsWrapperName);
            stringArrayScopeCallsWrapperDataByEncoding[encoding] = {
                encoding,
                names: stringArrayScopeCallsWrapperNames
            };

            this.stringArrayScopeCallsWrapperDataByEncodingMap.set(
                currentLexicalScopeNode,
                stringArrayScopeCallsWrapperDataByEncoding
            );
        }

        return this.randomGenerator.getRandomGenerator().pickone(stringArrayScopeCallsWrapperNames);
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private onLexicalScopeNodeEnter (lexicalScopeNode: TNodeWithLexicalScope): void {
        this.visitedLexicalScopeNodesStack.push(lexicalScopeNode);
    }

    private onLexicalScopeNodeLeave (): void {
        this.visitedLexicalScopeNodesStack.pop();
    }

    /**
     * @param {TNodeWithLexicalScopeAndStatements} lexicalScopeNode
     * @returns {TNodeWithLexicalScopeAndStatements}
     */
    private transformLexicalScopeNode (lexicalScopeNode: TNodeWithLexicalScopeAndStatements): TNodeWithLexicalScopeAndStatements {
        if (!this.options.stringArrayWrappersCount) {
            return lexicalScopeNode;
        }

        const lexicalScopeBodyNode: ESTree.Program | ESTree.BlockStatement =
            NodeGuards.isProgramNode(lexicalScopeNode)
                ? lexicalScopeNode
                : lexicalScopeNode.body;

        const stringArrayScopeCallsWrapperDataByEncoding: TStringArrayScopeCallsWrapperDataByEncoding | null =
            this.stringArrayScopeCallsWrapperDataByEncodingMap.get(lexicalScopeNode) ?? null;

        if (!stringArrayScopeCallsWrapperDataByEncoding) {
            return lexicalScopeNode;
        }

        const stringArrayScopeCallsWrapperDataList: (IStringArrayScopeCallsWrapperData | undefined)[] =
            Object.values(stringArrayScopeCallsWrapperDataByEncoding);

        // iterates over data for each encoding type
        for (const stringArrayScopeCallsWrapperData of stringArrayScopeCallsWrapperDataList) {
            if (!stringArrayScopeCallsWrapperData) {
                continue;
            }

            const {encoding, names} = stringArrayScopeCallsWrapperData;
            const namesLength: number = names.length;

            /**
             * Iterates over each name of scope wrapper name
             * Reverse iteration appends wrappers at index `0` at the correct order
             */
            for (let i = namesLength - 1; i >= 0; i--) {
                const stringArrayScopeCallsWrapperName: string = names[i];
                const upperStringArrayCallsWrapperName: string = this.getUpperStringArrayCallsWrapperName(encoding);

                const stringArrayScopeCallsWrapperNode: ICustomNode<TInitialData<StringArrayScopeCallsWrapperNode>> =
                    this.stringArrayTransformerCustomNodeFactory(
                        StringArrayTransformerCustomNode.StringArrayScopeCallsWrapperNode
                    );

                stringArrayScopeCallsWrapperNode.initialize(
                    stringArrayScopeCallsWrapperName,
                    upperStringArrayCallsWrapperName
                );

                NodeAppender.prepend(
                    lexicalScopeBodyNode,
                    stringArrayScopeCallsWrapperNode.getNode()
                );
            }
        }

        return lexicalScopeNode;
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
        const rootStringArrayCallsWrapperName: string = this.getRootStringArrayCallsWrapperName(encoding);

        if (!this.options.stringArrayWrappersChainedCalls) {
            return rootStringArrayCallsWrapperName;
        }

        const parentLexicalScope: TNodeWithLexicalScope | null = this.arrayUtils.getLastElement(this.visitedLexicalScopeNodesStack);

        if (!parentLexicalScope) {
            return rootStringArrayCallsWrapperName;
        }

        const parentLexicalScopeDataByEncoding = this.stringArrayScopeCallsWrapperDataByEncodingMap
            .get(parentLexicalScope) ?? null;
        const parentLexicalScopeNames: string[] | null = parentLexicalScopeDataByEncoding?.[encoding]?.names ?? null;

        return parentLexicalScopeNames?.length
            ? this.randomGenerator
                .getRandomGenerator()
                .pickone(parentLexicalScopeNames)
            : rootStringArrayCallsWrapperName;
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
