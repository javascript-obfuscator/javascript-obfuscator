import { TExpression } from "../../types/TExpression";

import { INode } from "./INode";

export interface ISpreadElementNode extends INode {
    argument: TExpression;
}
