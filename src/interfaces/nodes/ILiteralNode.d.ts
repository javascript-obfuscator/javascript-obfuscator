import { INode } from "./INode";

export interface ILiteralNode extends INode {
    value: boolean|number|string;
    raw: string;
    'x-verbatim-property': any;
}
