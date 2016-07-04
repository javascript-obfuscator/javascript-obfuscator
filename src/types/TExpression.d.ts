import { IArrowFunctionExpressionNode } from "../interfaces/nodes/IArrowFunctionExpressionNode";
import { ICallExpressionNode } from "../interfaces/nodes/ICallExpressionNode";
import { IFunctionExpressionNode } from "../interfaces/nodes/IFunctionExpressionNode";
import { IIdentifierNode } from "../interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "../interfaces/nodes/ILiteralNode";
import { IMemberExpressionNode } from "../interfaces/nodes/IMemberExpressionNode";
import { INode } from "../interfaces/nodes/INode";

export type TExpression = INode & (IArrowFunctionExpressionNode | ICallExpressionNode | IFunctionExpressionNode |
    IIdentifierNode | ILiteralNode | IMemberExpressionNode);
