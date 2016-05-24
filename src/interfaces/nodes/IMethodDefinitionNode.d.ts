import { IFunctionExpressionNode } from "./IFunctionExpressionNode";
import { IIdentifierNode } from "./IIdentifierNode";
import { ILiteralNode } from "./ILiteralNode";
import { INode } from "./INode";

export interface IMethodDefinitionNode extends INode {
    key: IIdentifierNode|ILiteralNode;
    computed: boolean;
    value: IFunctionExpressionNode;
    kind: string;
    static: boolean;
}
