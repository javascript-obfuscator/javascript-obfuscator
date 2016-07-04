import { IArrowFunctionExpressionNode } from "../../interfaces/nodes/IArrowFunctionExpressionNode";
import { ICallExpressionNode } from "../../interfaces/nodes/ICallExpressionNode";
import { IFunctionExpressionNode } from "../../interfaces/nodes/IFunctionExpressionNode";
import { IIdentifierNode } from "../../interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "../../interfaces/nodes/ILiteralNode";
import { IMemberExpressionNode } from "../../interfaces/nodes/IMemberExpressionNode";

export type TExpression = IArrowFunctionExpressionNode | ICallExpressionNode | IFunctionExpressionNode |
    IIdentifierNode | ILiteralNode | IMemberExpressionNode;
