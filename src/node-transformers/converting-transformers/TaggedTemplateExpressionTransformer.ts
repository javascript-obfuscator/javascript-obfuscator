import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomCodeHelperFactory } from '../../types/container/custom-code-helpers/TCustomCodeHelperFactory';
import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TInitialData } from '../../types/TInitialData';
import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';

import { ICustomCodeHelper } from '../../interfaces/custom-code-helpers/ICustomCodeHelper';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { CustomCodeHelper } from '../../enums/custom-code-helpers/CustomCodeHelper';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeStatementUtils } from '../../node/NodeStatementUtils';
import { NodeUtils } from '../../node/NodeUtils';
import { TaggedTemplateLiteralCodeHelper } from '../../custom-code-helpers/tagged-template-expression/TaggedTemplateLiteralCodeHelper';
import { TemplateObjectCodeHelper } from '../../custom-code-helpers/tagged-template-expression/TemplateObjectCodeHelper';

/**
 * Transform ES2015 tagged template expressions to ES5
 * Thanks to Babel for algorithm
 */
@injectable()
export class TaggedTemplateExpressionTransformer extends AbstractNodeTransformer {
    /**
     * @type {TCustomCodeHelperFactory}
     */
    private readonly customCodeHelperFactory: TCustomCodeHelperFactory;

    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {boolean}
     */
    private isTaggedTemplateLiteralHelperAppended: boolean = false;

    /**
     * @type {string | null}
     */
    private readonly taggedTemplateLiteralHelperName: string | null = null;

    /**
     * @param {TCustomCodeHelperFactory} customCodeHelperFactory
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__ICustomCodeHelper)
            customCodeHelperFactory: TCustomCodeHelperFactory,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.customCodeHelperFactory = customCodeHelperFactory;
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);

        if (!this.taggedTemplateLiteralHelperName) {
            this.taggedTemplateLiteralHelperName = this.identifierNamesGenerator.generateForGlobalScope();
        }
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isTaggedTemplateExpressionNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {TaggedTemplateExpression} taggedTemplateExpression
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (taggedTemplateExpression: ESTree.TaggedTemplateExpression, parentNode: ESTree.Node): ESTree.Node {
        if (!this.taggedTemplateLiteralHelperName) {
            throw new Error('`TaggedTemplateLiteral` code helper name is not set');
        }

        const parentNodesWithStatements: TNodeWithStatements[]  = NodeStatementUtils.getParentNodesWithStatements(parentNode);
        const rootNodeWithStatements: TNodeWithStatements | null =
            parentNodesWithStatements[parentNodesWithStatements.length - 1] ?? null;

        if (!rootNodeWithStatements || !NodeGuards.isProgramNode(rootNodeWithStatements)) {
            return taggedTemplateExpression;
        }

        const templateObjectHelperName: string = this.identifierNamesGenerator.generateForGlobalScope();

        this.appendTemplateLiteralCustomCodeHelper(rootNodeWithStatements);
        this.appendTemplateObjectCustomCodeHelper(
            rootNodeWithStatements,
            templateObjectHelperName,
            taggedTemplateExpression.quasi.quasis
        );

        const templateObjectCallExpressionNode: ESTree.CallExpression = NodeFactory.callExpressionNode(
            taggedTemplateExpression.tag,
            [
                NodeFactory.callExpressionNode(NodeFactory.identifierNode(templateObjectHelperName), []),
                ...taggedTemplateExpression.quasi.expressions
            ]
        );

        NodeUtils.parentizeAst(templateObjectCallExpressionNode);
        NodeUtils.parentizeNode(templateObjectCallExpressionNode, parentNode);

        return templateObjectCallExpressionNode;
    }

    /**
     * @param {Program} programNode
     */
    private appendTemplateLiteralCustomCodeHelper (programNode: ESTree.Program): void {
        if (this.isTaggedTemplateLiteralHelperAppended || !this.taggedTemplateLiteralHelperName) {
            return;
        }

        const taggedTemplateLiteralCodeHelper: ICustomCodeHelper<TInitialData<TaggedTemplateLiteralCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.TaggedTemplateLiteralCodeHelper);

        taggedTemplateLiteralCodeHelper.initialize(this.taggedTemplateLiteralHelperName);
        NodeAppender.prepend(programNode, taggedTemplateLiteralCodeHelper.getNode());

        this.isTaggedTemplateLiteralHelperAppended = true;
    }

    /**
     * @param {Program} programNode
     * @param {string} templateObjectHelperName
     * @param {TemplateElement[]} quasisElements
     */
    private appendTemplateObjectCustomCodeHelper (
        programNode: ESTree.Program,
        templateObjectHelperName: string,
        quasisElements: ESTree.TemplateElement[]
    ): void {
        if (!this.taggedTemplateLiteralHelperName) {
            return;
        }

        const values: string[] = [];
        const rawValues: string[] = [];

        // Flag variable to check if contents of strings and raw are equal
        let isStringsRawEqual: boolean = true;

        for (const elem of quasisElements) {
            const {raw, cooked} = elem.value;

            values.push(cooked);
            rawValues.push(raw);

            if (raw !== cooked) {
                // false even if one of raw and cooked are not equal
                isStringsRawEqual = false;
            }
        }

        const templateObjectCodeHelper: ICustomCodeHelper<TInitialData<TemplateObjectCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.TemplateObjectCodeHelper);

        templateObjectCodeHelper.initialize(
            templateObjectHelperName,
            this.taggedTemplateLiteralHelperName,
            values,
            !isStringsRawEqual ? rawValues : null
        );
        NodeAppender.prepend(programNode, templateObjectCodeHelper.getNode());
    }
}
