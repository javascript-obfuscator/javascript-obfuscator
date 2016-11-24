import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeTransformer } from '../interfaces/INodeTransformer';
import { IOptions } from '../interfaces/IOptions';

export type TNodeTransformer = (new (nodes: Map <string, ICustomNode>, options: IOptions) => INodeTransformer);
