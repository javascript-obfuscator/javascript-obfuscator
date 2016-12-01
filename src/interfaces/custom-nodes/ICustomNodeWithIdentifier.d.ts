import { ICustomNode } from './ICustomNode';

export interface ICustomNodeWithIdentifier extends ICustomNode {
    getNodeIdentifier (): string;
}
