import { IControlFlowReplacer } from '../interfaces/IControlFlowReplacer';
import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/IOptions';
import { IStorage } from '../interfaces/IStorage';

export type TControlFlowReplacer = (new (customNodesStorage: IStorage<ICustomNode>, options: IOptions) => IControlFlowReplacer);
