import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { IOptions } from '../../../interfaces/options/IOptions';

import { initializable } from '../../../decorators/Initializable';

import { ControlFlowStorageCallTemplate } from '../../../templates/custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/ControlFlowStorageCallTemplate';

import { AbstractCustomNode } from '../../AbstractCustomNode';

@injectable()
export class ControlFlowStorageCallNode extends AbstractCustomNode {
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
     * @type {string}
     */
    @initializable()
    private leftValue: string;

    /**
     * @type {string}
     */
    @initializable()
    private rightValue: string;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param controlFlowStorageName
     * @param controlFlowStorageKey
     * @param leftValue
     * @param rightValue
     */
    public initialize (
        controlFlowStorageName: string,
        controlFlowStorageKey: string,
        leftValue: string,
        rightValue: string,
    ): void {
        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
        this.leftValue = leftValue;
        this.rightValue = rightValue;
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        return format(ControlFlowStorageCallTemplate(), {
            controlFlowStorageKey: this.controlFlowStorageKey,
            controlFlowStorageName: this.controlFlowStorageName,
            leftValue: this.leftValue,
            rightValue: this.rightValue
        });
    }
}
