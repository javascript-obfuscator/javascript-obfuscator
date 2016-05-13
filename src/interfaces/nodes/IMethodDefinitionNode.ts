import { IFunctionExpressionNode } from "./IFunctionExpressionNode";
import { IIdentifierNode } from "./IIdentifierNode";
import { ILiteralNode } from "./ILiteralNode";
import { ITreeNode } from "./ITreeNode";

export interface IMethodDefinitionNode extends ITreeNode {
    key: IIdentifierNode|ILiteralNode;
    computed: boolean;
    value: IFunctionExpressionNode;
    kind: string;
    static: boolean;
}