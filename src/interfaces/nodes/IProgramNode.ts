import { ITreeNode } from "./ITreeNode";

export interface IProgramNode extends ITreeNode {
    body: ITreeNode[];
}
