import { IPropertyNode } from "./IPropertyNode";
import { INode } from "./INode";

export interface IObjectExpressionNode extends INode {
    properties: IPropertyNode[];
}
