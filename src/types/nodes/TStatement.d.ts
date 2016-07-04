import { IExpressionStatementNode } from "../../interfaces/nodes/IExpressionStatementNode";
import { IFunctionDeclarationNode } from "../../interfaces/nodes/IFunctionDeclarationNode";
import { IIfStatementNode } from "../../interfaces/nodes/IIfStatementNode";
import { IVariableDeclarationNode } from "../../interfaces/nodes/IVariableDeclarationNode";

export type TStatement = IExpressionStatementNode | IFunctionDeclarationNode | IIfStatementNode |
    IVariableDeclarationNode;
