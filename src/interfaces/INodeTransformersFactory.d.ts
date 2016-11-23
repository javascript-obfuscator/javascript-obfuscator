import { INodeTransformer } from './INodeTransformer';

export interface INodeTransformersFactory {
    initializeNodeTransformers (nodeType: string): INodeTransformer[];
}
