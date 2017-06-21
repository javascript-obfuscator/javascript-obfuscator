import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { Nodes } from '../../node/Nodes';

@injectable()
export class StringLiteralNode extends AbstractCustomNode {
    /**
     * @type {string}
     */
    @initializable()
    private literalValue: string;

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
     * @param literalValue
     */
    public initialize (literalValue: string): void {
        this.literalValue = literalValue;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const structure: TStatement = <any>Nodes.getLiteralNode(this.literalValue);

        return [structure];
    }
}
