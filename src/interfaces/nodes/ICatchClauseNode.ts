import { IIdentifierNode } from "./IIdentifierNode";
import { ITreeNode } from "./ITreeNode";

export interface ICatchClauseNode extends ITreeNode {
    param: IIdentifierNode;
    body: ITreeNode[];
}