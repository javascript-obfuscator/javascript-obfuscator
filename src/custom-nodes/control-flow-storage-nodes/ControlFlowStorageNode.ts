import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

import { initializable } from '../../decorators/Initializable';

import { ControlFlowStorageTemplate } from '../../templates/custom-nodes/control-flow-storage-nodes/ControlFlowStorageTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';

@injectable()
export class ControlFlowStorageNode extends AbstractCustomNode {
    /**
     * @type {IStorage <ICustomNode>}
     */
    @initializable()
    private controlFlowStorage: IStorage <ICustomNode>;

    /**
     * @type {string}
     */
    @initializable()
    private controlFlowStorageName: string;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param controlFlowStorage
     * @param controlFlowStorageName
     */
    public initialize (controlFlowStorage: IStorage <ICustomNode>, controlFlowStorageName: string): void {
        this.controlFlowStorage = controlFlowStorage;
        this.controlFlowStorageName = controlFlowStorageName;
    }

    /**
     * @returns {string}
     */
    protected getTemplate (): string {
        return format(ControlFlowStorageTemplate(), {
            controlFlowStorage: this.controlFlowStorage.toString(),
            controlFlowStorageName: this.controlFlowStorageName
        });
    }
}
