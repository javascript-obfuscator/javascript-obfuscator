import { IIdentifierNode } from "./IIdentifierNode";
import { ILiteralNode } from "./ILiteralNode";
import { INode } from "./INode";

export interface IPropertyNode extends INode {
    key: IIdentifierNode|ILiteralNode;
    computed: boolean;
    value: IIdentifierNode|ILiteralNode;
    kind: string;
    method: boolean;
    shorthand: boolean;
}
