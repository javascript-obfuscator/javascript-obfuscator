import { TStatement } from "../../types/nodes/TStatement";

import { INode } from "./INode";

export interface IBlockStatementNode extends INode {
    body: TStatement[];
}
