import { IIdentifierNode } from "./IIdentifierNode";
import { INode } from "./INode";

export interface IVariableDeclaratorNode extends INode {
    id: IIdentifierNode;
    init: any;
}
