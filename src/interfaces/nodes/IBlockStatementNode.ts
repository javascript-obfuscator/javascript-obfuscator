import { ITreeNode } from "./ITreeNode";

export interface IBlockStatementNode extends ITreeNode {
    body: ITreeNode[];
}
