import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TInitialData } from '../../types/TInitialData';
import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayCustomNodeFactory } from '../../types/container/custom-nodes/TStringArrayCustomNodeFactory';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { StringArrayCustomNode } from '../../enums/custom-nodes/StringArrayCustomNode';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeUtils } from '../../node/NodeUtils';
import { StringArrayIndexHostNode } from '../../custom-nodes/string-array-nodes/StringArrayIndexHostNode';

@injectable()
export class StringArrayCallsTransformer extends AbstractNodeTransformer {
    /**
     * @type {number}
     */
    private static readonly lexicalScopeBodyLengthThreshold: number = 20000;

    /**
     * @type {NodeTransformer[]}
     */
    public override readonly runAfter: NodeTransformer[] = [
        NodeTransformer.StringArrayTransformer
    ];

    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {TStringArrayCustomNodeFactory}
     */
    private readonly stringArrayTransformerCustomNodeFactory: TStringArrayCustomNodeFactory;

    /**
     * @type {TNodeWithLexicalScopeStatements[]}
     */
    private readonly visitedLexicalScopeNodesStack: TNodeWithLexicalScopeStatements[] = [];

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {TStringArrayCustomNodeFactory} stringArrayTransformerCustomNodeFactory
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.Factory__IStringArrayCustomNode)
            stringArrayTransformerCustomNodeFactory: TStringArrayCustomNodeFactory
    ) {
        super(randomGenerator, options);

        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.stringArrayTransformerCustomNodeFactory = stringArrayTransformerCustomNodeFactory;
        this.stringArrayTransformerCustomNodeFactory = stringArrayTransformerCustomNodeFactory;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        if (!this.options.stringArrayCallsTransform) {
            return null;
        }

        switch (nodeTransformationStage) {
            case NodeTransformationStage.StringArray:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode)) {
                            this.onLexicalScopeNodeEnter(node);

                            return node;
                        }
                    },
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode)) {
                            this.onLexicalScopeNodeLeave();

                            return node;
                        }

                        if (
                            parentNode
                            && NodeGuards.isLiteralNode(node)
                            && NodeMetadata.isStringArrayCallLiteralNode(node)
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
     * @param {Literal} literalNode
     * @param {Node} parentNode
     * @returns {Literal | Identifier}
     */
    public transformNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Literal | ESTree.Identifier {
        const randomLexicalScopeNode: TNodeWithLexicalScopeStatements = this.randomGenerator
            .getRandomGenerator()
            .pickone(this.visitedLexicalScopeNodesStack);

        if (!randomLexicalScopeNode) {
            return literalNode;
        }

        const randomNumber: number = this.randomGenerator.getMathRandom();
        const isOptionThresholdPassed: boolean = randomNumber <= this.options.stringArrayCallsTransformThreshold;
        const isLargeLexicalScopeBodyLengthThresholdPassed: boolean = randomNumber > (
            randomLexicalScopeNode.body.length / StringArrayCallsTransformer.lexicalScopeBodyLengthThreshold
        );

        if (!isOptionThresholdPassed || !isLargeLexicalScopeBodyLengthThresholdPassed) {
            return literalNode;
        }

        const hostVariableName: string = this.identifierNamesGenerator.generateNext();
        const hostVariableNode: ESTree.VariableDeclaration = this.getStringArrayIndexHostNode(
            literalNode,
            hostVariableName
        );
        NodeUtils.parentizeAst(hostVariableNode);

        NodeAppender.prepend(randomLexicalScopeNode, [hostVariableNode]);

        const identifierNode: ESTree.Identifier = NodeFactory.identifierNode(hostVariableName);
        NodeUtils.parentizeNode(identifierNode, parentNode);

        return identifierNode;
    }

    /**
     * @param {Literal} stringArrayCallIndexNode
     * @param {string} variableName
     * @returns {VariableDeclaration}
     */
    private getStringArrayIndexHostNode (
        stringArrayCallIndexNode: ESTree.Literal,
        variableName: string
    ): ESTree.VariableDeclaration {
        const stringArrayCallCustomNode: ICustomNode<TInitialData<StringArrayIndexHostNode>> =
            this.stringArrayTransformerCustomNodeFactory(StringArrayCustomNode.StringArrayIndexHostNode);

        stringArrayCallCustomNode.initialize(
            stringArrayCallIndexNode,
            variableName
        );

        const statementNode: TStatement = stringArrayCallCustomNode.getNode()[0];

        if (!NodeGuards.isVariableDeclarationNode(statementNode)) {
            throw new Error('`stringArrayIndexHostNode.getNode()[0]` should returns array with `isVariableDeclarationNode` node');
        }

        return statementNode;
    }

    /**
     * @param {TNodeWithLexicalScopeStatements} lexicalScopeBodyNode
     */
    private onLexicalScopeNodeEnter (lexicalScopeBodyNode: TNodeWithLexicalScopeStatements): void {
        this.visitedLexicalScopeNodesStack.push(lexicalScopeBodyNode);
    }

    private onLexicalScopeNodeLeave (): void {
        this.visitedLexicalScopeNodesStack.pop();
    }
}
