import { ICustomNode } from '../custom-nodes/ICustomNode';
import { IStorage } from '../storages/IStorage';

export interface ICachedControlFlowStorages {
    controlFlowStorage: IStorage<ICustomNode>;
    controlFlowStorageNodeName: string;
}
