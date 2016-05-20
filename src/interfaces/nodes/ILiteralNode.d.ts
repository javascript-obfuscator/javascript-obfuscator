import { ITreeNode } from "./ITreeNode";

export interface ILiteralNode extends ITreeNode {
    value: boolean|number|string;
    raw: string;
    'x-verbatim-property': any;
}
