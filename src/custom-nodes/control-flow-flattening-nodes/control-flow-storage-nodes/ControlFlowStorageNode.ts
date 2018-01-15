import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { initializable } from '../../../decorators/Initializable';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { NodeGuards } from '../../../node/NodeGuards';
import { Nodes } from '../../../node/Nodes';
import { NodeUtils } from '../../../node/NodeUtils';

@injectable()
export class ControlFlowStorageNode extends AbstractCustomNode {
    /**
     * @type {IStorage <ICustomNode>}
     */
    @initializable()
    private controlFlowStorage: IStorage <ICustomNode>;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }

    /**
     * @param {IStorage<ICustomNode>} controlFlowStorage
     */
    public initialize (controlFlowStorage: IStorage <ICustomNode>): void {
        this.controlFlowStorage = controlFlowStorage;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const propertyNodes: ESTree.Property[] = Array
            .from<[string, ICustomNode]>(this.controlFlowStorage.getStorage())
            .map(([key, value]: [string, ICustomNode]) => {
                const node: ESTree.Node = value.getNode()[0];

                if (!NodeGuards.isExpressionStatementNode(node)) {
                    throw new Error('Function node for control flow storage object should be passed inside the `ExpressionStatement` node!');
                }

                return Nodes.getPropertyNode(
                    Nodes.getIdentifierNode(key),
                    node.expression
                );
            });

        let structure: ESTree.Node = Nodes.getVariableDeclarationNode([
            Nodes.getVariableDeclaratorNode(
                Nodes.getIdentifierNode(this.controlFlowStorage.getStorageId()),
                Nodes.getObjectExpressionNode(propertyNodes)
            )
        ]);

        structure = NodeUtils.parentize(structure);

        return [structure];
    }
}
