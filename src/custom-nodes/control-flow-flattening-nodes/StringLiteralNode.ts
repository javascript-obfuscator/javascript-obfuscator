import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';

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
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
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
