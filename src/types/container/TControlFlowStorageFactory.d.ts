import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IStorage } from '../../interfaces/storages/IStorage';

export type TControlFlowStorageFactory = () => IStorage<ICustomNode>;
