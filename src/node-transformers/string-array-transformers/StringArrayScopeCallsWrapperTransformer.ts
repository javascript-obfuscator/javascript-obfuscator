import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TInitialData } from '../../types/TInitialData';
import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayScopeCallsWrappersDataByEncoding } from '../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrappersDataByEncoding';
import { TStringArrayCustomNodeFactory } from '../../types/container/custom-nodes/TStringArrayCustomNodeFactory';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';
import { IStringArrayScopeCallsWrapperLexicalScopeData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperLexicalScopeData';
import { IStringArrayScopeCallsWrapperLexicalScopeDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperLexicalScopeDataStorage';
import { IStringArrayScopeCallsWrappersData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrappersData';
import { IStringArrayScopeCallsWrappersDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrappersDataStorage';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IVisitedLexicalScopeNodesStackStorage } from '../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { StringArrayCustomNode } from '../../enums/custom-nodes/StringArrayCustomNode';
import { StringArrayWrappersType } from '../../enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeGuards } from '../../node/NodeGuards';
import { StringArrayScopeCallsWrapperFunctionNode } from '../../custom-nodes/string-array-nodes/StringArrayScopeCallsWrapperFunctionNode';
import { StringArrayScopeCallsWrapperVariableNode } from '../../custom-nodes/string-array-nodes/StringArrayScopeCallsWrapperVariableNode';

@injectable()
export class StringArrayScopeCallsWrapperTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeTransformer[]}
     */
    public override readonly runAfter: NodeTransformer[] = [
        NodeTransformer.StringArrayRotateFunctionTransformer
    ];

    /**
     * @type {IStringArrayStorage}
     */
    private readonly stringArrayStorage: IStringArrayStorage;

    /**
     * @type {IStringArrayScopeCallsWrapperLexicalScopeDataStorage}
     */
    private readonly stringArrayScopeCallsWrapperLexicalScopeDataStorage: IStringArrayScopeCallsWrapperLexicalScopeDataStorage;

    /**
     * @type {IStringArrayScopeCallsWrappersDataStorage}
     */
    private readonly stringArrayScopeCallsWrappersDataStorage: IStringArrayScopeCallsWrappersDataStorage;

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
     * @param {IVisitedLexicalScopeNodesStackStorage} visitedLexicalScopeNodesStackStorage
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IStringArrayScopeCallsWrappersDataStorage} stringArrayScopeCallsWrappersDataStorage
     * @param {IStringArrayScopeCallsWrapperLexicalScopeDataStorage} stringArrayScopeCallsWrapperLexicalScopeDataStorage
     * @param {TStringArrayCustomNodeFactory} stringArrayTransformerCustomNodeFactory
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IVisitedLexicalScopeNodesStackStorage) visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IStringArrayScopeCallsWrappersDataStorage) stringArrayScopeCallsWrappersDataStorage: IStringArrayScopeCallsWrappersDataStorage,
        @inject(ServiceIdentifiers.IStringArrayScopeCallsWrapperLexicalScopeDataStorage) stringArrayScopeCallsWrapperLexicalScopeDataStorage: IStringArrayScopeCallsWrapperLexicalScopeDataStorage,
        @inject(ServiceIdentifiers.Factory__IStringArrayCustomNode)
            stringArrayTransformerCustomNodeFactory: TStringArrayCustomNodeFactory
    ) {
        super(randomGenerator, options);

        this.visitedLexicalScopeNodesStackStorage = visitedLexicalScopeNodesStackStorage;
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayScopeCallsWrappersDataStorage = stringArrayScopeCallsWrappersDataStorage;
        this.stringArrayScopeCallsWrapperLexicalScopeDataStorage = stringArrayScopeCallsWrapperLexicalScopeDataStorage;
        this.stringArrayTransformerCustomNodeFactory = stringArrayTransformerCustomNodeFactory;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        if (!this.options.stringArrayWrappersCount) {
            return null;
        }

        switch (nodeTransformationStage) {
            case NodeTransformationStage.StringArray:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): void => {
                        if (parentNode && NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode)) {
                            this.onLexicalScopeNodeEnter(node);
                        }
                    },
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode)) {
                            this.onLexicalScopeNodeLeave();

                            return this.transformNode(node);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {TNodeWithLexicalScopeStatements} lexicalScopeBodyNode
     * @returns {TNodeWithLexicalScopeStatements}
     */
    public transformNode (
        lexicalScopeBodyNode: TNodeWithLexicalScopeStatements
    ): TNodeWithLexicalScopeStatements {
        const stringArrayScopeCallsWrappersDataByEncoding: TStringArrayScopeCallsWrappersDataByEncoding | null =
            this.stringArrayScopeCallsWrappersDataStorage.get(lexicalScopeBodyNode) ?? null;
        const stringArrayScopeCallsWrapperLexicalScopeData: IStringArrayScopeCallsWrapperLexicalScopeData | null =
            this.stringArrayScopeCallsWrapperLexicalScopeDataStorage.get(lexicalScopeBodyNode) ?? null;

        if (!stringArrayScopeCallsWrappersDataByEncoding || !stringArrayScopeCallsWrapperLexicalScopeData) {
            return lexicalScopeBodyNode;
        }

        const stringArrayScopeCallsWrappersDataList: (IStringArrayScopeCallsWrappersData | undefined)[] =
            Object.values(stringArrayScopeCallsWrappersDataByEncoding);

        // iterates over data for each encoding type
        for (const stringArrayScopeCallsWrappersData of stringArrayScopeCallsWrappersDataList) {
            if (!stringArrayScopeCallsWrappersData) {
                continue;
            }

            const {scopeCallsWrappersData} = stringArrayScopeCallsWrappersData;
            const scopeCallsWrappersDataLength: number = scopeCallsWrappersData.length;

            /**
             * Iterates over each name of scope wrapper name
             * Reverse iteration appends wrappers at index `0` at the correct order
             */
            for (let i = scopeCallsWrappersDataLength - 1; i >= 0; i--) {
                const stringArrayScopeCallsWrapperData = scopeCallsWrappersData[i];
                const upperStringArrayCallsWrapperData = this.getUpperStringArrayCallsWrapperData(
                    stringArrayScopeCallsWrappersData,
                    stringArrayScopeCallsWrapperLexicalScopeData,
                );

                this.getAndAppendStringArrayScopeCallsWrapperNode(
                    lexicalScopeBodyNode,
                    stringArrayScopeCallsWrapperData,
                    upperStringArrayCallsWrapperData
                );
            }
        }

        return lexicalScopeBodyNode;
    }

    /**
     * @param {IStringArrayScopeCallsWrappersData} stringArrayScopeCallsWrappersData
     * @param {IStringArrayScopeCallsWrapperLexicalScopeData} stringArrayScopeCallsWrapperLexicalScopeData
     * @returns {IStringArrayScopeCallsWrapperData}
     */
    private getRootStringArrayCallsWrapperData (
        stringArrayScopeCallsWrappersData: IStringArrayScopeCallsWrappersData,
        stringArrayScopeCallsWrapperLexicalScopeData: IStringArrayScopeCallsWrapperLexicalScopeData
    ): IStringArrayScopeCallsWrapperData {
        const {encoding} = stringArrayScopeCallsWrappersData;

        return {
            name: this.stringArrayStorage.getStorageCallsWrapperName(encoding),
            index: 0,
            parameterIndexesData: null
        };
    }

    /**
     * @param {IStringArrayScopeCallsWrappersData} stringArrayScopeCallsWrappersData
     * @param {IStringArrayScopeCallsWrapperLexicalScopeData} stringArrayScopeCallsWrapperLexicalScopeData
     * @returns {IStringArrayScopeCallsWrapperData}
     */
    private getUpperStringArrayCallsWrapperData (
        stringArrayScopeCallsWrappersData: IStringArrayScopeCallsWrappersData,
        stringArrayScopeCallsWrapperLexicalScopeData: IStringArrayScopeCallsWrapperLexicalScopeData
    ): IStringArrayScopeCallsWrapperData {
        const {encoding} = stringArrayScopeCallsWrappersData;

        const rootStringArrayCallsWrapperData = this.getRootStringArrayCallsWrapperData(
            stringArrayScopeCallsWrappersData,
            stringArrayScopeCallsWrapperLexicalScopeData
        );

        if (!this.options.stringArrayWrappersChainedCalls) {
            return rootStringArrayCallsWrapperData;
        }

        const parentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements | null =
            this.visitedLexicalScopeNodesStackStorage.getLastElement()
            ?? null;

        if (!parentLexicalScopeBodyNode) {
            return rootStringArrayCallsWrapperData;
        }

        const parentLexicalScopeCallsWrappersDataByEncoding: TStringArrayScopeCallsWrappersDataByEncoding | null =
            this.stringArrayScopeCallsWrappersDataStorage
                .get(parentLexicalScopeBodyNode) ?? null;
        const parentScopeCallsWrappersData: IStringArrayScopeCallsWrapperData[] | null =
            parentLexicalScopeCallsWrappersDataByEncoding?.[encoding]?.scopeCallsWrappersData ?? null;

        if (!parentScopeCallsWrappersData?.length) {
            return rootStringArrayCallsWrapperData;
        }

        return this.randomGenerator
            .getRandomGenerator()
            .pickone(parentScopeCallsWrappersData);
    }

    /**
     * @param {TNodeWithLexicalScopeStatements} lexicalScopeBodyNode
     * @param {IStringArrayScopeCallsWrapperData} stringArrayScopeCallsWrapperData
     * @param {IStringArrayScopeCallsWrapperData} upperStringArrayCallsWrapperData
     */
    private getAndAppendStringArrayScopeCallsWrapperNode (
        lexicalScopeBodyNode: TNodeWithLexicalScopeStatements,
        stringArrayScopeCallsWrapperData: IStringArrayScopeCallsWrapperData,
        upperStringArrayCallsWrapperData: IStringArrayScopeCallsWrapperData,
    ): void {
        let stringArrayScopeCallsWrapperNode: TStatement[];

        switch (this.options.stringArrayWrappersType) {
            case StringArrayWrappersType.Function: {
                const randomIndex: number = this.randomGenerator.getRandomInteger(
                    0,
                    lexicalScopeBodyNode.body.length - 1
                );

                stringArrayScopeCallsWrapperNode = this.getStringArrayScopeCallsWrapperFunctionNode(
                    stringArrayScopeCallsWrapperData,
                    upperStringArrayCallsWrapperData,
                );

                NodeAppender.insertAtIndex(
                    lexicalScopeBodyNode,
                    stringArrayScopeCallsWrapperNode,
                    randomIndex
                );

                break;
            }

            case StringArrayWrappersType.Variable:
            default: {
                stringArrayScopeCallsWrapperNode = this.getStringArrayScopeCallsWrapperVariableNode(
                    stringArrayScopeCallsWrapperData,
                    upperStringArrayCallsWrapperData
                );

                NodeAppender.prepend(
                    lexicalScopeBodyNode,
                    stringArrayScopeCallsWrapperNode
                );
            }
        }
    }

    /**
     * @param {IStringArrayScopeCallsWrapperData} stringArrayScopeCallsWrapperData
     * @param {IStringArrayScopeCallsWrapperData} upperStringArrayCallsWrapperData
     * @returns {TStatement[]}
     */
    private getStringArrayScopeCallsWrapperVariableNode (
        stringArrayScopeCallsWrapperData: IStringArrayScopeCallsWrapperData,
        upperStringArrayCallsWrapperData: IStringArrayScopeCallsWrapperData
    ): TStatement[] {
        const stringArrayScopeCallsWrapperVariableNode: ICustomNode<TInitialData<StringArrayScopeCallsWrapperVariableNode>> =
            this.stringArrayTransformerCustomNodeFactory(
                StringArrayCustomNode.StringArrayScopeCallsWrapperVariableNode
            );

        stringArrayScopeCallsWrapperVariableNode.initialize(
            stringArrayScopeCallsWrapperData,
            upperStringArrayCallsWrapperData
        );

        return stringArrayScopeCallsWrapperVariableNode.getNode();
    }

    /**
     * @param {IStringArrayScopeCallsWrapperData} stringArrayScopeCallsWrapperData
     * @param {IStringArrayScopeCallsWrapperData} upperStringArrayCallsWrapperData
     * @returns {TStatement[]}
     */
    private getStringArrayScopeCallsWrapperFunctionNode (
        stringArrayScopeCallsWrapperData: IStringArrayScopeCallsWrapperData,
        upperStringArrayCallsWrapperData: IStringArrayScopeCallsWrapperData,
    ): TStatement[] {
        const stringArrayScopeCallsWrapperFunctionNode: ICustomNode<TInitialData<StringArrayScopeCallsWrapperFunctionNode>> =
            this.stringArrayTransformerCustomNodeFactory(
                StringArrayCustomNode.StringArrayScopeCallsWrapperFunctionNode
            );

        stringArrayScopeCallsWrapperFunctionNode.initialize(
            stringArrayScopeCallsWrapperData,
            upperStringArrayCallsWrapperData
        );

        return stringArrayScopeCallsWrapperFunctionNode.getNode();
    }

    /**
     * @param {TNodeWithLexicalScopeStatements} lexicalScopeBodyNode
     */
    private onLexicalScopeNodeEnter (lexicalScopeBodyNode: TNodeWithLexicalScopeStatements): void {
        this.visitedLexicalScopeNodesStackStorage.push(lexicalScopeBodyNode);
    }

    private onLexicalScopeNodeLeave (): void {
        this.visitedLexicalScopeNodesStackStorage.pop();
    }
}
