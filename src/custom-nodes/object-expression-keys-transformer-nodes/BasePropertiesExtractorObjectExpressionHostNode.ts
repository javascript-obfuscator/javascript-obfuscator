import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IPrevailingKindOfVariablesAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ITemplateFormatter } from '../../interfaces/utils/ITemplateFormatter';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';

@injectable()
export class BasePropertiesExtractorObjectExpressionHostNode extends AbstractCustomNode {
    /**
     * @type {ESTree.VariableDeclaration['kind']}
     */
    private readonly prevailingKindOfVariables: ESTree.VariableDeclaration['kind'];

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ITemplateFormatter} templateFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IPrevailingKindOfVariablesAnalyzer} prevailingKindOfVariablesAnalyzer
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ITemplateFormatter) templateFormatter: ITemplateFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)
            prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer,
    ) {
        super(identifierNamesGeneratorFactory, templateFormatter, randomGenerator, options);

        this.prevailingKindOfVariables = prevailingKindOfVariablesAnalyzer.getPrevailingKind();
    }

    public initialize (): void {}

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const structure: TStatement = NodeFactory.variableDeclarationNode(
            [
                NodeFactory.variableDeclaratorNode(
                    NodeFactory.identifierNode(
                        this.identifierNamesGenerator.generate()
                    ),
                    NodeFactory.objectExpressionNode([])
                )
            ],
            this.prevailingKindOfVariables
        );

        return [structure];
    }
}
