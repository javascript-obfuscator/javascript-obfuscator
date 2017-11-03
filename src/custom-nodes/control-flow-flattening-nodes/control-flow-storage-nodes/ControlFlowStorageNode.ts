import { inject, injectable, } from 'inversify';
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
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
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
        let structure: ESTree.Node = Nodes.getVariableDeclarationNode([
            Nodes.getVariableDeclaratorNode(
                Nodes.getIdentifierNode(this.controlFlowStorage.getStorageId()),
                Nodes.getObjectExpressionNode(
                    Array
                        .from<[string, ICustomNode]>(this.controlFlowStorage.getStorage())
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
