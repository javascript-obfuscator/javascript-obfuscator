import { IIdentifierNode } from "./IIdentifierNode";
import { ITreeNode } from "./ITreeNode";

export interface IFunctionNode extends ITreeNode {
    id: IIdentifierNode;
    params: IIdentifierNode[];
    body: ITreeNode[];
    generator: boolean;
    expression: boolean;
}
