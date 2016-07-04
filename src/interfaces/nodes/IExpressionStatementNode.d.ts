import { TExpression } from "../../types/nodes/TExpression";

import { INode } from "./INode";

export interface IExpressionStatementNode extends INode {
    expression: TExpression;
}
