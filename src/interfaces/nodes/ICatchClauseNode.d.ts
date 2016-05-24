import { IIdentifierNode } from "./IIdentifierNode";
import { INode } from "./INode";

export interface ICatchClauseNode extends INode {
    param: IIdentifierNode;
    body: INode[];
}
