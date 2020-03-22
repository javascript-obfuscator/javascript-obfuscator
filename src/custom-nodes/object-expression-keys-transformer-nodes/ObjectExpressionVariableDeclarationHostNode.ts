import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class ObjectExpressionVariableDeclarationHostNode extends AbstractCustomNode {
    /**
     * @type {TNodeWithLexicalScope}
     */
    private lexicalScopeNode!: TNodeWithLexicalScope;
    /**
     * @ type {(Property | SpreadElement)[]}
     */
    private properties!: (ESTree.Property | ESTree.SpreadElement)[];

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomCodeHelperFormatter) customCodeHelperFormatter: ICustomCodeHelperFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            identifierNamesGeneratorFactory,
            customCodeHelperFormatter,
            randomGenerator,
            options
        );
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {(ESTree.Property | ESTree.SpreadElement)[]} properties
     */
    public initialize (lexicalScopeNode: TNodeWithLexicalScope, properties: (ESTree.Property | ESTree.SpreadElement)[]): void {
        this.lexicalScopeNode = lexicalScopeNode;
        this.properties = properties;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const variableDeclarationName: string = NodeGuards.isProgramNode(this.lexicalScopeNode)
            ? this.identifierNamesGenerator.generateForGlobalScope()
            : this.identifierNamesGenerator.generateForLexicalScope(this.lexicalScopeNode);

        const structure: TStatement = NodeFactory.variableDeclarationNode(
            [
                NodeFactory.variableDeclaratorNode(
                    NodeFactory.identifierNode(variableDeclarationName),
                    NodeFactory.objectExpressionNode(this.properties)
                )
            ],
            'const'
        );

        return [structure];
    }
}
