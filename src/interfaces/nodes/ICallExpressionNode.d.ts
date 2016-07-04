import { TExpression } from "../../types/nodes/TExpression";

import { INode } from "./INode";
import { ISpreadElementNode } from "./ISpreadElementNode";

export interface ICallExpressionNode extends INode {
    callee: TExpression;
    arguments: TExpression[] | ISpreadElementNode[];
}
