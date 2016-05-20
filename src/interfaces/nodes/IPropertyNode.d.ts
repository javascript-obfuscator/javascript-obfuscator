import { IIdentifierNode } from "./IIdentifierNode";
import { ILiteralNode } from "./ILiteralNode";
import { ITreeNode } from "./ITreeNode";

export interface IPropertyNode extends ITreeNode {
    key: IIdentifierNode|ILiteralNode;
    computed: boolean;
    value: IIdentifierNode|ILiteralNode;
    kind: string;
    method: boolean;
    shorthand: boolean;
}
