import { IBlockStatementNode } from "./IBlockStatementNode";
import { INode } from "./INode";

export interface IIfStatementNode extends INode {
    test: any;
    consequent: IBlockStatementNode;
    alternate: IBlockStatementNode;
}
