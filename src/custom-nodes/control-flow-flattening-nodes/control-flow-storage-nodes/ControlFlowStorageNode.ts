import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { initializable } from '../../../decorators/Initializable';

import { AbstractCustomNode } from '../../AbstractCustomNode';
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
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @param randomGenerator
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.randomGenerator = randomGenerator;
    }

    /**
     * @param controlFlowStorage
     */
    public initialize (controlFlowStorage: IStorage <ICustomNode>): void {
        this.controlFlowStorage = controlFlowStorage;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        let structure: ESTree.Node = Nodes.getVariableDeclarationNode([
            Nodes.getVariableDeclaratorNode(
                Nodes.getIdentifierNode(this.controlFlowStorage.getStorageId()),
                Nodes.getObjectExpressionNode(
                    Array
                        .from(this.controlFlowStorage.getStorage())
                        .map(([key, value]: [string, ICustomNode]) => {
                            return Nodes.getPropertyNode(
                                Nodes.getIdentifierNode(key),
                                <any>value.getNode()[0]
                            );
                        })
                )
            )
        ]);

        structure = NodeUtils.parentize(structure);

        return [structure];
    }
}
