import * as ESTree from 'estree';

import { ICustomNode } from './custom-nodes/ICustomNode';
import { IStorage } from './IStorage';

export interface IObfuscator {
    obfuscateAstTree (astTree: ESTree.Program, customNodesStorage: IStorage<ICustomNode>): ESTree.Program;
}
