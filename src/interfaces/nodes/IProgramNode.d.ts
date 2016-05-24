import { INode } from "./INode";

export interface IProgramNode extends INode {
    body: INode[];
}
