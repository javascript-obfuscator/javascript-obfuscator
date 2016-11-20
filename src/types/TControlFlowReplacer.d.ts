import { IControlFlowReplacer } from '../interfaces/IControlFlowReplacer';
import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/IOptions';

export type TControlFlowReplacer = (new (nodes: Map <string, ICustomNode>, options: IOptions) => IControlFlowReplacer);
