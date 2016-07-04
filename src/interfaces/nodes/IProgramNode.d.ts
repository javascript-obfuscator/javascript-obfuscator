import { TStatement } from "../../types/TStatement";

import { INode } from "./INode";

export interface IProgramNode extends INode {
    body: TStatement[];
}
