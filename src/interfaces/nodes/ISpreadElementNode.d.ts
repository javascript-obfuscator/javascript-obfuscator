import { TExpression } from "../../types/nodes/TExpression";

import { INode } from "./INode";

export interface ISpreadElementNode extends INode {
    argument: TExpression;
}
