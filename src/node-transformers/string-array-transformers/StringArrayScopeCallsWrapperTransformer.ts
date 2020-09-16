import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TInitialData } from '../../types/TInitialData';
import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';
import { TStringArrayTransformerCustomNodeFactory } from '../../types/container/custom-nodes/TStringArrayTransformerCustomNodeFactory';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';
import { IStringArrayScopeCallsWrapperNamesData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperNamesData';
import { IStringArrayScopeCallsWrapperDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperDataStorage';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IVisitedLexicalScopeNodesStackStorage } from '../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { StringArrayTransformerCustomNode } from '../../enums/custom-nodes/StringArrayTransformerCustomNode';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeGuards } from '../../node/NodeGuards';
import { StringArrayScopeCallsWrapperVariableNode } from '../../custom-nodes/string-array-nodes/StringArrayScopeCallsWrapperVariableNode';
import { TStatement } from '../../types/node/TStatement';
import { StringArrayWrappersType } from '../../enums/node-transformers/string-array-transformers/StringArrayWrappersType';
import { StringArrayScopeCallsWrapperFunctionNode } from '../../custom-nodes/string-array-nodes/StringArrayScopeCallsWrapperFunctionNode';

@injectable()
export class StringArrayScopeCallsWrapperTransformer extends AbstractNodeTransformer {
    /**
     * @type {IStringArrayStorage}
     */
    private readonly stringArrayStorage: IStringArrayStorage;

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
     * @param {IVisitedLexicalScopeNodesStackStorage} visitedLexicalScopeNodesStackStorage
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IStringArrayScopeCallsWrapperDataStorage} stringArrayScopeCallsWrapperDataStorage
     * @param {TStringArrayTransformerCustomNodeFactory} stringArrayTransformerCustomNodeFactory
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IVisitedLexicalScopeNodesStackStorage) visitedLexicalScopeNodesStackStorage: IVisitedLexicalScopeNodesStackStorage,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IStringArrayScopeCallsWrapperDataStorage) stringArrayScopeCallsWrapperDataStorage: IStringArrayScopeCallsWrapperDataStorage,
        @inject(ServiceIdentifiers.Factory__IStringArrayTransformerCustomNode)
            stringArrayTransformerCustomNodeFactory: TStringArrayTransformerCustomNodeFactory
    ) {
        super(randomGenerator, options);

        this.visitedLexicalScopeNodesStackStorage = visitedLexicalScopeNodesStackStorage;
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayScopeCallsWrapperDataStorage = stringArrayScopeCallsWrapperDataStorage;
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
        const stringArrayScopeCallsWrapperData: IStringArrayScopeCallsWrapperData | null =
            this.stringArrayScopeCallsWrapperDataStorage.get(lexicalScopeBodyNode) ?? null;

        if (!stringArrayScopeCallsWrapperData) {
            return lexicalScopeBodyNode;
        }

        const indexShift: number = this.options.stringArrayWrappersChainedCalls
            ? stringArrayScopeCallsWrapperData.scopeIndexShift
            : stringArrayScopeCallsWrapperData.globalIndexShift;
        const stringArrayScopeCallsWrapperNamesDataList: (IStringArrayScopeCallsWrapperNamesData | undefined)[] =
            Object.values(stringArrayScopeCallsWrapperData.names);

        // iterates over data for each encoding type
        for (const stringArrayScopeCallsWrapperNamesData of stringArrayScopeCallsWrapperNamesDataList) {
            if (!stringArrayScopeCallsWrapperNamesData) {
                continue;
            }

            const {encoding, names} = stringArrayScopeCallsWrapperNamesData;
            const namesLength: number = names.length;

            /**
             * Iterates over each name of scope wrapper name
             * Reverse iteration appends wrappers at index `0` at the correct order
             */
            for (let i = namesLength - 1; i >= 0; i--) {
                const stringArrayScopeCallsWrapperName: string = names[i];
                const upperStringArrayCallsWrapperName: string = this.getUpperStringArrayCallsWrapperName(encoding);

                const stringArrayScopeCallsWrapperNode: TStatement[] = this.getStringArrayScopeCallsWrapperNode(
                    stringArrayScopeCallsWrapperName,
                    upperStringArrayCallsWrapperName,
                    indexShift
                );

                NodeAppender.prepend(
                    lexicalScopeBodyNode,
                    stringArrayScopeCallsWrapperNode
                );
            }
        }

        return lexicalScopeBodyNode;
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

        const parentLexicalScopeBodyNode: TNodeWithLexicalScopeStatements | undefined =
            this.visitedLexicalScopeNodesStackStorage.getLastElement();

        if (!parentLexicalScopeBodyNode) {
            return rootStringArrayCallsWrapperName;
        }

        const parentLexicalScopeData: IStringArrayScopeCallsWrapperData | null = this.stringArrayScopeCallsWrapperDataStorage
            .get(parentLexicalScopeBodyNode) ?? null;
        const parentLexicalScopeNames: string[] | null = parentLexicalScopeData?.names[encoding]?.names ?? null;

        return parentLexicalScopeNames?.length
            ? this.randomGenerator
                .getRandomGenerator()
                .pickone(parentLexicalScopeNames)
            : rootStringArrayCallsWrapperName;
    }

    /**
     * @param {string} stringArrayScopeCallsWrapperName
     * @param {string} upperStringArrayCallsWrapperName
     * @param {number} indexShift
     * @returns {TStatement[]}
     */
    private getStringArrayScopeCallsWrapperNode (
        stringArrayScopeCallsWrapperName: string,
        upperStringArrayCallsWrapperName: string,
        indexShift: number
    ): TStatement[] {
        switch (this.options.stringArrayWrappersType) {
            case StringArrayWrappersType.Function:
                return this.getStringArrayScopeCallsWrapperFunctionNode(
                    stringArrayScopeCallsWrapperName,
                    upperStringArrayCallsWrapperName,
                    indexShift
                );

            case StringArrayWrappersType.Variable:
            default:
                return this.getStringArrayScopeCallsWrapperVariableNode(
                    stringArrayScopeCallsWrapperName,
                    upperStringArrayCallsWrapperName
                );
        }
    }

    /**
     * @param {string} stringArrayScopeCallsWrapperName
     * @param {string} upperStringArrayCallsWrapperName
     * @returns {TStatement[]}
     */
    private getStringArrayScopeCallsWrapperVariableNode (
        stringArrayScopeCallsWrapperName: string,
        upperStringArrayCallsWrapperName: string
    ): TStatement[] {
        const stringArrayScopeCallsWrapperVariableNode: ICustomNode<TInitialData<StringArrayScopeCallsWrapperVariableNode>> =
            this.stringArrayTransformerCustomNodeFactory(
                StringArrayTransformerCustomNode.StringArrayScopeCallsWrapperVariableNode
            );

        stringArrayScopeCallsWrapperVariableNode.initialize(
            stringArrayScopeCallsWrapperName,
            upperStringArrayCallsWrapperName
        );

        return stringArrayScopeCallsWrapperVariableNode.getNode();
    }

    /**
     * @param {string} stringArrayScopeCallsWrapperName
     * @param {string} upperStringArrayCallsWrapperName
     * @param {number} indexShift
     * @returns {TStatement[]}
     */
    private getStringArrayScopeCallsWrapperFunctionNode (
        stringArrayScopeCallsWrapperName: string,
        upperStringArrayCallsWrapperName: string,
        indexShift: number
    ): TStatement[] {
        const stringArrayScopeCallsWrapperFunctionNode: ICustomNode<TInitialData<StringArrayScopeCallsWrapperFunctionNode>> =
            this.stringArrayTransformerCustomNodeFactory(
                StringArrayTransformerCustomNode.StringArrayScopeCallsWrapperFunctionNode
            );

        stringArrayScopeCallsWrapperFunctionNode.initialize(
            stringArrayScopeCallsWrapperName,
            upperStringArrayCallsWrapperName,
            indexShift
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
