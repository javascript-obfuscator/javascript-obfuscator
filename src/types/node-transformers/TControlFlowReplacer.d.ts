import { IControlFlowReplacer } from '../../interfaces/node-transformers/IControlFlowReplacer';
import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

export type TControlFlowReplacer = (new (customNodesStorage: IStorage<ICustomNode>, options: IOptions) => IControlFlowReplacer);
