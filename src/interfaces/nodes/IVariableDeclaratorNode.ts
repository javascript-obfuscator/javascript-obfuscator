import { IIdentifierNode } from "./IIdentifierNode";
import { ITreeNode } from "./ITreeNode";

export interface IVariableDeclaratorNode extends ITreeNode {
    id: IIdentifierNode;
    init: any;
}