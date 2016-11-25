import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeTransformer } from '../interfaces/INodeTransformer';
import { IOptions } from '../interfaces/IOptions';
import { IStorage } from '../interfaces/IStorage';

export type TNodeTransformer = (new (customNodesStorage: IStorage<ICustomNode>, options: IOptions) => INodeTransformer);
