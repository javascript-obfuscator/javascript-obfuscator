import { IBlockStatementNode } from "../interfaces/nodes/IBlockStatementNode";
import { ICatchClauseNode } from "../interfaces/nodes/ICatchClauseNode";
import { IFunctionNode } from "../interfaces/nodes/IFunctionNode";
import { IProgramNode } from "../interfaces/nodes/IProgramNode";

export type BlockScopeNode = IBlockStatementNode|ICatchClauseNode|IFunctionNode|IProgramNode;