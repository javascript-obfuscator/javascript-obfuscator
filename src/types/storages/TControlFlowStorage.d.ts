import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IMapStorage } from '../../interfaces/storages/IMapStorage';

export type TControlFlowStorage = IMapStorage <string, ICustomNode>;
