import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { INodeTransformer } from '../../interfaces/node-transformers/INodeTransformer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

export type TNodeTransformer = (new (customNodesStorage: IStorage<ICustomNode>, options: IOptions) => INodeTransformer);
