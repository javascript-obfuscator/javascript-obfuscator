import { IBlockStatementNode } from "./IBlockStatementNode";
import { IIdentifierNode } from "./IIdentifierNode";
import { INode } from "./INode";

export interface IFunctionNode extends INode {
    id: IIdentifierNode;
    params: IIdentifierNode[];
    body: IBlockStatementNode;
    generator: boolean;
    expression: boolean;
}
