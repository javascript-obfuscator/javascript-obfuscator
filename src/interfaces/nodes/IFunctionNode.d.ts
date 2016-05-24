import { IIdentifierNode } from "./IIdentifierNode";
import { INode } from "./INode";

export interface IFunctionNode extends INode {
    id: IIdentifierNode;
    params: IIdentifierNode[];
    body: INode[];
    generator: boolean;
    expression: boolean;
}
