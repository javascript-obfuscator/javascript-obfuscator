import { ICustomNode } from "../interfaces/custom-nodes/ICustomNode";
import { INodeObfuscator } from "../interfaces/INodeObfuscator";
import { IOptions } from "../interfaces/IOptions";

export type TNodeObfuscator =  (new (nodes: Map <string, ICustomNode>, options: IOptions) => INodeObfuscator);
