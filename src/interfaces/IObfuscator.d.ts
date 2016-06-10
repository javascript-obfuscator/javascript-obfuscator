import { INode } from "./nodes/INode";

export interface IObfuscator {
    obfuscateNode (node: INode): INode;
}