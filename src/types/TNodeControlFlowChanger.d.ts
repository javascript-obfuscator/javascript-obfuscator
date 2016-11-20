import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeControlFlowChanger } from '../interfaces/INodeControlFlowChanger';
import { IOptions } from '../interfaces/IOptions';

export type TNodeControlFlowChanger = (new (nodes: Map <string, ICustomNode>, options: IOptions) => INodeControlFlowChanger);
