import { IIdentifierNode } from "./IIdentifierNode";
import { ILiteralNode } from "./ILiteralNode";
import { ITreeNode } from "./ITreeNode";

export interface IMemberExpressionNode extends ITreeNode {
    computed: boolean;
    object: IIdentifierNode;
    property: IIdentifierNode|ILiteralNode;
}