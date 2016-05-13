import { ITreeNode } from '../interfaces/nodes/ITreeNode';

export interface INodeObfuscator {
    /**
     * @param node
     * @param parentNode
     */
    obfuscateNode (node: ITreeNode, parentNode?: ITreeNode): void;
}