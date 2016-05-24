import { INode } from "./INode";
import { IVariableDeclaratorNode } from "./IVariableDeclaratorNode";

export interface IVariableDeclarationNode extends INode {
    declarations: IVariableDeclaratorNode[];
    kind: string;
}
