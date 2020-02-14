import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { TStatement } from '../../types/node/TStatement';

import { ICustomNodeFormatter } from '../../interfaces/custom-nodes/ICustomNodeFormatter';
import { ICustomNodeObfuscator } from '../../interfaces/custom-nodes/ICustomNodeObfuscator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';

@injectable()
export class ObjectExpressionVariableDeclarationHostNode extends AbstractCustomNode {
    /**
     * @type {TNodeWithLexicalScope}
     */
    private lexicalScopeNode!: TNodeWithLexicalScope;
    /**
     * @ type {Property}
     */
    private properties!: ESTree.Property[];

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomNodeFormatter} customNodeFormatter
     * @param {ICustomNodeObfuscator} customNodeObfuscator
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomNodeFormatter) customNodeFormatter: ICustomNodeFormatter,
        @inject(ServiceIdentifiers.ICustomNodeObfuscator) customNodeObfuscator: ICustomNodeObfuscator,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            identifierNamesGeneratorFactory,
            customNodeFormatter,
            customNodeObfuscator,
            randomGenerator,
            options
        );
    }

    public initialize (lexicalScopeNode: TNodeWithLexicalScope, properties: ESTree.Property[]): void {
        this.lexicalScopeNode = lexicalScopeNode;
        this.properties = properties;
    }

    /**
     * @param {string} nodeTemplate
     * @returns {TStatement[]}
     */
    protected getNodeStructure (nodeTemplate: string): TStatement[] {
        const structure: TStatement = NodeFactory.variableDeclarationNode(
            [
                NodeFactory.variableDeclaratorNode(
                    NodeFactory.identifierNode(
                        this.identifierNamesGenerator.generateForLexicalScope(this.lexicalScopeNode)
                    ),
                    NodeFactory.objectExpressionNode(this.properties)
                )
            ],
            'const'
        );

        return [structure];
    }
}
