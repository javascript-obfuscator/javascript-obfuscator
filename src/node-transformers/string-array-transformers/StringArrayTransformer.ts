import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';
import { TStringArrayIntermediateCallsWrapperDataByEncoding } from '../../types/node-transformers/string-array-transformers/TStringArrayIntermediateCallsWrapperDataByEncoding';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { ILiteralNodesCacheStorage } from '../../interfaces/storages/string-array-transformers/ILiteralNodesCacheStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageAnalyzer } from '../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeLiteralUtils } from '../../node/NodeLiteralUtils';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeUtils } from '../../node/NodeUtils';
import { NumberUtils } from '../../utils/NumberUtils';

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
     * @type {Map<TNodeWithLexicalScope, TStringArrayIntermediateCallsWrapperDataByEncoding>}
     */
    private readonly stringArrayIntermediateCallsWrapperDataByEncodingMap: Map<
        TNodeWithLexicalScope,
        TStringArrayIntermediateCallsWrapperDataByEncoding
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
     * @type {TNodeWithLexicalScope[]}
     */
    private readonly visitedLexicalScopeNodesStack: TNodeWithLexicalScope[] = [];

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {ILiteralNodesCacheStorage} literalNodesCacheStorage
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IStringArrayStorageAnalyzer} stringArrayStorageAnalyzer
     * @param {IArrayUtils} arrayUtils
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.ILiteralNodesCacheStorage) literalNodesCacheStorage: ILiteralNodesCacheStorage,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IStringArrayStorageAnalyzer) stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
    ) {
        super(randomGenerator, options);

        this.literalNodesCacheStorage = literalNodesCacheStorage;
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayStorageAnalyzer = stringArrayStorageAnalyzer;
        this.arrayUtils = arrayUtils;
        this.escapeSequenceEncoder = escapeSequenceEncoder;
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
    }

    /**
     * @param {string} hexadecimalIndex
     * @returns {Literal}
     */
    private static getHexadecimalLiteralNode (hexadecimalIndex: string): ESTree.Literal {
        const hexadecimalLiteralNode: ESTree.Literal = NodeFactory.literalNode(hexadecimalIndex);

        NodeMetadata.set(hexadecimalLiteralNode, { replacedLiteral: true });

        return hexadecimalLiteralNode;
    }

    /**
     * @param {string} literalValue
     * @returns {Literal}
     */
    private static getRc4KeyLiteralNode (literalValue: string): ESTree.Literal {
        const rc4KeyLiteralNode: ESTree.Literal = NodeFactory.literalNode(literalValue);

        NodeMetadata.set(rc4KeyLiteralNode, { replacedLiteral: true });

        return rc4KeyLiteralNode;
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

                        if (NodeGuards.isNodeWithLexicalScope(node)) {
                            this.onLexicalScopeNodeEnter(node);
                        }

                        if (parentNode && NodeGuards.isLiteralNode(node) && !NodeMetadata.isReplacedLiteral(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    },
                    leave: (node: ESTree.Node): ESTree.Node | undefined => {
                        if (NodeGuards.isNodeWithLexicalScope(node)) {
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
        const { index, decodeKey } = stringArrayStorageItemData;

        const hexadecimalIndex: string = NumberUtils.toHex(index);
        const callExpressionArgs: (ESTree.Expression | ESTree.SpreadElement)[] = [
            StringArrayTransformer.getHexadecimalLiteralNode(hexadecimalIndex)
        ];

        if (decodeKey) {
            callExpressionArgs.push(StringArrayTransformer.getRc4KeyLiteralNode(decodeKey));
        }

        const stringArrayCallsWrapperName: string = this.getStringArrayCallsWrapperName(stringArrayStorageItemData);

        const stringArrayIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode(
            stringArrayCallsWrapperName
        );

        return NodeFactory.callExpressionNode(
            stringArrayIdentifierNode,
            callExpressionArgs
        );
    }

    /**
     * @param {IStringArrayStorageItemData} stringArrayStorageItemData
     * @returns {string}
     */
    private getStringArrayCallsWrapperName (stringArrayStorageItemData: IStringArrayStorageItemData): string {
        const {encoding} = stringArrayStorageItemData;

        const stringArrayCallsWrapperName: string = this.stringArrayStorage.getStorageCallsWrapperName(encoding);

        // Name of the string array calls wrapper itself
        if (!this.options.stringArrayIntermediateVariablesCount) {
            return stringArrayCallsWrapperName;
        }

        const currentLexicalScopeNode: TNodeWithLexicalScope | null = this.arrayUtils.getLastElement(this.visitedLexicalScopeNodesStack);

        if (!currentLexicalScopeNode) {
            throw new Error('Cannot find current lexical scope node');
        }

        const stringArrayIntermediateCallsWrapperDataByEncoding: TStringArrayIntermediateCallsWrapperDataByEncoding = currentLexicalScopeNode
            ? this.stringArrayIntermediateCallsWrapperDataByEncodingMap.get(currentLexicalScopeNode) ?? {}
            : {};
        const stringArrayIntermediateCallsWrapperNames: string[] = stringArrayIntermediateCallsWrapperDataByEncoding[encoding]?.names ?? [];
        const isFilledIntermediateCallsWrapperNamesList: boolean = stringArrayIntermediateCallsWrapperNames.length === this.options.stringArrayIntermediateVariablesCount;

        if (currentLexicalScopeNode && !isFilledIntermediateCallsWrapperNamesList) {
            const nextIntermediateCallsWrapperName: string = this.identifierNamesGenerator.generateForLexicalScope(currentLexicalScopeNode);

            stringArrayIntermediateCallsWrapperNames.push(nextIntermediateCallsWrapperName);
            stringArrayIntermediateCallsWrapperDataByEncoding[encoding] = {
                encoding,
                names: stringArrayIntermediateCallsWrapperNames
            };

            this.stringArrayIntermediateCallsWrapperDataByEncodingMap.set(
                currentLexicalScopeNode,
                stringArrayIntermediateCallsWrapperDataByEncoding
            );
        }

        return this.randomGenerator.getRandomGenerator().pickone(stringArrayIntermediateCallsWrapperNames);
    }

    /**
     * @param {TStringArrayEncoding} encoding
     * @returns {string}
     */
    private getStringArrayRootCallsWrapperName (encoding: TStringArrayEncoding): string {
        return this.stringArrayStorage.getStorageCallsWrapperName(encoding);
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
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @returns {TNodeWithLexicalScope}
     */
    private transformLexicalScopeNode (lexicalScopeNode: TNodeWithLexicalScope): TNodeWithLexicalScope {
        if (!this.options.stringArrayIntermediateVariablesCount) {
            return lexicalScopeNode;
        }

        const lexicalScopeBodyNode: ESTree.Program | ESTree.BlockStatement | ESTree.Expression =
            NodeGuards.isProgramNode(lexicalScopeNode)
                ? lexicalScopeNode
                : lexicalScopeNode.body;

        if (
            !lexicalScopeBodyNode.parentNode
            || !NodeGuards.isNodeWithLexicalScopeStatements(lexicalScopeBodyNode, lexicalScopeBodyNode.parentNode)
        ) {
            return lexicalScopeNode;
        }

        const stringArrayIntermediateCallsWrapperDataByEncoding: TStringArrayIntermediateCallsWrapperDataByEncoding | null =
            this.stringArrayIntermediateCallsWrapperDataByEncodingMap.get(lexicalScopeNode) ?? null;

        if (!stringArrayIntermediateCallsWrapperDataByEncoding) {
            return lexicalScopeNode;
        }

        const stringArrayIntermediateCallsWrapperDataList =
            Object.values(stringArrayIntermediateCallsWrapperDataByEncoding);

        for (const stringArrayIntermediateCallsWrapperData of stringArrayIntermediateCallsWrapperDataList) {
            if (!stringArrayIntermediateCallsWrapperData) {
                continue;
            }

            const {encoding, names} = stringArrayIntermediateCallsWrapperData;

            for (const stringArrayIntermediateCallsWrapperName of names) {
                const stringArrayRootCallsWrapperName: string = this.getStringArrayRootCallsWrapperName(encoding);

                NodeAppender.prepend(
                    lexicalScopeBodyNode,
                    [
                        NodeFactory.variableDeclarationNode(
                            [
                                NodeFactory.variableDeclaratorNode(
                                    NodeFactory.identifierNode(stringArrayIntermediateCallsWrapperName),
                                    NodeFactory.identifierNode(stringArrayRootCallsWrapperName)
                                )
                            ],
                            'var',
                        )
                    ]
                );
            }
        }

        return lexicalScopeNode;
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
