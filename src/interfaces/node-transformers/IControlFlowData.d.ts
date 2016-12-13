import { ICustomNode } from '../custom-nodes/ICustomNode';
import { IStorage } from '../storages/IStorage';

export interface IControlFlowData {
    controlFlowStorage: IStorage<ICustomNode>;
    controlFlowStorageNodeName: string;
}
