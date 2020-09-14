import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TInitialData } from '../../types/TInitialData';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { TNodeWithLexicalScopeAndStatements } from '../../types/node/TNodeWithLexicalScopeAndStatements';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';
import { TStringArrayScopeCallsWrapperDataByEncoding } from '../../types/node-transformers/string-array-transformers/TStringArrayScopeCallsWrapperDataByEncoding';
import { TStringArrayTransformerCustomNodeFactory } from '../../types/container/custom-nodes/TStringArrayTransformerCustomNodeFactory';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';
import { IStringArrayScopeCallsWrapperDataStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperDataStorage';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IVisitedLexicalScopeNodesStackStorage } from '../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { StringArrayTransformerCustomNode } from '../../enums/custom-nodes/StringArrayTransformerCustomNode';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeGuards } from '../../node/NodeGuards';
import { StringArrayScopeCallsWrapperNode } from '../../custom-nodes/string-array-nodes/StringArrayScopeCallsWrapperNode';

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
                    enter: (node: ESTree.Node): void => {
                        if (NodeGuards.isNodeWithLexicalScopeAndStatements(node)) {
                            this.onLexicalScopeNodeEnter(node);
                        }
                    },
                    leave: (node: ESTree.Node): ESTree.Node | undefined => {
                        if (NodeGuards.isNodeWithLexicalScopeAndStatements(node)) {
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
     * @param {TNodeWithLexicalScopeAndStatements} lexicalScopeNode
     * @returns {TNodeWithLexicalScopeAndStatements}
     */
    public transformNode (lexicalScopeNode: TNodeWithLexicalScopeAndStatements): TNodeWithLexicalScopeAndStatements {
        const lexicalScopeBodyNode: ESTree.Program | ESTree.BlockStatement =
            NodeGuards.isProgramNode(lexicalScopeNode)
                ? lexicalScopeNode
                : lexicalScopeNode.body;

        const stringArrayScopeCallsWrapperDataByEncoding: TStringArrayScopeCallsWrapperDataByEncoding | null =
            this.stringArrayScopeCallsWrapperDataStorage.get(lexicalScopeNode) ?? null;

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

        const parentLexicalScope: TNodeWithLexicalScope | undefined = this.visitedLexicalScopeNodesStackStorage.getLastElement();

        if (!parentLexicalScope) {
            return rootStringArrayCallsWrapperName;
        }

        const parentLexicalScopeDataByEncoding = this.stringArrayScopeCallsWrapperDataStorage
            .get(parentLexicalScope) ?? null;
        const parentLexicalScopeNames: string[] | null = parentLexicalScopeDataByEncoding?.[encoding]?.names ?? null;

        return parentLexicalScopeNames?.length
            ? this.randomGenerator
                .getRandomGenerator()
                .pickone(parentLexicalScopeNames)
            : rootStringArrayCallsWrapperName;
    }

    /**
     * @param {TNodeWithLexicalScopeAndStatements} lexicalScopeNode
     */
    private onLexicalScopeNodeEnter (lexicalScopeNode: TNodeWithLexicalScopeAndStatements): void {
        this.visitedLexicalScopeNodesStackStorage.push(lexicalScopeNode);
    }

    private onLexicalScopeNodeLeave (): void {
        this.visitedLexicalScopeNodesStackStorage.pop();
    }
}
