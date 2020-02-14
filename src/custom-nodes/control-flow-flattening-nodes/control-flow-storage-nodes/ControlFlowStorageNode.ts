import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNodeFormatter } from '../../../interfaces/custom-nodes/ICustomNodeFormatter';
import { ICustomNodeObfuscator } from '../../../interfaces/custom-nodes/ICustomNodeObfuscator';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../../decorators/Initializable';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { NodeFactory } from '../../../node/NodeFactory';
import { NodeGuards } from '../../../node/NodeGuards';
import { NodeUtils } from '../../../node/NodeUtils';

@injectable()
export class ControlFlowStorageNode extends AbstractCustomNode {
    /**
     * @type {TControlFlowStorage}
     */
    @initializable()
    private controlFlowStorage!: TControlFlowStorage;

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

    /**
     * @param {TControlFlowStorage} controlFlowStorage
     */
    public initialize (controlFlowStorage: TControlFlowStorage): void {
        this.controlFlowStorage = controlFlowStorage;
    }

    /**
     * @param {string} nodeTemplate
     * @returns {TStatement[]}
     */
    protected getNodeStructure (nodeTemplate: string): TStatement[] {
        const propertyNodes: ESTree.Property[] = Array
            .from<[string, ICustomNode]>(this.controlFlowStorage.getStorage())
            .map(([key, value]: [string, ICustomNode]) => {
                const node: ESTree.Node = value.getNode()[0];

                if (!NodeGuards.isExpressionStatementNode(node)) {
                    throw new Error('Function node for control flow storage object should be passed inside the `ExpressionStatement` node!');
                }

                return NodeFactory.propertyNode(
                    NodeFactory.identifierNode(key),
                    node.expression
                );
            });

        let structure: ESTree.Node = NodeFactory.variableDeclarationNode(
            [
                NodeFactory.variableDeclaratorNode(
                    NodeFactory.identifierNode(this.controlFlowStorage.getStorageId()),
                    NodeFactory.objectExpressionNode(propertyNodes)
                )
            ],
            'const'
        );

        structure = NodeUtils.parentizeAst(structure);

        return [structure];
    }
}
