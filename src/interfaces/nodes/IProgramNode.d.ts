import { TStatement } from "../../types/nodes/TStatement";

import { INode } from "./INode";

export interface IProgramNode extends INode {
    body: TStatement[];
}
