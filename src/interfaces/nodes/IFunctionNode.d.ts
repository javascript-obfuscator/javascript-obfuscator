import { TExpression } from "../../types/nodes/TExpression";

import { IBlockStatementNode } from "./IBlockStatementNode";
import { IIdentifierNode } from "./IIdentifierNode";
import { INode } from "./INode";

export interface IFunctionNode extends INode {
    id: IIdentifierNode;
    params: IIdentifierNode[];
    defaults?: TExpression[];
    body: IBlockStatementNode;
    generator: boolean;
    expression: boolean;
}
