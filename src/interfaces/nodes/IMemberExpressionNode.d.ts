import { IIdentifierNode } from "./IIdentifierNode";
import { ILiteralNode } from "./ILiteralNode";
import { INode } from "./INode";

export interface IMemberExpressionNode extends INode {
    computed: boolean;
    object: IIdentifierNode;
    property: IIdentifierNode|ILiteralNode;
}
