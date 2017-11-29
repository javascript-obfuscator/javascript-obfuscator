import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TIdentifierNameGeneratorFactory } from '../../../types/container/generators/TIdentifierNameGeneratorFactory';
import { TStatement } from '../../../types/node/TStatement';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../../decorators/Initializable';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { Nodes } from '../../../node/Nodes';
import { NodeUtils } from '../../../node/NodeUtils';

@injectable()
export class StringLiteralControlFlowStorageCallNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private controlFlowStorageKey: string;

    /**
     * @type {string}
     */
    @initializable()
    private controlFlowStorageName: string;

    /**
     * @param {TIdentifierNameGeneratorFactory} identifierNameGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNameGenerator)
            identifierNameGeneratorFactory: TIdentifierNameGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNameGeneratorFactory, randomGenerator, options);
    }

    /**
     * @param {string} controlFlowStorageName
     * @param {string} controlFlowStorageKey
     */
    public initialize (
        controlFlowStorageName: string,
        controlFlowStorageKey: string
    ): void {
        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
    }

    protected getNodeStructure (): TStatement[] {
        const structure: TStatement = Nodes.getExpressionStatementNode(
            Nodes.getMemberExpressionNode(
                Nodes.getIdentifierNode(this.controlFlowStorageName),
                Nodes.getIdentifierNode(this.controlFlowStorageKey)
            )
        );

        NodeUtils.parentize(structure);

        return [structure];
    }
}
