import { IBlockStatementNode } from "../interfaces/nodes/IBlockStatementNode";
import { ICatchClauseNode } from "../interfaces/nodes/ICatchClauseNode";
import { IProgramNode } from "../interfaces/nodes/IProgramNode";

export type TNodeWithBlockStatement = IBlockStatementNode|ICatchClauseNode|IProgramNode;