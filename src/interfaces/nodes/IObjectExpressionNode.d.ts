import { IPropertyNode } from "./IPropertyNode";
import { ITreeNode } from "./ITreeNode";

export interface IObjectExpressionNode extends ITreeNode {
    properties: IPropertyNode[];
}
