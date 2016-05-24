import { INode } from "./INode";

export interface IBlockStatementNode extends INode {
    body: INode[];
}
