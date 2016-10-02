import { ICustomNode } from 'app/interfaces/custom-nodes/ICustomNode';
import { INodeObfuscator } from 'app/interfaces/INodeObfuscator';
import { IOptions } from 'app/interfaces/IOptions';

export type TNodeObfuscator =  (new (nodes: Map <string, ICustomNode>, options: IOptions) => INodeObfuscator);
