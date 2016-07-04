import { TStatement } from "../../types/TStatement";

import { INode } from "./INode";

export interface IBlockStatementNode extends INode {
    body: TStatement[];
}
