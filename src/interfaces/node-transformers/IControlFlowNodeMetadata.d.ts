import { ICustomNode } from '../custom-nodes/ICustomNode';
import { IStorage } from '../storages/IStorage';

export interface IControlFlowNodeMetadata {
    controlFlowStorage: IStorage<ICustomNode>;
    controlFlowStorageNodeName: string;
}
