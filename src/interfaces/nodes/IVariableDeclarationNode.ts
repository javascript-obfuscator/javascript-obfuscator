import { ITreeNode } from "./ITreeNode";
import { IVariableDeclaratorNode } from "./IVariableDeclaratorNode";

export interface IVariableDeclarationNode extends ITreeNode {
    declarations: IVariableDeclaratorNode[];
    kind: string;
}