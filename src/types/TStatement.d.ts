import { IExpressionStatementNode } from "../interfaces/nodes/IExpressionStatementNode";
import { IFunctionDeclarationNode } from "../interfaces/nodes/IFunctionDeclarationNode";
import { IIfStatementNode } from "../interfaces/nodes/IIfStatementNode";
import { INode } from "../interfaces/nodes/INode";
import { IVariableDeclarationNode } from "../interfaces/nodes/IVariableDeclarationNode";

export type TStatement = INode & (IExpressionStatementNode | IFunctionDeclarationNode | IIfStatementNode |
    IVariableDeclarationNode);
